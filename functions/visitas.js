/**
 * Modulo "Visitas y seguimiento".
 *
 * - registrarVisitaPublica: unica via de entrada del formulario publico
 *   (bienvenida.html). El visitante nunca lee ni escribe Firestore directo.
 * - correosDeNuevaVisita: al crearse una ficha, da la bienvenida por correo
 *   al visitante (si lo autorizo) y avisa al equipo.
 * - visitasActivarAdmin: da de alta al primer administrador del modulo.
 * - visitasGuardarEquipo: el admin o pastor agrega personas al equipo.
 */
const crypto = require("crypto");
const { getAuth } = require("firebase-admin/auth");
const { getFirestore, FieldValue, Timestamp } = require("firebase-admin/firestore");
const { logger } = require("firebase-functions");
const { defineString } = require("firebase-functions/params");
const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { smtpPassword, smtpUser, createTransporter } = require("./mail");

// Correos (separados por coma) que pueden activarse como administradores
// del modulo al entrar por primera vez al panel.
const adminEmails = defineString("VISITAS_ADMIN_EMAILS", { default: "" });
// "true" exige un token valido de App Check en el formulario publico.
const requireAppCheck = defineString("VISITAS_REQUIRE_APP_CHECK", { default: "false" });

// Correo (o correos, separados por coma) que recibe el aviso de cada
// visitante nuevo. Vacio = no se envian avisos al equipo.
const notifyTo = defineString("VISITAS_NOTIFY_TO", { default: "" });
// "false" desactiva el correo de bienvenida al visitante.
const welcomeEmail = defineString("VISITAS_WELCOME_EMAIL", { default: "true" });
const panelUrl = defineString("VISITAS_PANEL_URL", {
  default: "https://creceprfwb.github.io/portal-recursos-discipulado/admin-visitas.html"
});

const REGION = "us-central1";
const CHURCH_ID = "jeec";
const CHURCH_NAME = "Jesús es el Centro";
const TIME_ZONE = "America/Puerto_Rico";
const ROLES = ["bienvenida", "responsable", "pastor", "admin"];
const MANAGER_ROLES = ["pastor", "admin"];
const CONTACT_METHODS = ["whatsapp", "llamada", "texto", "correo"];
const MAX_COMPANIONS = 8;
// El wifi de la iglesia comparte una sola IP, por eso el limite por IP es amplio.
const MAX_PER_IP_PER_HOUR = 40;
const MAX_GLOBAL_PER_HOUR = 300;
const MIN_FILL_MS = 2500;

function cleanText(value, max) {
  return String(value == null ? "" : value).replace(/\s+/g, " ").trim().slice(0, max);
}

function cleanLongText(value, max) {
  return String(value == null ? "" : value).replace(/\r/g, "").trim().slice(0, max);
}

function normalizeName(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function phoneKey(value) {
  let digits = String(value || "").replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) digits = digits.slice(1);
  return digits;
}

function dateKey(date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(date);
}

function parsePublicPayload(data) {
  const input = data && typeof data === "object" ? data : {};
  const name = cleanText(input.name, 80);
  const phone = cleanText(input.phone, 30);
  const email = cleanText(input.email, 120).toLowerCase();
  const preferredContact = CONTACT_METHODS.includes(input.preferredContact) ? input.preferredContact : "whatsapp";

  if (normalizeName(name).length < 2) {
    throw new HttpsError("invalid-argument", "Escribe tu nombre.");
  }
  const phoneDigits = phoneKey(phone);
  if (phoneDigits.length < 7 || phoneDigits.length > 15) {
    throw new HttpsError("invalid-argument", "Escribe un teléfono válido.");
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    throw new HttpsError("invalid-argument", "Revisa el correo electrónico.");
  }

  const companions = (Array.isArray(input.companions) ? input.companions : [])
    .slice(0, MAX_COMPANIONS)
    .map((item) => ({
      name: cleanText(item && item.name, 80),
      relation: cleanText(item && item.relation, 40)
    }))
    .filter((item) => normalizeName(item.name).length >= 2);

  return {
    name,
    nameKey: normalizeName(name),
    phone,
    phoneKey: phoneDigits,
    email,
    emailKey: email,
    preferredContact,
    firstVisit: input.firstVisit !== false,
    companions,
    wantsInfo: input.wantsInfo === true,
    allowContact: input.allowContact === true,
    prayerRequest: cleanLongText(input.prayerRequest, 1000)
  };
}

