const CACHE = "beloved-body-pwa-v28";
const ARCHIVOS = [
  "./",
  "./index.html",
  "./confirmar.html",
  "./style.css",
  "./script.js",
  "./manifest.webmanifest",
  "./assets/logo-beloved-body.png",
  "./assets/user-icon-transparent.png",
  "./assets/beloved-body-icon-192.png",
  "./assets/beloved-body-icon-512.png",
  "./assets/beloved-body-icon-maskable-512.png",
  "./assets/sounds/intro.wav",
  "./assets/sounds/tap.wav",
  "./assets/sounds/success.wav",
  "./assets/sounds/danger.wav",
  "./assets/icons/inicio.png",
  "./assets/icons/estadisticas.png",
  "./assets/icons/servicios.png",
  "./assets/icons/personal.png",
  "./assets/icons/configuracion.png",
  "./assets/icons/cerrar-sesion.png"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ARCHIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", event => {
  const peticion = event.request;
  if (peticion.method !== "GET") return;
  const url = new URL(peticion.url);
  if (url.origin !== self.location.origin) return;

  if (peticion.mode === "navigate") {
    event.respondWith(fetch(peticion).then(respuesta => {
      const copia = respuesta.clone();
      const destinoCache = url.pathname.endsWith("/confirmar.html") ? "./confirmar.html" : "./index.html";
      caches.open(CACHE).then(cache => cache.put(destinoCache, copia));
      return respuesta;
    }).catch(() => caches.match(url.pathname.endsWith("/confirmar.html") ? "./confirmar.html" : "./index.html")));
    return;
  }

  event.respondWith(caches.match(peticion, { ignoreSearch: true }).then(guardado => guardado || fetch(peticion).then(respuesta => {
    if (respuesta.ok) caches.open(CACHE).then(cache => cache.put(peticion, respuesta.clone()));
    return respuesta;
  })));
});

self.addEventListener("push", event => {
  let datos = {};
  try { datos = event.data ? event.data.json() : {}; } catch { datos = { body: event.data?.text() || "Tienes una cita próxima." }; }
  event.waitUntil(self.registration.showNotification(datos.title || "Beloved Body", {
    body: datos.body || "Tienes una cita próxima.",
    icon: "assets/beloved-body-icon-192.png",
    badge: "assets/beloved-body-icon-192.png",
    tag: datos.tag || "recordatorio-cita",
    data: { url: datos.url || "./" },
    vibrate: [300, 120, 300, 120, 450],
    renotify: true,
    requireInteraction: true,
    timestamp: Date.now()
  }));
});

self.addEventListener("notificationclick", event => {
  event.notification.close();
  const destino = event.notification.data?.url || "./";
  event.waitUntil(clients.matchAll({ type: "window", includeUncontrolled: true }).then(ventanas => {
    const abierta = ventanas.find(ventana => "focus" in ventana);
    return abierta ? abierta.focus() : clients.openWindow(destino);
  }));
});
