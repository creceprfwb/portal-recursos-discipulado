/**
 * Verifica el modulo "Visitas y seguimiento" contra los emuladores de
 * Firebase: formulario publico, visitas repetidas, duplicados y permisos.
 * Nunca toca produccion (usa el proyecto de prueba "demo-visitas").
 *
 * 1. En functions/.env.local:  VISITAS_ADMIN_EMAILS=pastor@prueba.test
 * 2. firebase emulators:start --only auth,functions,firestore --project demo-visitas
 * 3. node scripts/verificar-visitas.mjs
 */
const PROJECT = 'demo-visitas';
const AUTH = 'http://127.0.0.1:9099';
const FIRESTORE = 'http://127.0.0.1:8080';
const FUNCTIONS = `http://127.0.0.1:5001/${PROJECT}/us-central1`;
const DOCS = `${FIRESTORE}/v1/projects/${PROJECT}/databases/(default)/documents`;
const OWNER = 'owner';
const PASSWORD = 'clave-de-prueba-123';

let passed = 0;
const failures = [];

function check(label, condition, detail) {
  if (condition) {
    passed += 1;
    console.log(`  ok   ${label}`);
  } else {
    failures.push(label);
    console.log(`  FALLA ${label}${detail === undefined ? '' : ' -> ' + JSON.stringify(detail)}`);
  }
}

function encode(value) {
  if (value === null) return { nullValue: null };
  if (value instanceof Date) return { timestampValue: value.toISOString() };
  if (typeof value === 'boolean') return { booleanValue: value };
  if (typeof value === 'number') return Number.isInteger(value) ? { integerValue: String(value) } : { doubleValue: value };
  if (typeof value === 'string') return { stringValue: value };
  if (Array.isArray(value)) return { arrayValue: { values: value.map(encode) } };
  return { mapValue: { fields: encodeFields(value) } };
}

function encodeFields(object) {
  return Object.fromEntries(Object.entries(object).map(([key, value]) => [key, encode(value)]));
}

function decode(value) {
  if ('nullValue' in value) return null;
  if ('timestampValue' in value) return new Date(value.timestampValue);
  if ('booleanValue' in value) return value.booleanValue;
  if ('integerValue' in value) return Number(value.integerValue);
  if ('doubleValue' in value) return value.doubleValue;
  if ('stringValue' in value) return value.stringValue;
  if ('arrayValue' in value) return (value.arrayValue.values || []).map(decode);
  if ('mapValue' in value) return decodeFields(value.mapValue.fields || {});
  return undefined;
}

function decodeFields(fields) {
  return Object.fromEntries(Object.entries(fields || {}).map(([key, value]) => [key, decode(value)]));
}

function toDoc(raw) {
  return { id: raw.name.split('/').pop(), path: raw.name.split('/documents/')[1], ...decodeFields(raw.fields) };
}

async function request(url, { method = 'GET', token, body } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  const response = await fetch(url, { method, headers, body: body === undefined ? undefined : JSON.stringify(body) });
  const text = await response.text();
  let json = null;
  try { json = text ? JSON.parse(text) : null; } catch (error) { json = { raw: text }; }
  return { status: response.status, ok: response.ok, json };
}

const list = async (path, token) => {
  const result = await request(`${DOCS}/${path}?pageSize=300`, { token });
  return { ...result, docs: (result.json && result.json.documents ? result.json.documents : []).map(toDoc) };
};
const get = (path, token) => request(`${DOCS}/${path}`, { token });
const create = (path, token, data) => request(`${DOCS}/${path}`, { method: 'PATCH', token, body: { fields: encodeFields(data) } });
const patch = (path, token, data) => {
  const mask = Object.keys(data).map((key) => `updateMask.fieldPaths=${encodeURIComponent(key)}`).join('&');
  return request(`${DOCS}/${path}?${mask}&currentDocument.exists=true`, { method: 'PATCH', token, body: { fields: encodeFields(data) } });
};
const remove = (path, token) => request(`${DOCS}/${path}`, { method: 'DELETE', token });