async function checkRateLimit(db, ip) {
  const now = new Date();
  const hour = now.toISOString().slice(0, 13);
  const ipHash = crypto.createHash("sha256").update(`${ip}|${hour}`).digest("hex").slice(0, 32);
  const ipRef = db.collection("visitRateLimits").doc(`ip-${ipHash}`);
  const globalRef = db.collection("visitRateLimits").doc(`global-${hour}`);
  const expireAt = Timestamp.fromDate(new Date(now.getTime() + 48 * 60 * 60 * 1000));

  await db.runTransaction(async (tx) => {
    const [ipSnap, globalSnap] = await Promise.all([tx.get(ipRef), tx.get(globalRef)]);
    const ipCount = Number((ipSnap.data() || {}).count || 0);
    const globalCount = Number((globalSnap.data() || {}).count || 0);
    if (ipCount >= MAX_PER_IP_PER_HOUR || globalCount >= MAX_GLOBAL_PER_HOUR) {
      throw new HttpsError(
        "resource-exhausted",
        "Recibimos muchos registros seguidos. Inténtalo de nuevo en unos minutos o avisa al equipo de bienvenida."
      );
    }
    tx.set(ipRef, { count: ipCount + 1, expireAt });
    tx.set(globalRef, { count: globalCount + 1, expireAt });
  });
}

async function findContactMatches(db, payload) {
  const found = new Map();
  const people = db.collection("visitPeople");
  const queries = [people.where("phoneKey", "==", payload.phoneKey).limit(25).get()];
  if (payload.emailKey) {
    queries.push(people.where("emailKey", "==", payload.emailKey).limit(25).get());
  }
  (await Promise.all(queries)).forEach((snapshot) => {
    snapshot.forEach((doc) => {
      if (!doc.data().mergedInto) found.set(doc.id, doc);
    });
  });
  return [...found.values()];
}

function newPersonData(fields, now) {
  return {
    churchId: CHURCH_ID,
    name: fields.name,
    nameKey: normalizeName(fields.name),
    phone: fields.phone || "",
    phoneKey: phoneKey(fields.phone),
    email: fields.email || "",
    emailKey: fields.email || "",
    preferredContact: fields.preferredContact || "whatsapp",
    consent: {
      contact: Boolean(fields.allowContact),
      info: Boolean(fields.wantsInfo),
      source: "formulario",
      updatedAt: now
    },
    familyId: fields.familyId || null,
    familyRelation: fields.familyRelation || "",
    trackFollowUp: fields.trackFollowUp !== false,
    followUpStatus: "pendiente",
    assignedTo: null,
    assignedToName: "",
    nextAction: "",
    nextActionDate: "",
    lastContactAt: null,
    hasPrayerRequest: Boolean(fields.hasPrayerRequest),
    firstVisitAt: now,
    lastVisitAt: now,
    visitCount: 1,
    duplicateCandidates: fields.duplicateCandidates || [],
    duplicateDismissed: [],
    mergedInto: null,
    source: "formulario",
    createdBy: "formulario",
    createdAt: now,
    updatedAt: now
  };
}

function visitRecordData(personId, payload, now, isCompanion = false) {
  return {
    churchId: CHURCH_ID,
    personId,
    visitedAt: now,
    firstTime: payload.firstVisit,
    withFamily: payload.companions.length > 0,
    // Las autorizaciones las da el contacto principal solo para si mismo.
    consentContact: !isCompanion && payload.allowContact,
    consentInfo: !isCompanion && payload.wantsInfo,
    source: "formulario",
    registeredBy: null,
    registeredByName: "Formulario público",
    createdAt: now
  };
}

function visitedToday(personData, todayKey) {
  const last = personData.lastVisitAt && personData.lastVisitAt.toDate ? personData.lastVisitAt.toDate() : null;
  return Boolean(last) && dateKey(last) === todayKey;
}

