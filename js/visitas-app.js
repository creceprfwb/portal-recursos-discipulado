(function () {
  'use strict';

  const admin = location.pathname.endsWith('/admin-visitas.html');
  const embedded = window.self !== window.top;
  const standalone = window.matchMedia('(display-mode: standalone)');
  const installed = () => standalone.matches || navigator.standalone === true;
  const name = admin ? 'Visitas' : 'Bienvenida';
  const root = document.documentElement;
  const shell = document.querySelector('main.shell');
  if (!shell) return;

  // Un enlace antiguo de Wix abierto directamente debe recuperar el menu fijo.
  if (!embedded) root.classList.remove('embed-mode');
  root.classList.toggle('visit-app-standalone', installed());

  const bar = document.createElement('section');
  bar.className = 'visit-app-bar';
  bar.setAttribute('aria-label', 'App de ' + name.toLowerCase());
  const brand = document.createElement('div');
  brand.className = 'visit-app-brand';
  const icon = document.createElement('img');
  icon.src = './files/apps/' + (admin ? 'visitas' : 'bienvenida') + '-192.png';
  icon.alt = '';
  const label = document.createElement('div');
  const title = document.createElement('strong');
  title.textContent = name;
  const subtitle = document.createElement('small');
  subtitle.textContent = admin ? 'Equipo de bienvenida' : 'Jesús es el Centro';
  label.append(title, subtitle);
  brand.append(icon, label);
  bar.append(brand);

  const action = document.createElement(embedded ? 'a' : 'button');
  action.className = 'visit-app-action';
  if (embedded) {
    const direct = new URL(admin ? './admin-visitas.html' : './bienvenida.html', location.href);
    direct.searchParams.set('app', '1');
    action.href = direct.href;
    action.setAttribute('data-open-app', '');
    action.target = '_blank';
    action.rel = 'noopener';
    action.textContent = 'Abrir como app';
  } else {
    action.type = 'button';
    action.textContent = 'Añadir al teléfono';
    action.hidden = installed();
  }
  bar.append(action);
  const network = document.createElement('div');
  network.className = 'visit-app-network';
  network.setAttribute('role', 'status');
  network.hidden = navigator.onLine;
  network.textContent = 'Sin conexión. Necesitas internet para enviar registros y consultar información actualizada.';
  shell.prepend(bar, network);
  const updateNetwork = () => { network.hidden = navigator.onLine; };
  window.addEventListener('online', updateNetwork);
  window.addEventListener('offline', updateNetwork);

  if (embedded) return;

  const help = document.createElement('dialog');
  help.className = 'visit-app-help';
  help.setAttribute('aria-labelledby', 'visitAppHelpTitle');
  const heading = document.createElement('h2');
  heading.id = 'visitAppHelpTitle';
  heading.textContent = 'Instalar ' + name;
  const instructions = document.createElement('p');
  const ios = /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  instructions.textContent = ios
    ? 'En Safari, abre el menú Compartir y elige Añadir a pantalla de inicio. Si aparece la opción Abrir como app web, déjala activada. Después toca Añadir.'
    : 'Abre el menú de tu navegador y busca Instalar aplicación o Añadir a pantalla de inicio. En una computadora, busca el icono de instalación junto a la dirección. Si no aparece, abre este enlace en Chrome o Edge.';
  const note = document.createElement('p');
  note.textContent = 'Después, abre ' + name + ' desde su icono. Necesitarás conexión a internet.';
  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'visit-app-action';
  close.textContent = 'Entendido';
  close.addEventListener('click', () => help.close());
  help.append(heading, instructions, note, close);
  document.body.append(help);

  let installPrompt = null;
  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    installPrompt = event;
    action.textContent = 'Instalar app';
    action.hidden = installed();
  });
  action.addEventListener('click', async () => {
    if (!installPrompt) { help.showModal(); return; }
    const prompt = installPrompt;
    installPrompt = null;
    action.disabled = true;
    try {
      await prompt.prompt();
      const choice = await prompt.userChoice;
      if (choice.outcome === 'accepted') action.hidden = true;
    } catch {
      help.showModal();
    } finally {
      action.disabled = false;
      action.textContent = 'Añadir al teléfono';
    }
  });
  window.addEventListener('appinstalled', () => { installPrompt = null; action.hidden = true; });
  standalone.addEventListener('change', () => {
    root.classList.toggle('visit-app-standalone', installed());
    action.hidden = installed();
  });

  if ('serviceWorker' in navigator && window.isSecureContext) {
    // Solo maneja navegaciones de estas dos paginas; nunca almacena datos de visitas.
    navigator.serviceWorker.register('./visitas-sw.js', { scope: './', updateViaCache: 'none' })
      .catch(() => { /* El formulario sigue disponible sin instalacion. */ });
  }
})();
