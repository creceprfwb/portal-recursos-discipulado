/**
 * Acceso a datos del panel "Visitas y seguimiento" (Firestore y Auth).
 * Los permisos reales estan en firestore.rules; aqui no se decide quien
 * puede hacer que.
 *
 * El formulario publico solo deja registros en visitSubmissions. Este
 * modulo los convierte en fichas y visitas cuando alguien del equipo abre
 * el panel (processSubmission).
 */
(function () {
  const core = window.VisitasCore;
  const localHosts = ['localhost', '127.0.0.1'];
  const useEmulators = localHosts.includes(window.location.hostname) &&
    new URLSearchParams(window.location.search).get('emulador') === '1';

  let auth = null;
  let db = null;

  function init() {
    if (db) return true;
    if (!window.firebase || !window.firebaseConfig) return false;
    try {
      if (!firebase.apps.length) firebase.initializeApp(window.firebaseConfig);
      auth = firebase.auth();
      db = firebase.firestore();
      if (useEmulators) {
        auth.useEmulator('http://127.0.0.1:9099', { disableWarnings: true });
        db.useEmulator('127.0.0.1', 8080);
      }
      return true;
    } catch (error) {
      console.warn('No se pudo inicializar Firebase para visitas:', error);
      return false;
    }
  }

  const serverNow = () => firebase.firestore.FieldValue.serverTimestamp();
  const stamp = (date) => firebase.firestore.Timestamp.fromDate(date);
  const clean = (value, max) => String(value == null ? '' : value).replace(/\s+/g, ' ').trim().slice(0, max);

  function fromDoc(doc) {
    const data = doc.data();
    const out = { id: doc.id };
    Object.keys(data).forEach((key) => {
      const value = data[key];
      out[key] = value && typeof value.toDate === 'function' ? value.toDate() : value;
    });
    if (out.consent && out.consent.updatedAt && typeof out.consent.updatedAt.toDate === 'function') {
      out.consent = { ...out.consent, updatedAt: out.consent.updatedAt.toDate() };
    }
    return out;
  }

  // ===== Equipo =====
  // Cada persona del equipo es visitStaff/{correo}. "id" es el correo y
  // "uid" la cuenta con la que firma lo que escribe.

  async function getOwnStaff(user) {
    const snap = await db.collection('visitStaff').doc(user.email).get();
    return snap.exists ? { ...fromDoc(snap), uid: user.uid } : null;
  }

  /**
   * Alta del primer administrador. Las reglas solo la aceptan para los
   * correos listados en firestore.rules; para el resto falla y no pasa nada.
   */
  async function bootstrapAdmin(user) {
    try {
      await db.collection('visitStaff').doc(user.email).set({
        email: user.email,
        name: user.displayName || user.email,
        role: 'admin',
        active: true,
        createdAt: serverNow(),
        updatedAt: serverNow()
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async function listStaff() {
    const snap = await db.collection('visitStaff').get();
    return snap.docs.map(fromDoc).sort((a, b) => String(a.name).localeCompare(String(b.name), 'es'));
  }

  function addStaffMember(member) {
    return db.collection('visitStaff').doc(member.email).set({
      email: member.email,
      name: member.name,
      role: member.role,
      active: true,
      createdAt: serverNow(),
      updatedAt: serverNow()
    });
  }

  function updateStaffMember(email, patch) {
    return db.collection('visitStaff').doc(email).update({ ...patch, updatedAt: serverNow() });
  }

  // ===== Lecturas =====

  async function listPeople() {
    const snap = await db.collection('visitPeople').orderBy('lastVisitAt', 'desc').limit(3000).get();
    return snap.docs.map(fromDoc);
  }

  async function listRecords(fromKey, toKey) {
    const snap = await db.collection('visitRecords')
      .where('visitedAt', '>=', stamp(core.dayStart(fromKey)))
      .where('visitedAt', '<', stamp(core.dayEnd(toKey)))
      .get();
    return snap.docs.map(fromDoc);
  }

  async function listPersonRecords(personIds) {
    const snaps = await Promise.all(personIds.map((id) =>
      db.collection('visitRecords').where('personId', '==', id).get()));
    return snaps
      .flatMap((snap) => snap.docs.map(fromDoc))
      .sort((a, b) => b.visitedAt - a.visitedAt);
  }

  async function listContacts(personIds) {
    // Una ficha combinada puede traer historial de otra que no esta asignada
    // a quien consulta; esa parte simplemente no se muestra.
    const snaps = await Promise.all(personIds.map((id) =>
      db.collection('visitPeople').doc(id).collection('contacts').get().catch(() => ({ docs: [] }))));
    return snaps
      .flatMap((snap) => snap.docs.map(fromDoc))
      .sort((a, b) => (b.at || 0) - (a.at || 0));
  }

  /**
   * Notas pastorales y peticiones. Admin y pastor ven todas, incluidas las
   * peticiones que llegaron por el formulario; el resto solo sus notas.
   */
  async function listPastoral(people, staff) {
    const isManager = ['admin', 'pastor'].includes(staff.role);
    const noteSnaps = await Promise.all(people.map((person) => {
      let query = db.collection('visitPeople').doc(person.id).collection('pastoral');
      if (!isManager) query = query.where('byUid', '==', staff.uid);
      return query.get().catch(() => ({ docs: [] }));
    }));
    const notes = noteSnaps.flatMap((snap) => snap.docs.map(fromDoc));

    if (isManager) {
      const ids = people.flatMap((person) => person.prayerSubmissionIds || []);
      const prayerSnaps = await Promise.all(ids.map((id) =>
        db.collection('visitSubmissions').doc(id).collection('private').doc('prayer').get().catch(() => null)));
      prayerSnaps.forEach((snap, index) => {
        if (!snap || !snap.exists) return;
        const prayer = fromDoc(snap);
        notes.push({
          id: 'peticion-' + ids[index],
          type: 'peticion',
          text: prayer.text,
          byName: 'Formulario público',
          at: prayer.createdAt
        });
      });
    }
    return notes.sort((a, b) => (b.at || 0) - (a.at || 0));
  }

  // ===== Registro de visitas =====

  function personFields(input) {
    return {
      name: input.name,
      nameKey: core.normalizeName(input.name),
      phone: input.phone || '',
      phoneKey: core.phoneKey(input.phone),
      email: core.emailKey(input.email),
      emailKey: core.emailKey(input.email),
      preferredContact: input.preferredContact || 'whatsapp',
      invitedBy: clean(input.invitedBy, 80)
    };
  }

  function consentOf(input, source) {
    return {
      contact: Boolean(input.allowContact),
      info: Boolean(input.wantsInfo),
      source,
      updatedAt: stamp(new Date())
    };
  }

  function newPerson(input, staff, visitedAt, source) {
    return {
      churchId: core.CHURCH_ID,
      ...personFields(input),
      consent: consentOf(input, source),
      familyId: input.familyId || null,
      familyRelation: input.familyRelation || '',
      trackFollowUp: input.trackFollowUp !== false,
      followUpStatus: 'pendiente',
      assignedTo: null,
      assignedToName: '',
      nextAction: '',
      nextActionDate: '',
      lastContactAt: null,
      hasPrayerRequest: Boolean(input.hasPrayerRequest),
      prayerSubmissionIds: input.prayerSubmissionIds || [],
      firstVisitAt: stamp(visitedAt),
      lastVisitAt: stamp(visitedAt),
      visitCount: 1,
      duplicateCandidates: input.duplicateCandidates || [],
      duplicateDismissed: [],
      mergedInto: null,
      source,
      createdBy: staff.uid,
      createdAt: serverNow(),
      updatedAt: serverNow()
    };
  }

  function newRecord(personId, input, staff, visitedAt, source, isCompanion) {
    return {
      churchId: core.CHURCH_ID,
      personId,
      visitedAt: stamp(visitedAt),
      firstTime: Boolean(input.firstVisit),
      withFamily: (input.companions || []).length > 0,
      // Las autorizaciones las da el contacto principal solo para si mismo.
      consentContact: !isCompanion && Boolean(input.allowContact),
      consentInfo: !isCompanion && Boolean(input.wantsInfo),
      source,
      registeredBy: staff.uid,
      registeredByName: source === 'formulario' ? 'Formulario público' : staff.name || '',
      createdAt: serverNow()
    };
  }

  /** Una persona cuenta una sola visita por dia. */
  function visitedThatDay(person, visitedAt) {
    return Boolean(person.lastVisitAt) && core.dateKey(person.lastVisitAt) === core.dateKey(visitedAt);
  }

  function repeatVisitPatch(person, visitedAt) {
    if (visitedThatDay(person, visitedAt)) return { updatedAt: serverNow() };
    const patch = {
      visitCount: firebase.firestore.FieldValue.increment(1),
      updatedAt: serverNow()
    };
    if (!person.lastVisitAt || visitedAt > person.lastVisitAt) patch.lastVisitAt = stamp(visitedAt);
    // Una visita anterior anotada despues pasa a ser la primera visita.
    if (person.firstVisitAt && visitedAt < person.firstVisitAt) patch.firstVisitAt = stamp(visitedAt);
    if (person.followUpStatus === 'contactado') patch.followUpStatus = 'regreso';
    return patch;
  }

  /**
   * Anade a "writer" (un lote o una transaccion) todo lo necesario para
   * registrar una visita: ficha nueva o actualizada, visita, familia y
   * acompanantes. Devuelve las fichas locales nuevas o cambiadas.
   */
  function writeVisit(writer, input, staff, people, source) {
    const visitedAt = input.visitedAt || new Date();
    const companions = (input.companions || [])
      .slice(0, 8)
      .map((item) => ({ name: clean(item && item.name, 80), relation: clean(item && item.relation, 40) }))
      .filter((item) => core.normalizeName(item.name).length >= 2);
    const peopleRef = db.collection('visitPeople');
    const recordsRef = db.collection('visitRecords');
    const existing = input.existingPerson || null;
    const data = { ...input, companions };
    const alreadyVisited = Boolean(existing) && visitedThatDay(existing, visitedAt);
    const touched = [];

    let personRef;
    let familyId = existing ? existing.familyId || null : null;
    const createFamily = companions.length > 0 && !familyId;
    if (createFamily) familyId = db.collection('visitFamilies').doc().id;

    if (existing) {
      personRef = peopleRef.doc(existing.id);
      const patch = repeatVisitPatch(existing, visitedAt);
      if (input.updateConsent) patch.consent = consentOf(input, source);
      if (source === 'formulario') {
        // Quien llena el formulario confirma sus propios datos de contacto.
        patch.phone = input.phone || '';
        patch.phoneKey = core.phoneKey(input.phone);
        patch.preferredContact = input.preferredContact || 'whatsapp';
        if (input.email) {
          patch.email = core.emailKey(input.email);
          patch.emailKey = core.emailKey(input.email);
        }
      }
      // Se conserva quien le invito la primera vez.
      if (input.invitedBy && !existing.invitedBy) patch.invitedBy = clean(input.invitedBy, 80);
      if (createFamily) patch.familyId = familyId;
      if (input.hasPrayerRequest) patch.hasPrayerRequest = true;
      if (input.prayerSubmissionId) {
        patch.prayerSubmissionIds = firebase.firestore.FieldValue.arrayUnion(input.prayerSubmissionId);
      }
      writer.update(personRef, patch);
      touched.push({
        ...existing,
        familyId,
        lastVisitAt: !existing.lastVisitAt || visitedAt > existing.lastVisitAt ? visitedAt : existing.lastVisitAt
      });
    } else {
      personRef = peopleRef.doc();
      const person = newPerson({
        ...data,
        familyId,
        prayerSubmissionIds: input.prayerSubmissionId ? [input.prayerSubmissionId] : []
      }, staff, visitedAt, source);
      writer.set(personRef, person);
      touched.push({ ...person, id: personRef.id, firstVisitAt: visitedAt, lastVisitAt: visitedAt });
    }
    if (!alreadyVisited) {
      writer.set(recordsRef.doc(), newRecord(personRef.id, data, staff, visitedAt, source, false));
    }

    if (createFamily) {
      writer.set(db.collection('visitFamilies').doc(familyId), {
        churchId: core.CHURCH_ID,
        name: 'Familia de ' + (existing ? existing.name : input.name),
        primaryPersonId: personRef.id,
        createdAt: serverNow()
      });
    }

    const members = familyId
      ? (people || []).filter((person) => person.familyId === familyId && core.isActivePerson(person))
      : [];
    const seen = {};
    seen[core.normalizeName(existing ? existing.name : input.name)] = true;
    companions.forEach((companion) => {
      const key = core.normalizeName(companion.name);
      if (seen[key]) return;
      seen[key] = true;
      const member = members.find((person) => core.normalizeName(person.name) === key);
      if (member) {
        if (!visitedThatDay(member, visitedAt)) {
          writer.update(peopleRef.doc(member.id), repeatVisitPatch(member, visitedAt));
          writer.set(recordsRef.doc(), newRecord(member.id, data, staff, visitedAt, source, true));
          touched.push({ ...member, lastVisitAt: visitedAt });
        }
        return;
      }
      // Los acompanantes tienen ficha y visitas propias, pero el seguimiento
      // se hace a traves del contacto principal.
      const companionRef = peopleRef.doc();
      const person = newPerson({
        name: companion.name,
        invitedBy: input.invitedBy,
        familyId,
        familyRelation: companion.relation,
        trackFollowUp: false
      }, staff, visitedAt, source);
      writer.set(companionRef, person);
      writer.set(recordsRef.doc(), newRecord(companionRef.id, data, staff, visitedAt, source, true));
      touched.push({ ...person, id: companionRef.id, firstVisitAt: visitedAt, lastVisitAt: visitedAt });
    });

    return { personRef, alreadyVisited, touched };
  }

  /**
   * Registra una visita desde el panel. Con input.existingPerson se anade a
   * esa ficha; sin el, se crea una persona nueva.
   */
  async function registerVisit(input, staff, people) {
    const batch = db.batch();
    const result = writeVisit(batch, {
      ...input,
      hasPrayerRequest: Boolean(input.prayerRequest)
    }, staff, people, 'panel');
    if (input.prayerRequest) {
      batch.set(result.personRef.collection('pastoral').doc(), {
        type: 'peticion',
        text: input.prayerRequest,
        byUid: staff.uid,
        byName: staff.name || '',
        at: serverNow()
      });
    }
    await batch.commit();
    return { personId: result.personRef.id, alreadyVisited: result.alreadyVisited };
  }

  // ===== Registros del formulario publico =====

  async function listPendingSubmissions() {
    const snap = await db.collection('visitSubmissions').where('status', '==', 'nueva').get();
    return snap.docs.map(fromDoc).sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
  }

  /**
   * Convierte un registro del formulario en ficha y visita. La transaccion
   * marca el registro como procesado en el mismo paso, asi que dos personas
   * con el panel abierto no lo duplican. Devuelve las fichas tocadas, o null
   * si otro ya lo habia procesado.
   */
  async function processSubmission(submission, staff, people) {
    const input = {
      name: clean(submission.name, 80),
      phone: clean(submission.phone, 30),
      email: core.isValidEmail(submission.email) ? core.emailKey(submission.email) : '',
      preferredContact: submission.preferredContact,
      firstVisit: submission.firstVisit !== false,
      invitedBy: clean(submission.invitedBy, 80),
      wantsInfo: submission.wantsInfo === true,
      allowContact: submission.allowContact === true,
      companions: Array.isArray(submission.companions) ? submission.companions : [],
      hasPrayerRequest: submission.hasPrayerRequest === true,
      prayerSubmissionId: submission.hasPrayerRequest === true ? submission.id : '',
      visitedAt: submission.createdAt || new Date(),
      updateConsent: true
    };
    // Misma persona = mismo nombre y mismo telefono o correo. Quien solo
    // comparte el telefono queda como posible duplicado, sin combinar.
    const matches = core.findMatches(people, input);
    const same = matches.find((match) => match.sameName);
    input.existingPerson = same ? same.person : null;
    input.duplicateCandidates = same ? [] : matches.map((match) => match.person.id);

    const ref = db.collection('visitSubmissions').doc(submission.id);
    return db.runTransaction(async (tx) => {
      const snap = await tx.get(ref);
      if (!snap.exists || snap.data().status !== 'nueva') return null;
      const result = writeVisit(tx, input, staff, people, 'formulario');
      tx.update(ref, {
        status: 'procesada',
        personId: result.personRef.id,
        processedAt: serverNow(),
        processedBy: staff.uid
      });
      return result.touched;
    });
  }

  /** Solo admin o pastor: descarta registros que no son visitas reales. */
  async function discardSubmissions(submissions, staff) {
    for (let start = 0; start < submissions.length; start += 400) {
      const batch = db.batch();
      submissions.slice(start, start + 400).forEach((submission) => {
        batch.update(db.collection('visitSubmissions').doc(submission.id), {
          status: 'descartada',
          processedAt: serverNow(),
          processedBy: staff.uid
        });
      });
      await batch.commit();
    }
  }

  // ===== Seguimiento =====

  function updatePerson(personId, patch) {
    return db.collection('visitPeople').doc(personId).update({ ...patch, updatedAt: serverNow() });
  }

  function updateContactData(personId, input) {
    return updatePerson(personId, {
      ...personFields(input),
      consent: consentOf(input, 'panel')
    });
  }

  async function addContact(person, entry, staff) {
    const batch = db.batch();
    const personRef = db.collection('visitPeople').doc(person.id);
    batch.set(personRef.collection('contacts').doc(), {
      type: entry.type,
      note: entry.note || '',
      byUid: staff.uid,
      byName: staff.name || '',
      at: serverNow()
    });
    const patch = { updatedAt: serverNow() };
    if (entry.type !== 'nota') patch.lastContactAt = serverNow();
    if (entry.status && entry.status !== person.followUpStatus) patch.followUpStatus = entry.status;
    batch.update(personRef, patch);
    await batch.commit();
  }

  function addPastoralNote(personId, text, staff) {
    return db.collection('visitPeople').doc(personId).collection('pastoral').add({
      type: 'nota',
      text,
      byUid: staff.uid,
      byName: staff.name || '',
      at: serverNow()
    });
  }

  function dismissDuplicate(personId, otherId) {
    return updatePerson(personId, {
      duplicateDismissed: firebase.firestore.FieldValue.arrayUnion(otherId)
    });
  }

  /**
   * Combina "source" dentro de "target". La ficha origen no se borra: queda
   * marcada con mergedInto y sus notas se siguen mostrando en la de destino.
   */
  async function mergePeople(source, target, people) {
    const [sourceRecords, targetRecords] = await Promise.all([
      listPersonRecords([source.id]),
      listPersonRecords([target.id])
    ]);
    const batch = db.batch();
    const days = {};
    targetRecords.forEach((record) => { days[core.dateKey(record.visitedAt)] = true; });
    const kept = targetRecords.slice();

    sourceRecords.forEach((record) => {
      const ref = db.collection('visitRecords').doc(record.id);
      const day = core.dateKey(record.visitedAt);
      if (days[day]) {
        // La misma visita registrada dos veces: se conserva una sola.
        batch.delete(ref);
        return;
      }
      days[day] = true;
      kept.push(record);
      batch.update(ref, { personId: target.id });
    });

    const times = kept.map((record) => record.visitedAt.getTime());
    const patch = {
      visitCount: Math.max(kept.length, 1),
      hasPrayerRequest: Boolean(target.hasPrayerRequest || source.hasPrayerRequest),
      prayerSubmissionIds: (target.prayerSubmissionIds || []).concat(source.prayerSubmissionIds || []),
      duplicateCandidates: (target.duplicateCandidates || []).filter((id) => id !== source.id),
      updatedAt: serverNow()
    };
    if (times.length) {
      patch.firstVisitAt = stamp(new Date(Math.min.apply(null, times)));
      patch.lastVisitAt = stamp(new Date(Math.max.apply(null, times)));
    }
    if (!target.email && source.email) {
      patch.email = source.email;
      patch.emailKey = source.emailKey || '';
    }
    if (!target.phone && source.phone) {
      patch.phone = source.phone;
      patch.phoneKey = source.phoneKey || '';
    }
    if (!target.invitedBy && source.invitedBy) patch.invitedBy = source.invitedBy;
    if (!target.familyId && source.familyId) patch.familyId = source.familyId;
    batch.update(db.collection('visitPeople').doc(target.id), patch);

    batch.update(db.collection('visitPeople').doc(source.id), {
      mergedInto: target.id,
      duplicateCandidates: [],
      updatedAt: serverNow()
    });
    (people || []).forEach((person) => {
      if (person.mergedInto === source.id) {
        batch.update(db.collection('visitPeople').doc(person.id), { mergedInto: target.id });
      }
    });

    await batch.commit();
  }

  window.VisitasData = {
    init,
    get auth() { return auth; },
    getOwnStaff,
    bootstrapAdmin,
    listStaff,
    addStaffMember,
    updateStaffMember,
    listPeople,
    listRecords,
    listPersonRecords,
    listContacts,
    listPastoral,
    registerVisit,
    listPendingSubmissions,
    processSubmission,
    discardSubmissions,
    updatePerson,
    updateContactData,
    addContact,
    addPastoralNote,
    dismissDuplicate,
    mergePeople
  };
})();