async function saveVisit(db, payload) {
  const now = Timestamp.now();
  const todayKey = dateKey(now.toDate());
  const people = db.collection("visitPeople");
  const records = db.collection("visitRecords");
  const batch = db.batch();

  const matches = await findContactMatches(db, payload);
  const same = matches.find((doc) => doc.data().nameKey === payload.nameKey);
  let personRef;
  let familyId;

  if (same) {
    // Misma persona (nombre + telefono o correo): se anade la visita a su ficha.
    const current = same.data();
    personRef = same.ref;
    familyId = current.familyId || null;
    const patch = {
      phone: payload.phone,
      phoneKey: payload.phoneKey,
      preferredContact: payload.preferredContact,
      consent: {
        contact: payload.allowContact,
        info: payload.wantsInfo,
        source: "formulario",
        updatedAt: now
      },
      updatedAt: now
    };
    if (payload.email) {
      patch.email = payload.email;
      patch.emailKey = payload.emailKey;
    }
    if (payload.prayerRequest) patch.hasPrayerRequest = true;
    if (!visitedToday(current, todayKey)) {
      patch.lastVisitAt = now;
      patch.visitCount = FieldValue.increment(1);
      if (current.followUpStatus === "contactado") patch.followUpStatus = "regreso";
      batch.set(records.doc(), visitRecordData(personRef.id, payload, now));
    }
    if (payload.companions.length && !familyId) {
      familyId = db.collection("visitFamilies").doc().id;
      patch.familyId = familyId;
    }
    batch.update(personRef, patch);
  } else {
    // Persona nueva. Si comparte telefono o correo con otras fichas se marca
    // para revision; nunca se combinan automaticamente.
    personRef = people.doc();
    familyId = payload.companions.length ? db.collection("visitFamilies").doc().id : null;
    batch.set(personRef, newPersonData({
      ...payload,
      familyId,
      hasPrayerRequest: Boolean(payload.prayerRequest),
      duplicateCandidates: matches.map((doc) => doc.id)
    }, now));
    batch.set(records.doc(), visitRecordData(personRef.id, payload, now));
  }

  if (payload.companions.length) {
    const familyRef = db.collection("visitFamilies").doc(familyId);
    const familySnap = await familyRef.get();
    if (!familySnap.exists) {
      batch.set(familyRef, {
        churchId: CHURCH_ID,
        name: `Familia de ${payload.name}`,
        primaryPersonId: personRef.id,
        createdAt: now
      });
    }
    const membersSnap = await people.where("familyId", "==", familyId).limit(40).get();
    const members = membersSnap.docs.filter((doc) => !doc.data().mergedInto);
    const seen = new Set([payload.nameKey]);

    payload.companions.forEach((companion) => {
      const key = normalizeName(companion.name);
      if (seen.has(key)) return;
      seen.add(key);
      const existing = members.find((doc) => doc.data().nameKey === key);
      if (existing) {
        if (!visitedToday(existing.data(), todayKey)) {
          batch.update(existing.ref, {
            lastVisitAt: now,
            visitCount: FieldValue.increment(1),
            updatedAt: now
          });
          batch.set(records.doc(), visitRecordData(existing.id, payload, now, true));
        }
        return;
      }
      // Los acompanantes tienen ficha y visitas propias, pero el seguimiento
      // se hace a traves del contacto principal.
      const companionRef = people.doc();
      batch.set(companionRef, newPersonData({
        name: companion.name,
        familyId,
        familyRelation: companion.relation,
        trackFollowUp: false,
        allowContact: false,
        wantsInfo: false
      }, now));
      batch.set(records.doc(), visitRecordData(companionRef.id, payload, now, true));
    });
  }

  if (payload.prayerRequest) {
    // Las peticiones viven en la subcoleccion restringida "pastoral".
    batch.set(personRef.collection("pastoral").doc(), {
      type: "peticion",
      text: payload.prayerRequest,
      byUid: "formulario",
      byName: "Formulario público",
      at: now
    });
  }

  await batch.commit();
  return { duplicates: same ? 0 : matches.length, returning: Boolean(same) };
}

