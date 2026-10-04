/**
 * Acceso a datos del panel "Visitas y seguimiento" (Firestore + Functions).
 * Los permisos reales estan en firestore.rules; aqui no se decide quien
 * puede hacer que.
 */
(function () {
  const core = window.VisitasCore;
  const REGION = 'us-central1';
  const localHosts = ['localhost', '127.0.0.1'];
  const useEmulators = localHosts.includes(window.location.hostname) &&
    new URLSearchParams(window.location.search).get('emulador') === '1';

  let auth = null;
  let db = null;
  let functions = null;

  function init() {
    if (db) return true;
    if (!window.firebase || !window.firebaseConfig) return false;
    try {
      const app = firebase.apps.length ? firebase.app() : firebase.initializeApp(window.firebaseConfig);
      auth = firebase.auth();
      db = firebase.firestore();
      functions = app.functions(REGION);
      if (useEmulators) {
        auth.useEmulator('http://127.0.0.1:9099', { disableWarnings: true });
        db.useEmulator('127.0.0.1', 8080);
        functions.useEmulator('127.0.0.1', 5001);
      }
      return true;
    } catch (error) {
      console.warn('No se pudo inicializar Firebase para visitas:', error);
      return false;
    }
  }

  const serverNow = () => firebase.firestore.FieldValue.serverTimestamp();
  const stamp = (date) => firebase.firestore.Timestamp.fromDate(date);

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

  async function getOwnStaff(uid) {
    const snap = await db.collection('visitStaff').doc(uid).get();
    return snap.exists ? fromDoc(snap) : null;
  }

  async function activateAdmin() {
    const result = await functions.httpsCallable('visitasActivarAdmin')({});
    return Boolean(result.data && result.data.activated);
  }

  async function listStaff() {
    const snap = await db.collection('visitStaff').get();
    return snap.docs.map(fromDoc).sort((a, b) => String(a.name).localeCompare(String(b.name), 'es'));
  }

  async function saveStaffMember(member) {
    const result = await functions.httpsCallable('visitasGuardarEquipo')(member);
    if (result.data.created) {
      // La cuenta nueva no tiene contrasena conocida: la persona la define
      // con este correo.
      await auth.sendPasswordResetEmail(member.email);
    }
    return result.data;
  }

  function updateStaffMember(uid, patch) {
    return db.collection('visitStaff').doc(uid).update({ ...patch, updatedAt: serverNow() });
  }

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

  /** Admin y pastor ven todas; el resto solo las que escribio. */
  async function listPastoral(personIds, staff) {
    const isManager = ['admin', 'pastor'].includes(staff.role);
    const snaps = await Promise.all(personIds.map((id) => {
      let query = db.collection('visitPeople').doc(id).collection('pastoral');
      if (!isManager) query = query.where('byUid', '==', staff.id);
      return query.get().catch(() => ({ docs: [] }));
    }));
    return snaps
      .flatMap((snap) => snap.docs.map(fromDoc))
      .sort((a, b) => (b.at || 0) - (a.at || 0));
  }

  function personFields(input) {
    return {
      name: input.name,
      nameKey: core.normalizeName(input.name),
      phone: input.phone || '',
      phoneKey: core.phoneKey(input.phone),
      email: core.emailKey(input.email),
      emailKey: core.emailKey(input.email),
      preferredContact: input.preferredContact || 'whatsapp'
    };
  }

  function newPerson(input, staff, visitedAt) {
    return {
      churchId: core.CHURCH_ID,
      ...personFields(input),
      consent: {
        contact: Boolean(input.allowContact),
        info: Boolean(input.wantsInfo),
        source: 'panel',
        updatedAt: stamp(new Date())
      },
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
      firstVisitAt: stamp(visitedAt),
      lastVisitAt: stamp(visitedAt),
      visitCount: 1,
      duplicateCandidates: input.duplicateCandidates || [],
      duplicateDismissed: [],
      mergedInto: null,
      source: 'panel',
      createdBy: staff.id,
      createdAt: serverNow(),
      updatedAt: serverNow()
    };
  }

  function newRecord(personId, input, staff, visitedAt, isCompanion) {
    return {
      churchId: core.CHURCH_ID,
      personId,
      visitedAt: stamp(visitedAt),
      firstTime: Boolean(input.firstVisit),
      withFamily: (input.companions || []).length > 0,
      consentContact: !isCompanion && Boolean(input.allowContact),
      consentInfo: !isCompanion && Boolean(input.wantsInfo),
      source: 'panel',
      registeredBy: staff.id,
      registeredByName: staff.name || '',
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
   * Registra una visita desde el panel. Con input.existingPerson se anade a
   * esa ficha; sin el, se crea una persona nueva.
   */
  async function registerVisit(input, staff, people) {
    const visitedAt = input.visitedAt || new Date();
    const companions = (input.companions || []).filter((item) => core.normalizeName(item.name).length >= 2);
    const peopleRef = db.collection('visitPeople');
    const recordsRef = db.collection('visitRecords');
    const batch = db.batch();
    const existing = input.existingPerson || null;
    const data = { ...input, companions };
    const alreadyVisited = Boolean(existing) && visitedThatDay(existing, visitedAt);

    let personRef;
    let familyId = existing ? existing.familyId || null : null;
    const createFamily = companions.length > 0 && !familyId;
    if (createFamily) familyId = db.collection('visitFamilies').doc().id;

    if (existing) {
      personRef = peopleRef.doc(existing.id);
      const patch = repeatVisitPatch(existing, visitedAt);
      if (input.updateConsent) {
        patch.consent = {
          contact: Boolean(input.allowContact),
          info: Boolean(input.wantsInfo),
          source: 'panel',
          updatedAt: stamp(new Date())
        };
      }
      if (createFamily) patch.familyId = familyId;
      if (input.prayerRequest) patch.hasPrayerRequest = true;
      batch.update(personRef, patch);
    } else {
      personRef = peopleRef.doc();
      batch.set(personRef, newPerson({
        ...data,
        familyId,
        hasPrayerRequest: Boolean(input.prayerRequest)
      }, staff, visitedAt));
    }
    if (!alreadyVisited) {
      batch.set(recordsRef.doc(), newRecord(personRef.id, data, staff, visitedAt, false));
    }

    if (createFamily) {
      batch.set(db.collection('visitFamilies').doc(familyId), {
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
          batch.update(peopleRef.doc(member.id), repeatVisitPatch(member, visitedAt));
          batch.set(recordsRef.doc(), newRecord(member.id, data, staff, visitedAt, true));
        }
        return;
      }
      const companionRef = peopleRef.doc();
      batch.set(companionRef, newPerson({
        name: companion.name,
        familyId,
        familyRelation: companion.relation || '',
        trackFollowUp: false
      }, staff, visitedAt));
      batch.set(recordsRef.doc(), newRecord(companionRef.id, data, staff, visitedAt, true));
    });

    if (input.prayerRequest) {
      batch.set(personRef.collection('pastoral').doc(), {
        type: 'peticion',
        text: input.prayerRequest,
        byUid: staff.id,
        byName: staff.name || '',
        at: serverNow()
      });
    }

    await batch.commit();
    return { personId: personRef.id, alreadyVisited };
  }

  function updatePerson(personId, patch) {
    return db.collection('visitPeople').doc(personId).update({ ...patch, updatedAt: serverNow() });
  }

  function updateContactData(personId, input) {
    return updatePerson(personId, {
      ...personFields(input),
      consent: {
        contact: Boolean(input.allowContact),
        info: Boolean(input.wantsInfo),
        source: 'panel',
        updatedAt: stamp(new Date())
      }
    });
  }

  async function addContact(person, entry, staff) {
    const batch = db.batch();
    const personRef = db.collection('visitPeople').doc(person.id);
    batch.set(personRef.collection('contacts').doc(), {
      type: entry.type,
      note: entry.note || '',
      byUid: staff.id,
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
      byUid: staff.id,
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
    activateAdmin,
    listStaff,
    saveStaffMember,
    updateStaffMember,
    listPeople,
    listRecords,
    listPersonRecords,
    listContacts,
    listPastoral,
    registerVisit,
    updatePerson,
    updateContactData,
    addContact,
    addPastoralNote,
    dismissDuplicate,
    mergePeople
  };
})();