async function queryEqual(parentPath, collectionId, field, value, token) {
  const parent = parentPath ? `${DOCS}/${parentPath}` : DOCS;
  const result = await request(`${parent}:runQuery`, {
    method: 'POST',
    token,
    body: {
      structuredQuery: {
        from: [{ collectionId }],
        where: { fieldFilter: { field: { fieldPath: field }, op: 'EQUAL', value: encode(value) } }
      }
    }
  });
  const rows = Array.isArray(result.json) ? result.json.filter((row) => row.document).map((row) => toDoc(row.document)) : [];
  return { ...result, docs: rows };
}

async function callFunction(name, data, token) {
  const result = await request(`${FUNCTIONS}/${name}`, { method: 'POST', token, body: { data } });
  return {
    status: result.status,
    data: result.json && result.json.result,
    error: result.json && result.json.error ? result.json.error.status : null
  };
}

async function signUp(email) {
  const result = await request(`${AUTH}/identitytoolkit.googleapis.com/v1/accounts:signUp?key=fake`, {
    method: 'POST',
    body: { email, password: PASSWORD, returnSecureToken: true }
  });
  return { uid: result.json.localId, token: result.json.idToken };
}

/** Cuenta creada por visitasGuardarEquipo: se le pone clave para poder entrar. */
async function signInCreated(uid, email) {
  await request(`${AUTH}/identitytoolkit.googleapis.com/v1/projects/${PROJECT}/accounts:update`, {
    method: 'POST',
    token: OWNER,
    body: { localId: uid, password: PASSWORD }
  });
  const result = await request(`${AUTH}/identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=fake`, {
    method: 'POST',
    body: { email, password: PASSWORD, returnSecureToken: true }
  });
  return { uid, token: result.json.idToken };
}

const visitor = (overrides = {}) => ({
  name: 'Ana Rivera',
  phone: '(787) 555-1234',
  email: '',
  preferredContact: 'whatsapp',
  firstVisit: true,
  companions: [],
  wantsInfo: true,
  allowContact: true,
  prayerRequest: '',
  website: '',
  elapsedMs: 9000,
  ...overrides
});

const activePeople = async () => (await list('visitPeople', OWNER)).docs;
const allRecords = async () => (await list('visitRecords', OWNER)).docs;
const denied = (result) => result.status === 403;