exports.registrarVisitaPublica = onCall(
  { region: REGION, maxInstances: 5, cors: true },
  async (request) => {
    const data = request.data || {};

    if (requireAppCheck.value() === "true" && !request.app) {
      throw new HttpsError("failed-precondition", "No pudimos verificar tu dispositivo. Recarga la página e inténtalo de nuevo.");
    }

    // Campo trampa: las personas no lo ven. Se responde "ok" sin guardar nada.
    if (cleanText(data.website, 200)) {
      logger.info("Registro de visita descartado por campo trampa.");
      return { ok: true };
    }
    if (!(Number(data.elapsedMs) >= MIN_FILL_MS)) {
      throw new HttpsError("failed-precondition", "No pudimos procesar el registro. Inténtalo de nuevo.");
    }

    const payload = parsePublicPayload(data);
    const db = getFirestore();
    const ip = (request.rawRequest && request.rawRequest.ip) || "desconocida";
    await checkRateLimit(db, ip);

    const result = await saveVisit(db, payload);
    logger.info("Visita registrada desde el formulario publico.", result);
    // No se devuelve nada sobre fichas existentes: el formulario no debe
    // servir para averiguar quien esta registrado.
    return { ok: true };
  }
);

function escapeHtml(value) {
  return String(value == null ? "" : value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[char]));
}

const CONTACT_LABELS = {
  whatsapp: "WhatsApp",
  llamada: "Llamada",
  texto: "Mensaje de texto",
  correo: "Correo electrónico"
};

function welcomeMessage(person) {
  const first = cleanText(person.name, 80).split(" ")[0];
  const lines = [
    `Hola ${first}:`,
    "",
    `¡Gracias por visitarnos en ${CHURCH_NAME}! Fue una alegría tenerte con nosotros.`,
    "",
    "Queremos que te sientas en casa. Si tienes alguna pregunta, quieres conocer más de la iglesia o hay algo por lo que podamos orar, responde a este correo y con gusto te atendemos.",
    "",
    "¡Esperamos verte pronto!",
    "",
    `Tu familia de ${CHURCH_NAME}`
  ];
  return {
    subject: `¡Gracias por visitarnos en ${CHURCH_NAME}!`,
    text: lines.join("\n"),
    html: `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#12384d;max-width:520px">${
      lines.filter(Boolean).map((line) => `<p>${escapeHtml(line)}</p>`).join("")
    }</div>`
  };
}

