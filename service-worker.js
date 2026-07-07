const CACHE = "oh-ma-belle-pwa-v5";
const ARCHIVOS = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.webmanifest",
  "./assets/logo-oh-ma-belle-transparent.png",
  "./assets/user-icon-transparent.png",
  "./assets/app-icon-192.png",
  "./assets/app-icon-512.png",
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
      caches.open(CACHE).then(cache => cache.put("./index.html", copia));
      return respuesta;
    }).catch(() => caches.match("./index.html")));
    return;
  }

  event.respondWith(caches.match(peticion, { ignoreSearch: true }).then(guardado => guardado || fetch(peticion).then(respuesta => {
    if (respuesta.ok) caches.open(CACHE).then(cache => cache.put(peticion, respuesta.clone()));
    return respuesta;
  })));
});
