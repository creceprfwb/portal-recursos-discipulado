# Portal de Recursos de Discipulado

## Requisitos

- Node.js y npm instalados en la máquina de desarrollo.
- Un navegador moderno.

## Ejecutar localmente

```bash
npm install
npm run dev
```

## Construir para producción

```bash
npm run build
```

## Pruebas

```bash
npm run test
```

## Nota

Esta versión inicial usa datos locales de ejemplo para permitir el desarrollo y la demostración del flujo público y administrativo dentro de un embed compatible con Wix.

## Visitas y seguimiento

Módulo para registrar visitantes de la iglesia y darles seguimiento.

- `bienvenida.html` (`bienvenida-wix.html` para Wix): formulario público, sin cuenta. Escribe solo a través de la Cloud Function `registrarVisitaPublica`.
- `admin-visitas.html` (`admin-visitas-wix.html` para Wix): panel del equipo, enlazado desde `admin.html`.
- `js/visitas-core.js` (lógica y fechas de Puerto Rico), `js/visitas-data.js` (Firestore), `functions/visitas.js` (funciones) y las reglas `visit*` en `firestore.rules`.

Colecciones: `visitPeople` (ficha de la persona, con subcolecciones `contacts` y `pastoral`), `visitRecords` (una por visita), `visitFamilies`, `visitStaff` (roles: `bienvenida`, `responsable`, `pastor`, `admin`) y `visitRateLimits` (interna).

### Puesta en marcha

1. Crear `functions/.env` con `VISITAS_ADMIN_EMAILS=correo@ejemplo.com` (los correos, separados por coma, que serán administradores del módulo).
   - `VISITAS_NOTIFY_TO=correo@ejemplo.com`: quién recibe el aviso de cada visitante nuevo (vacío = sin avisos).
   - `VISITAS_WELCOME_EMAIL=false`: desactiva el correo de bienvenida al visitante (por defecto se envía a quien dejó correo y autorizó contacto).
2. `firebase deploy --only functions,firestore:rules`
3. Publicar las páginas y entrar a `admin-visitas.html` con uno de esos correos: la cuenta se activa como administrador y desde la pestaña **Equipo** se añade al resto.

### Mensajes automáticos

- Al crearse una ficha, la función `correosDeNuevaVisita` envía el correo de bienvenida al visitante y el aviso al equipo, con la misma cuenta de correo que usa el muro de oración (`functions/mail.js`). Las visitas repetidas y los acompañantes no generan correos.
- Para mostrar el botón «Escríbenos por WhatsApp» al terminar el formulario, poner el número de la iglesia en `CHURCH_WHATSAPP` (`js/visitas-core.js`).

### Verificación local

```bash
npm run test
# functions/.env.local debe definir VISITAS_ADMIN_EMAILS=pastor@prueba.test
firebase emulators:start --only auth,functions,firestore --project demo-visitas
node scripts/verificar-visitas.mjs
```