function teamMessage(person, personId) {
  const consent = person.consent || {};
  const url = panelUrl.value();
  const rows = [
    ["Nombre", person.name],
    ["Teléfono", person.phone || "No indicó"],
    ["Correo", person.email || "No indicó"],
    ["Prefiere", CONTACT_LABELS[person.preferredContact] || "No indicó"],
    ["Autoriza contacto", consent.contact ? "Sí" : "No"],
    ["Desea información", consent.info ? "Sí" : "No"],
    ["Registrado desde", person.source === "formulario" ? "Formulario público" : "Panel"]
  ];
  // La peticion en si no viaja por correo: es de acceso restringido.
  const prayer = person.hasPrayerRequest
    ? "Dejó una petición de oración. El pastor o el administrador pueden leerla en su ficha."
    : "";
  return {
    subject: `Nuevo visitante: ${cleanText(person.name, 80)}`,
    text: [
      `Nuevo visitante registrado en ${CHURCH_NAME}.`,
      "",
      ...rows.map(([label, value]) => `${label}: ${value}`),
      ...(prayer ? ["", prayer] : []),
      "",
      "Abrir el panel de visitas:",
      url
    ].join("\n"),
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.5;color:#12384d">
        <h2>Nuevo visitante registrado</h2>
        ${rows.map(([label, value]) => `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</p>`).join("")}
        ${prayer ? `<p><em>${escapeHtml(prayer)}</em></p>` : ""}
        <p>
          <a href="${escapeHtml(url)}" style="display:inline-block;background:#12384d;color:#fff;padding:10px 14px;border-radius:8px;text-decoration:none;font-weight:bold">
            Abrir el panel de visitas
          </a>
        </p>
      </div>`,
    personId
  };
}

// Se dispara una sola vez por persona: al crearse su ficha, venga del
// formulario publico o del panel. Las visitas repetidas no envian correos.
exports.correosDeNuevaVisita = onDocumentCreated(
  { document: "visitPeople/{personId}", region: REGION, secrets: [smtpPassword] },
  async (event) => {
    const person = event.data && event.data.data();
    // Los acompanantes no reciben correo ni generan aviso propio.
    if (!person || person.trackFollowUp === false) return;

    const consent = person.consent || {};
    const team = notifyTo.value().split(",").map((item) => item.trim()).filter(Boolean);
    const sendWelcome = welcomeEmail.value() !== "false" && Boolean(person.email) && consent.contact === true;
    if (!team.length && !sendWelcome) return;

    const transporter = createTransporter();
    const from = `"${CHURCH_NAME}" <${smtpUser.value()}>`;
    const jobs = [];

    if (sendWelcome) {
      const message = welcomeMessage(person);
      jobs.push(["bienvenida", transporter.sendMail({
        from,
        to: person.email,
        replyTo: team.length ? team[0] : undefined,
        subject: message.subject,
        text: message.text,
        html: message.html
      })]);
    }
    if (team.length) {
      const message = teamMessage(person, event.params.personId);
      jobs.push(["aviso al equipo", transporter.sendMail({
        from,
        to: team.join(", "),
        subject: message.subject,
        text: message.text,
        html: message.html
      })]);
    }

    // Un correo que falla no debe impedir el otro ni afectar el registro.
    const results = await Promise.allSettled(jobs.map(([, job]) => job));
    results.forEach((result, index) => {
      const kind = jobs[index][0];
      if (result.status === "fulfilled") {
        logger.info(`Correo de visitas enviado: ${kind}.`, { personId: event.params.personId });
      } else {
        logger.error(`No se pudo enviar el correo de visitas: ${kind}.`, {
          personId: event.params.personId,
          error: String(result.reason && result.reason.message)
        });
      }
    });
  }
);

async function getStaff(db, uid) {
  const snap = await db.collection("visitStaff").doc(uid).get();
  return snap.exists ? snap.data() : null;
}

function requireAuth(request) {
  if (!request.auth || !request.auth.uid) {
    throw new HttpsError("unauthenticated", "Inicia sesión para continuar.");
  }
  return request.auth;
}

exports.visitasActivarAdmin = onCall({ region: REGION, maxInstances: 3, cors: true }, async (request) => {
  const auth = requireAuth(request);
  const email = String(auth.token.email || "").toLowerCase();
  const allowed = adminEmails.value()
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

  if (!email || !allowed.includes(email)) {
    return { activated: false };
  }

  const db = getFirestore();
  const ref = db.collection("visitStaff").doc(auth.uid);
  const current = await ref.get();
  if (current.exists) {
    // Respeta una desactivacion hecha desde el panel.
    return { activated: false };
  }
  await ref.set({
    email,
    name: cleanText(auth.token.name, 80) || email,
    role: "admin",
    active: true,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp()
  });
  logger.info("Administrador de visitas activado.", { uid: auth.uid });
  return { activated: true };
});

exports.visitasGuardarEquipo = onCall({ region: REGION, maxInstances: 3, cors: true }, async (request) => {
  const auth = requireAuth(request);
  const db = getFirestore();
  const caller = await getStaff(db, auth.uid);
  if (!caller || caller.active !== true || !MANAGER_ROLES.includes(caller.role)) {
    throw new HttpsError("permission-denied", "Solo el administrador o el pastor pueden gestionar el equipo.");
  }

  const data = request.data || {};
  const email = cleanText(data.email, 120).toLowerCase();
  const name = cleanText(data.name, 80);
  const role = data.role;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    throw new HttpsError("invalid-argument", "Escribe un correo válido.");
  }
  if (!name) {
    throw new HttpsError("invalid-argument", "Escribe el nombre de la persona.");
  }
  if (!ROLES.includes(role)) {
    throw new HttpsError("invalid-argument", "Elige un rol válido.");
  }

  let user;
  let created = false;
  try {
    user = await getAuth().getUserByEmail(email);
  } catch (error) {
    if (error.code !== "auth/user-not-found") throw error;
    // Contrasena aleatoria que nadie conoce: la persona define la suya con
    // el correo de restablecimiento que envia el panel.
    user = await getAuth().createUser({
      email,
      displayName: name,
      password: crypto.randomBytes(24).toString("base64url")
    });
    created = true;
  }

  if (user.uid === auth.uid && role !== caller.role) {
    throw new HttpsError("failed-precondition", "No puedes cambiar tu propio rol.");
  }

  const ref = db.collection("visitStaff").doc(user.uid);
  const existing = await ref.get();
  await ref.set({
    email,
    name,
    role,
    active: true,
    updatedAt: FieldValue.serverTimestamp(),
    ...(existing.exists ? {} : { createdAt: FieldValue.serverTimestamp() })
  }, { merge: true });

  return { uid: user.uid, created };
});
