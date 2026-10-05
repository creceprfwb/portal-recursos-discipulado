/**
 * Verifica las reglas del modulo "Visitas y seguimiento" contra los
 * emuladores de Firebase: formulario publico y permisos de cada rol.
 * Nunca toca produccion (usa el proyecto de prueba "demo-visitas").
 *
 * 1. firebase emulators:start --only auth,firestore --project demo-visitas
 * 2. node scripts/verificar-visitas.mjs
 */
const PROJECT = 'demo-visitas';
const AUTH = 'http://127.0.0.1:9099';
const FIRESTORE = 'http://127.0.0.1:8080';
const DATABASE = `projects/${PROJECT}/databases/(default)`;
const DOCS = `${FIRESTORE}/v1/${DATABASE}/documents`;
const OWNER = 'owner';
const PASSWORD = 'clave-de-prueba-123';
// Debe coincidir con el correo de administrador escrito en firestore.rules.
const ADMIN_EMAIL = 'jesuseselcentropr@gmail.com';

let passed = 0;
const failures = [];

function check(label, condition, detail) {
  if (condition) {
    passed += 1;
    console.log(`  ok   ${label}`);
  } else {
    failures.push(label);
    console.log(`  FALLA ${label}${detail === undefined ? '' : ' -> ' + JSON.stringify(detail).slice(0, 300)}`);
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
  return { id: raw.name.split('/').pop(), ...decodeFields(raw.fields) };
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

/** Crea un documento poniendo la hora del servidor en los campos indicados. */
const createWithServerTime = (path, token, data, timeFields = ['createdAt']) => request(`${DOCS}:commit`, {
  method: 'POST',
  token,
  body: {
    writes: [{
      update: { name: `${DATABASE}/documents/${path}`, fields: encodeFields(data) },
      updateTransforms: timeFields.map((fieldPath) => ({ fieldPath, setToServerValue: 'REQUEST_TIME' })),
      currentDocument: { exists: false }
    }]
  }
});

async function queryEqual(parentPath, collectionId, field, value, token) {
  const result = await request(`${DOCS}/${parentPath}:runQuery`, {
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

/** Crea una cuenta; con verified=true la deja con el correo confirmado. */
async function account(email, verified = true) {
  const signUp = await request(`${AUTH}/identitytoolkit.googleapis.com/v1/accounts:signUp?key=fake`, {
    method: 'POST',
    body: { email, password: PASSWORD, returnSecureToken: true }
  });
  const uid = signUp.json.localId;
  if (verified) {
    await request(`${AUTH}/identitytoolkit.googleapis.com/v1/projects/${PROJECT}/accounts:update`, {
      method: 'POST',
      token: OWNER,
      body: { localId: uid, emailVerified: true }
    });
  }
  // Se inicia sesion de nuevo para que el token refleje la confirmacion.
  const signIn = await request(`${AUTH}/identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=fake`, {
    method: 'POST',
    body: { email, password: PASSWORD, returnSecureToken: true }
  });
  return { uid, email, token: signIn.json.idToken };
}

const submission = (overrides = {}) => ({
  name: 'Ana Rivera',
  phone: '(787) 555-1234',
  email: '',
  preferredContact: 'whatsapp',
  firstVisit: true,
  companions: [],
  wantsInfo: true,
  allowContact: true,
  hasPrayerRequest: false,
  status: 'nueva',
  ...overrides
});

const staffDoc = (email, role, name) => ({ email, name, role, active: true });
const denied = (result) => result.status === 403;

async function main() {
  await request(`${FIRESTORE}/emulator/v1/${DATABASE}/documents`, { method: 'DELETE' });
  await request(`${AUTH}/emulator/v1/projects/${PROJECT}/accounts`, { method: 'DELETE' });

  console.log('\nFormulario publico (sin cuenta)');
  let result = await createWithServerTime('visitSubmissions/s1', null, submission({ hasPrayerRequest: true }));
  check('deja un registro nuevo', result.ok, result.json);
  result = await createWithServerTime('visitSubmissions/s1/private/prayer', null, { text: 'Oren por mi salud.' });
  check('guarda la peticion de oracion aparte', result.ok, result.json);
  const stored = (await get('visitSubmissions/s1', OWNER)).json;
  check('registra fecha y hora del servidor',
    Math.abs(Date.now() - new Date(stored.fields.createdAt.timestampValue).getTime()) < 60000);
  check('no puede leer su registro ni los de otros', denied(await get('visitSubmissions/s1')) && denied(await list('visitSubmissions')));
  check('no puede leer peticiones', denied(await get('visitSubmissions/s1/private/prayer')));
  check('no puede modificar un registro', denied(await patch('visitSubmissions/s1', null, { name: 'Otro Nombre' })));
  check('no puede borrar un registro', denied(await remove('visitSubmissions/s1')));
  check('no puede poner su propia fecha',
    denied(await create('visitSubmissions/s2', null, submission({ createdAt: new Date('2020-01-01') }))));
  check('no puede marcarlo como ya procesado',
    denied(await createWithServerTime('visitSubmissions/s3', null, submission({ status: 'procesada' }))));
  check('no acepta campos extra',
    denied(await createWithServerTime('visitSubmissions/s4', null, submission({ assignedTo: 'x', role: 'admin' }))));
  check('valida el nombre', denied(await createWithServerTime('visitSubmissions/s5', null, submission({ name: 'A' }))));
  check('valida el largo del nombre', denied(await createWithServerTime('visitSubmissions/s6', null, submission({ name: 'x'.repeat(81) }))));
  check('valida el telefono', denied(await createWithServerTime('visitSubmissions/s7', null, submission({ phone: '123' }))));
  check('valida el medio de contacto', denied(await createWithServerTime('visitSubmissions/s8', null, submission({ preferredContact: 'paloma' }))));
  check('acepta quien le invito',
    (await createWithServerTime('visitSubmissions/s10', null, submission({ invitedBy: 'Marta Soto' }))).ok);
  check('limita el largo de quien le invito',
    denied(await createWithServerTime('visitSubmissions/s11', null, submission({ invitedBy: 'x'.repeat(81) }))));
  check('limita los acompanantes',
    denied(await createWithServerTime('visitSubmissions/s9', null, submission({ companions: Array(9).fill({ name: 'X Y', relation: 'Otro' }) }))));
  check('limita el largo de la peticion',
    denied(await createWithServerTime('visitSubmissions/s1b/private/prayer', null, { text: 'x'.repeat(1001) })));
  check('solo admite el documento de peticion',
    denied(await createWithServerTime('visitSubmissions/s1/private/otro', null, { text: 'x' })));
  check('no puede leer visitantes', denied(await list('visitPeople')));
  check('no puede leer visitas', denied(await list('visitRecords')));
  check('no puede leer el equipo', denied(await list('visitStaff')));
  check('no puede escribir fichas', denied(await create('visitPeople/intruso', null, { name: 'X', followUpStatus: 'pendiente' })));

  console.log('\nAlta del administrador');
  const fake = await account(ADMIN_EMAIL, false);
  check('el correo de administrador SIN confirmar no obtiene acceso',
    denied(await create(`visitStaff/${ADMIN_EMAIL}`, fake.token, staffDoc(ADMIN_EMAIL, 'admin', 'Impostor'))));
  await request(`${AUTH}/emulator/v1/projects/${PROJECT}/accounts`, { method: 'DELETE' });

  const admin = await account(ADMIN_EMAIL);
  check('otro correo confirmado no puede hacerse administrador', await (async () => {
    const other = await account('curioso@prueba.test');
    return denied(await create('visitStaff/curioso@prueba.test', other.token, staffDoc('curioso@prueba.test', 'admin', 'Curioso')));
  })());
  check('el administrador no puede darse de alta con el correo de otro',
    denied(await create('visitStaff/otro@prueba.test', admin.token, staffDoc('otro@prueba.test', 'admin', 'Otro'))));
  result = await create(`visitStaff/${ADMIN_EMAIL}`, admin.token, staffDoc(ADMIN_EMAIL, 'admin', 'Pastor'));
  check('el correo de administrador confirmado se da de alta', result.ok, result.json);

  console.log('\nEquipo');
  for (const [email, role] of [
    ['bienvenida@prueba.test', 'bienvenida'],
    ['responsable@prueba.test', 'responsable'],
    ['responsable2@prueba.test', 'responsable'],
    ['sinconfirmar@prueba.test', 'responsable']
  ]) {
    result = await create(`visitStaff/${email}`, admin.token, staffDoc(email, role, email.split('@')[0]));
    check(`el administrador anade a ${email}`, result.ok, result.json);
  }
  check('no acepta roles inventados',
    denied(await create('visitStaff/x@prueba.test', admin.token, staffDoc('x@prueba.test', 'superadmin', 'X'))));
  check('el correo se guarda en minusculas',
    denied(await create('visitStaff/Mayus@prueba.test', admin.token, staffDoc('Mayus@prueba.test', 'bienvenida', 'M'))));
  check('nadie cambia su propio rol', denied(await patch(`visitStaff/${ADMIN_EMAIL}`, admin.token, { role: 'bienvenida' })));

  const welcome = await account('bienvenida@prueba.test');
  const follow = await account('responsable@prueba.test');
  const follow2 = await account('responsable2@prueba.test');
  const unverified = await account('sinconfirmar@prueba.test', false);
  const outsider = await account('intruso@prueba.test');

  check('quien esta en el equipo pero no confirmo su correo no entra', denied(await list('visitPeople', unverified.token)));
  check('una cuenta confirmada que no esta en el equipo no entra', denied(await list('visitPeople', outsider.token)));
  check('una cuenta sin rol no puede darse un rol',
    denied(await create('visitStaff/intruso@prueba.test', outsider.token, staffDoc('intruso@prueba.test', 'bienvenida', 'I'))));
  check('bienvenida no anade gente al equipo',
    denied(await create('visitStaff/amigo@prueba.test', welcome.token, staffDoc('amigo@prueba.test', 'bienvenida', 'A'))));
  check('bienvenida no cambia roles', denied(await patch('visitStaff/bienvenida@prueba.test', welcome.token, { role: 'admin' })));

  // Datos de base: una ficha con una peticion escrita desde el panel.
  const person = (uid, extra = {}) => ({
    name: 'Ana Rivera', nameKey: 'ana rivera', phone: '7875551234', phoneKey: '7875551234',
    followUpStatus: 'pendiente', assignedTo: null, mergedInto: null, createdBy: uid,
    firstVisitAt: new Date(), lastVisitAt: new Date(), visitCount: 1, ...extra
  });
  await create('visitPeople/ana', OWNER, person('sistema'));
  await create('visitPeople/carlos', OWNER, person('sistema', { name: 'Carlos Rivera', nameKey: 'carlos rivera' }));
  await create('visitPeople/ana/pastoral/p0', OWNER, { type: 'peticion', text: 'Peticion reservada.', byUid: admin.uid, at: new Date() });

  console.log('\nEquipo de bienvenida');
  check('ve la lista de personas', (await list('visitPeople', welcome.token)).ok);
  check('ve los registros del formulario', (await list('visitSubmissions', welcome.token)).docs.length === 2);
  check('pero no la peticion que venia con el registro', denied(await get('visitSubmissions/s1/private/prayer', welcome.token)));
  check('registra una persona', (await create('visitPeople/marta', welcome.token, person(welcome.uid, { name: 'Marta Soto', nameKey: 'marta soto' }))).ok);
  check('registra su visita',
    (await create('visitRecords/marta-1', welcome.token, { personId: 'marta', registeredBy: welcome.uid, visitedAt: new Date() })).ok);
  check('marca un registro del formulario como procesado',
    (await patch('visitSubmissions/s1', welcome.token, { status: 'procesada', personId: 'ana', processedBy: welcome.uid })).ok);
  check('un registro procesado no se vuelve a procesar',
    denied(await patch('visitSubmissions/s1', welcome.token, { status: 'procesada', personId: 'marta' })));
  check('no altera el contenido de un registro',
    denied(await patch('visitSubmissions/s1', welcome.token, { name: 'Cambiado' })));
  check('no registra a nombre de otro',
    denied(await create('visitRecords/marta-2', welcome.token, { personId: 'marta', registeredBy: admin.uid, visitedAt: new Date() })));
  check('no crea fichas ya asignadas',
    denied(await create('visitPeople/falsa', welcome.token, person(welcome.uid, { assignedTo: welcome.email }))));
  check('suma una visita repetida', (await patch('visitPeople/ana', welcome.token, { visitCount: 2, lastVisitAt: new Date() })).ok);
  check('no cambia el estado del seguimiento', denied(await patch('visitPeople/ana', welcome.token, { followUpStatus: 'discipulado' })));
  check('no asigna responsables', denied(await patch('visitPeople/ana', welcome.token, { assignedTo: welcome.email })));
  check('no lee el historial de contactos', denied(await list('visitPeople/ana/contacts', welcome.token)));
  check('no lee notas pastorales ni peticiones', denied(await list('visitPeople/ana/pastoral', welcome.token)));
  check('no borra visitas', denied(await remove('visitRecords/marta-1', welcome.token)));
  check('no borra personas', denied(await remove('visitPeople/marta', welcome.token)));

  console.log('\nResponsable de seguimiento');
  check('no trabaja un seguimiento que no es suyo', denied(await patch('visitPeople/ana', follow.token, { followUpStatus: 'discipulado' })));
  check('no lee contactos de un seguimiento ajeno', denied(await list('visitPeople/ana/contacts', follow.token)));
  check('puede tomar un seguimiento sin asignar',
    (await patch('visitPeople/ana', follow.token, { assignedTo: follow.email, assignedToName: 'Responsable' })).ok);
  check('actualiza estado y proxima accion',
    (await patch('visitPeople/ana', follow.token, { followUpStatus: 'discipulado', nextAction: 'Llamar', nextActionDate: '2026-10-10' })).ok);
  check('no acepta estados desconocidos', denied(await patch('visitPeople/ana', follow.token, { followUpStatus: 'otro' })));
  check('registra un contacto',
    (await create('visitPeople/ana/contacts/c1', follow.token, { type: 'llamada', note: 'Hablamos.', byUid: follow.uid, at: new Date() })).ok);
  check('lee el historial de contactos', (await list('visitPeople/ana/contacts', follow.token)).docs.length === 1);
  check('no firma contactos como otra persona',
    denied(await create('visitPeople/ana/contacts/c2', follow.token, { type: 'llamada', note: 'x', byUid: admin.uid, at: new Date() })));
  check('no reasigna el seguimiento a otro', denied(await patch('visitPeople/ana', follow.token, { assignedTo: follow2.email })));
  check('no le quita el seguimiento a otro', denied(await patch('visitPeople/ana', follow2.token, { assignedTo: follow2.email })));
  check('otro responsable no lee esos contactos', denied(await list('visitPeople/ana/contacts', follow2.token)));
  check('otro responsable no cambia ese seguimiento', denied(await patch('visitPeople/ana', follow2.token, { nextAction: 'x' })));
  check('escribe una nota pastoral',
    (await create('visitPeople/ana/pastoral/n1', follow.token, { type: 'nota', text: 'Nota delicada.', byUid: follow.uid, at: new Date() })).ok);
  const own = await queryEqual('visitPeople/ana', 'pastoral', 'byUid', follow.uid, follow.token);
  check('lee solo sus propias notas pastorales', own.docs.length === 1 && own.docs[0].id === 'n1', own.json);
  check('no lee peticiones de otros', denied(await get('visitPeople/ana/pastoral/p0', follow.token)));
  check('no lee la peticion del formulario', denied(await get('visitSubmissions/s1/private/prayer', follow.token)));
  check('no lista todas las notas pastorales', denied(await list('visitPeople/ana/pastoral', follow.token)));
  check('no combina fichas', denied(await patch('visitPeople/carlos', follow.token, { mergedInto: 'ana' })));

  console.log('\nAdministrador o pastor');
  check('lee notas pastorales y peticiones', (await list('visitPeople/ana/pastoral', admin.token)).docs.length === 2);
  result = await get('visitSubmissions/s1/private/prayer', admin.token);
  check('lee la peticion que llego por el formulario', result.ok && result.json.fields.text.stringValue === 'Oren por mi salud.');
  check('asigna responsables', (await patch('visitPeople/carlos', admin.token, { assignedTo: follow2.email, assignedToName: 'R2' })).ok);
  check('combina fichas', (await patch('visitPeople/carlos', admin.token, { mergedInto: 'ana' })).ok);
  check('cambia roles del equipo', (await patch('visitStaff/responsable2@prueba.test', admin.token, { role: 'pastor' })).ok);
  check('no inventa roles', denied(await patch('visitStaff/responsable2@prueba.test', admin.token, { role: 'superadmin' })));
  check('quita el acceso a una persona', (await patch('visitStaff/bienvenida@prueba.test', admin.token, { active: false })).ok);
  check('quien pierde el acceso deja de leer visitantes', denied(await list('visitPeople', welcome.token)));
  check('no borra miembros del equipo', denied(await remove('visitStaff/bienvenida@prueba.test', admin.token)));

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
