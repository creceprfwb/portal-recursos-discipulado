'use strict';

const CACHE = 'jeec-apps-offline-v2';
const OFFLINE = new URL('./visitas-sin-conexion.html', self.location.href).href;
const PAGES = new Set([
  'bienvenida.html', 'bienvenida-wix.html', 'admin-visitas.html', 'admin-visitas-wix.html',
  'estacionamiento.html', 'estacionamiento-wix.html', 'admin-estacionamiento.html', 'admin-estacionamiento-wix.html',
]
  .map((name) => new URL('./' + name, self.location.href).pathname));

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.add(OFFLINE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys
    .filter((key) => (key.startsWith('jeec-apps-offline-') || key === 'jeec-visitas-offline-v1') && key !== CACHE)
    .map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  // No interceptar Firebase, formularios, recursos ni otras paginas del portal.
  if (event.request.method !== 'GET' || event.request.mode !== 'navigate' ||
      url.origin !== self.location.origin || !PAGES.has(url.pathname)) return;
  event.respondWith(fetch(event.request).catch(async () => {
    const cache = await caches.open(CACHE);
    return (await cache.match(OFFLINE)) || Response.error();
  }));
});
