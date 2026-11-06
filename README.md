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

Módulo para registrar visitantes de la iglesia y darles seguimiento. Funciona en el plan gratuito de Firebase (sin Cloud Functions).

- `bienvenida.html` (`bienvenida-wix.html` para Wix): formulario público, sin cuenta. Solo puede dejar registros nuevos en `visitSubmissions`; no lee nada.
- `admin-visitas.html` (`admin-visitas-wix.html` para Wix): panel del equipo, enlazado desde `admin.html`. Al abrirse convierte los registros del formulario en fichas y visitas.
- `js/visitas-core.js` (lógica y fechas de Puerto Rico), `js/visitas-data.js` (Firestore) y las reglas `visit*` en `firestore.rules`.

Colecciones: `visitSubmissions` (bandeja de entrada del formulario; la petición de oración va en `private/prayer`), `visitPeople` (ficha de la persona, con subcolecciones `contacts` y `pastoral`), `visitRecords` (una por visita), `visitFamilies` y `visitStaff` (un documento por correo, con rol `bienvenida`, `responsable`, `pastor` o `admin`).

### Acceso

- El panel usa las mismas cuentas del portal, pero exige que el correo esté confirmado; la primera vez el panel envía el correo de confirmación.
- El primer administrador es el correo escrito en `firestore.rules` (regla de `visitStaff`). Al entrar con esa cuenta ya confirmada se da de alta solo.
- El administrador o el pastor añaden al resto en la pestaña **Equipo**, por correo. Quien no tenga cuenta la crea con «Es mi primera vez».

### Puesta en marcha

1. `firebase deploy --only firestore:rules`
2. Publicar las páginas (push a `main`).
3. Entrar a `admin-visitas.html` con el correo de administrador y confirmar el correo.

Para mostrar otro número en el botón «Escríbenos por WhatsApp» del formulario, cambiar `CHURCH_WHATSAPP` en `js/visitas-core.js`.

### Apps de Bienvenida y Visitas

Los enlaces `bienvenida.html` y `admin-visitas.html` conservan su funcionamiento y ahora ofrecen instalación en la pantalla de inicio. Cada uno tiene su propio manifiesto, nombre, icono e inicio en modo `standalone`. Dentro de Wix, «Abrir como app» abre el enlace directo; la instalación se realiza desde esa página, fuera del iframe. En iPhone se muestran instrucciones para Safari.

`js/visitas-app.js` y `visitas-app.css` comparten la interfaz de instalación. Los iconos editables y sus exportaciones PNG están en `files/apps/`. Publicar estos archivos junto con `bienvenida.webmanifest`, `visitas.webmanifest`, `visitas-sw.js` y `visitas-sin-conexion.html` por HTTPS (o localhost para desarrollo).

El service worker solo atiende navegaciones a las páginas de Bienvenida, Visitas y Estacionamiento, incluidas sus entradas Wix. Siempre solicita la página actual a la red y, si no hay conexión, muestra una pantalla de reintento. Su caché guarda únicamente esa pantalla: no almacena respuestas de Firebase, datos de personas ni formularios, y no agrega una cola de envíos. Los registros y paneles requieren conexión. Los permisos de acceso siguen en Firebase.

El calendario público de estacionamiento y su panel de administración también se pueden instalar como apps separadas desde sus páginas directas. Wix ofrece «Abrir como app» a nivel de ventana y sale del iframe. El icono público abre la vista mensual; ambas apps usan el mismo aviso sin conexión y siguen necesitando internet para leer Firebase.

### Verificación local

```bash
npm run test
firebase emulators:start --only auth,firestore --project demo-visitas
node scripts/verificar-visitas.mjs
```