async function main() {
  await request(`${FIRESTORE}/emulator/v1/projects/${PROJECT}/databases/(default)/documents`, { method: 'DELETE' });
  await request(`${AUTH}/emulator/v1/projects/${PROJECT}/accounts`, { method: 'DELETE' });

  console.log('\nFormulario publico');
  let result = await callFunction('registrarVisitaPublica', visitor({
    companions: [{ name: 'Luis Rivera', relation: 'Cónyuge' }],
    prayerRequest: 'Oren por mi salud.'
  }));
  check('registra una visita sin cuenta', result.status === 200 && result.data && result.data.ok === true, result);
  check('la respuesta no revela datos internos', JSON.stringify(result.data) === '{"ok":true}', result.data);

  let people = await activePeople();
  let records = await allRecords();
  let ana = people.find((person) => person.nameKey === 'ana rivera');
  const luis = people.find((person) => person.nameKey === 'luis rivera');
  check('crea la ficha y la del acompanante', people.length === 2 && Boolean(ana) && Boolean(luis), people.length);
  check('registra fecha y hora automaticamente', ana.firstVisitAt instanceof Date && Date.now() - ana.firstVisitAt.getTime() < 60000);
  check('una visita por persona', records.length === 2, records.length);
  check('guarda las autorizaciones de contacto', ana.consent.contact === true && ana.consent.info === true);
  check('el acompanante queda en la misma familia y sin seguimiento propio',
    luis.familyId === ana.familyId && luis.trackFollowUp === false && luis.consent.contact === false);
  const prayers = (await list(`visitPeople/${ana.id}/pastoral`, OWNER)).docs;
  check('la peticion de oracion va a la seccion restringida',
    prayers.length === 1 && prayers[0].type === 'peticion' && ana.hasPrayerRequest === true && !('prayerRequest' in ana));

  result = await callFunction('registrarVisitaPublica', visitor());
  records = await allRecords();
  check('reenviar el mismo dia no duplica la visita', result.status === 200 && records.length === 2, records.length);

  console.log('\nVisitas repetidas');
  const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  await patch(`visitPeople/${ana.id}`, OWNER, { firstVisitAt: lastWeek, lastVisitAt: lastWeek, followUpStatus: 'contactado' });
  result = await callFunction('registrarVisitaPublica', visitor({ name: '  ana  RIVÉRA', phone: '+1 787 555 1234', firstVisit: false }));
  people = await activePeople();
  records = await allRecords();
  ana = people.find((person) => person.id === ana.id);
  check('la segunda visita usa la misma ficha', people.filter((person) => person.nameKey === 'ana rivera').length === 1, people.length);
  check('suma la visita al historial',
    ana.visitCount === 2 && records.filter((record) => record.personId === ana.id).length === 2, ana.visitCount);
  check('pasa de "contactado" a "volvio a visitar"', ana.followUpStatus === 'regreso', ana.followUpStatus);

  console.log('\nPosibles duplicados');
  await callFunction('registrarVisitaPublica', visitor({ name: 'Carlos Rivera' }));
  people = await activePeople();
  const carlos = people.find((person) => person.nameKey === 'carlos rivera');
  check('un telefono familiar compartido crea otra ficha, sin combinar', Boolean(carlos) && carlos.id !== ana.id);
  check('y la marca para revision', carlos.duplicateCandidates.includes(ana.id), carlos.duplicateCandidates);

  console.log('\nProteccion contra registros automatizados');
  const before = (await activePeople()).length;
  result = await callFunction('registrarVisitaPublica', visitor({ name: 'Robot Uno', phone: '7870000001', website: 'http://spam.test' }));
  check('el campo trampa descarta el registro en silencio', result.status === 200 && (await activePeople()).length === before);
  result = await callFunction('registrarVisitaPublica', visitor({ name: 'Robot Dos', phone: '7870000002', elapsedMs: 200 }));
  check('rechaza envios instantaneos', result.error === 'FAILED_PRECONDITION', result);
  result = await callFunction('registrarVisitaPublica', visitor({ phone: '123' }));
  check('valida el telefono en el servidor', result.error === 'INVALID_ARGUMENT', result);
  result = await callFunction('registrarVisitaPublica', visitor({ name: '' }));
  check('valida el nombre en el servidor', result.error === 'INVALID_ARGUMENT', result);
  result = await callFunction('registrarVisitaPublica', visitor({ email: 'no-es-correo' }));
  check('valida el correo en el servidor', result.error === 'INVALID_ARGUMENT', result);
  const hour = new Date().toISOString().slice(0, 13);
  await create(`visitRateLimits/global-${hour}`, OWNER, { count: 300 });
  result = await callFunction('registrarVisitaPublica', visitor({ name: 'Persona Tardia', phone: '7870000003' }));
  check('aplica el limite de registros por hora', result.error === 'RESOURCE_EXHAUSTED', result);
  await remove(`visitRateLimits/global-${hour}`, OWNER);
  check('nada de lo rechazado se guardo', (await activePeople()).length === before);

  console.log('\nPublico sin cuenta');
  check('no puede leer visitantes', denied(await list('visitPeople')));
  check('no puede leer una ficha concreta', denied(await get(`visitPeople/${ana.id}`)));
  check('no puede leer visitas', denied(await list('visitRecords')));
  check('no puede leer peticiones', denied(await list(`visitPeople/${ana.id}/pastoral`)));
  check('no puede escribir fichas directamente', denied(await create('visitPeople/intruso', null, { name: 'X', followUpStatus: 'pendiente' })));
  check('no puede leer el equipo', denied(await list('visitStaff')));

  console.log('\nRoles');
  const admin = await signUp('pastor@prueba.test');
  result = await callFunction('visitasActivarAdmin', {}, admin.token);
  check('el correo configurado se activa como administrador', result.data && result.data.activated === true, result);

  const outsider = await signUp('intruso@prueba.test');
  result = await callFunction('visitasActivarAdmin', {}, outsider.token);
  check('otra cuenta no se puede activar sola', result.data && result.data.activated === false, result);
  check('una cuenta sin rol no lee visitantes', denied(await list('visitPeople', outsider.token)));
  check('una cuenta sin rol no puede darse un rol',
    denied(await create(`visitStaff/${outsider.uid}`, outsider.token, { role: 'admin', active: true, name: 'X', email: 'x' })));
  result = await callFunction('visitasGuardarEquipo', { email: 'otro@prueba.test', name: 'Otro', role: 'admin' }, outsider.token);
  check('una cuenta sin rol no gestiona el equipo', result.error === 'PERMISSION_DENIED', result);
  result = await callFunction('visitasGuardarEquipo', { email: 'otro@prueba.test', name: 'Otro', role: 'admin' });
  check('gestionar el equipo exige sesion', result.error === 'UNAUTHENTICATED', result);

  const members = {};
  for (const [key, email, role] of [
    ['welcome', 'bienvenida@prueba.test', 'bienvenida'],
    ['follow', 'responsable@prueba.test', 'responsable'],
    ['follow2', 'responsable2@prueba.test', 'responsable']
  ]) {
    result = await callFunction('visitasGuardarEquipo', { email, name: key, role }, admin.token);
    check(`el administrador anade a ${email}`, result.data && result.data.created === true, result);
    members[key] = await signInCreated(result.data.uid, email);
  }
  const { welcome, follow, follow2 } = members;
  result = await callFunction('visitasGuardarEquipo', { email: 'pastor@prueba.test', name: 'Pastor', role: 'bienvenida' }, admin.token);
  check('nadie cambia su propio rol', result.error === 'FAILED_PRECONDITION', result);
  check('ni desde Firestore', denied(await patch(`visitStaff/${admin.uid}`, admin.token, { role: 'bienvenida' })));

  const basePerson = (uid, extra = {}) => ({
    name: 'Marta Soto', nameKey: 'marta soto', phone: '7875559999', phoneKey: '7875559999',
    followUpStatus: 'pendiente', assignedTo: null, mergedInto: null, createdBy: uid,
    firstVisitAt: new Date(), lastVisitAt: new Date(), visitCount: 1, ...extra
  });

  console.log('\nEquipo de bienvenida');
  check('ve la lista de personas', (await list('visitPeople', welcome.token)).ok);
  check('registra una persona', (await create('visitPeople/marta', welcome.token, basePerson(welcome.uid))).ok);
  check('registra su visita',
    (await create('visitRecords/marta-1', welcome.token, { personId: 'marta', registeredBy: welcome.uid, visitedAt: new Date() })).ok);
  check('no registra a nombre de otro',
    denied(await create('visitRecords/marta-2', welcome.token, { personId: 'marta', registeredBy: admin.uid, visitedAt: new Date() })));
  check('no crea fichas ya asignadas',
    denied(await create('visitPeople/falsa', welcome.token, basePerson(welcome.uid, { assignedTo: welcome.uid }))));
  check('suma una visita repetida', (await patch(`visitPeople/${ana.id}`, welcome.token, { visitCount: 3, lastVisitAt: new Date() })).ok);
  check('no cambia el estado del seguimiento', denied(await patch(`visitPeople/${ana.id}`, welcome.token, { followUpStatus: 'discipulado' })));
  check('no asigna responsables', denied(await patch(`visitPeople/${ana.id}`, welcome.token, { assignedTo: welcome.uid })));
  check('no lee el historial de contactos', denied(await list(`visitPeople/${ana.id}/contacts`, welcome.token)));
  check('no lee notas pastorales ni peticiones', denied(await list(`visitPeople/${ana.id}/pastoral`, welcome.token)));
  check('no borra visitas', denied(await remove('visitRecords/marta-1', welcome.token)));
  check('no borra personas', denied(await remove('visitPeople/marta', welcome.token)));
  check('no cambia roles', denied(await patch(`visitStaff/${welcome.uid}`, welcome.token, { role: 'admin' })));

  console.log('\nResponsable de seguimiento');
  check('no trabaja un seguimiento que no es suyo', denied(await patch(`visitPeople/${ana.id}`, follow.token, { followUpStatus: 'discipulado' })));
  check('no lee contactos de un seguimiento ajeno', denied(await list(`visitPeople/${ana.id}/contacts`, follow.token)));
  check('puede tomar un seguimiento sin asignar',
    (await patch(`visitPeople/${ana.id}`, follow.token, { assignedTo: follow.uid, assignedToName: 'follow' })).ok);
  check('actualiza estado y proxima accion',
    (await patch(`visitPeople/${ana.id}`, follow.token, { followUpStatus: 'discipulado', nextAction: 'Llamar', nextActionDate: '2026-10-10' })).ok);
  check('no acepta estados desconocidos', denied(await patch(`visitPeople/${ana.id}`, follow.token, { followUpStatus: 'otro' })));
  check('registra un contacto',
    (await create(`visitPeople/${ana.id}/contacts/c1`, follow.token, { type: 'llamada', note: 'Hablamos.', byUid: follow.uid, at: new Date() })).ok);
  check('lee el historial de contactos', (await list(`visitPeople/${ana.id}/contacts`, follow.token)).docs.length === 1);
  check('no firma contactos como otra persona',
    denied(await create(`visitPeople/${ana.id}/contacts/c2`, follow.token, { type: 'llamada', note: 'x', byUid: admin.uid, at: new Date() })));
  check('no reasigna el seguimiento a otro', denied(await patch(`visitPeople/${ana.id}`, follow.token, { assignedTo: follow2.uid })));
  check('no le quita el seguimiento a otro', denied(await patch(`visitPeople/${ana.id}`, follow2.token, { assignedTo: follow2.uid })));
  check('otro responsable no lee esos contactos', denied(await list(`visitPeople/${ana.id}/contacts`, follow2.token)));
  check('otro responsable no cambia ese seguimiento', denied(await patch(`visitPeople/${ana.id}`, follow2.token, { nextAction: 'x' })));
  check('escribe una nota pastoral',
    (await create(`visitPeople/${ana.id}/pastoral/n1`, follow.token, { type: 'nota', text: 'Nota delicada.', byUid: follow.uid, at: new Date() })).ok);
  const own = await queryEqual(`visitPeople/${ana.id}`, 'pastoral', 'byUid', follow.uid, follow.token);
  check('lee solo sus propias notas pastorales', own.docs.length === 1 && own.docs[0].id === 'n1', own.json);
  check('no lee la peticion de oracion', denied(await get(`visitPeople/${ana.id}/pastoral/${prayers[0].id}`, follow.token)));
  check('no lista todas las notas pastorales', denied(await list(`visitPeople/${ana.id}/pastoral`, follow.token)));
  check('no combina fichas', denied(await patch(`visitPeople/${carlos.id}`, follow.token, { mergedInto: ana.id })));

  console.log('\nAdministrador o pastor');
  const pastoral = await list(`visitPeople/${ana.id}/pastoral`, admin.token);
  check('lee notas pastorales y peticiones', pastoral.docs.length === 2, pastoral.docs.length);
  check('asigna responsables', (await patch(`visitPeople/${carlos.id}`, admin.token, { assignedTo: follow2.uid, assignedToName: 'follow2' })).ok);
  check('combina fichas', (await patch(`visitPeople/${carlos.id}`, admin.token, { mergedInto: ana.id })).ok);
  check('cambia roles del equipo', (await patch(`visitStaff/${follow2.uid}`, admin.token, { role: 'pastor' })).ok);
  check('no inventa roles', denied(await patch(`visitStaff/${follow2.uid}`, admin.token, { role: 'superadmin' })));
  check('quita el acceso a una persona', (await patch(`visitStaff/${welcome.uid}`, admin.token, { active: false })).ok);
  check('quien pierde el acceso deja de leer visitantes', denied(await list('visitPeople', welcome.token)));
  check('los limites internos no son legibles', denied(await list('visitRateLimits', admin.token)));

  console.log('\nModulos existentes (sin cambios)');
  check('los recursos siguen siendo publicos', (await list('resources')).ok);
  check('el calendario de estacionamiento sigue siendo publico', (await list('parkingAssignments')).ok);

  console.log(`\n${passed} verificaciones correctas, ${failures.length} fallidas.`);
  if (failures.length) {
    failures.forEach((label) => console.log(`  - ${label}`));
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
