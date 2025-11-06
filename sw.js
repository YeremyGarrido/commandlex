// public/sw.js
// Service Worker de CommandLex - estrategia Stale-While-Revalidate
// Adaptado para GitHub Pages (subpath /commandlex)

const BASE_PATH = self.location.pathname.includes("/commandlex/")
  ? "/commandlex"
  : "";

const CACHE_NAME = "commandlex-cache-v3";
const DATA_CACHE = "commandlex-data-v3";

const APP_SHELL = [
  `${BASE_PATH}/`,
  `${BASE_PATH}/index.html`,
  `${BASE_PATH}/manifest.json`,
  `${BASE_PATH}/icons/icon-192.png`,
  `${BASE_PATH}/icons/icon-512.png`,
];

// Instala el SW y guarda el app shell
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .catch((err) => console.warn("❌ Error al precachear:", err))
  );
  self.skipWaiting();
});

// Limpieza de caches viejos
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k !== CACHE_NAME && k !== DATA_CACHE)
            .map((k) => caches.delete(k))
        )
      )
  );
  self.clients.claim();
});

// Intercepta peticiones y aplica Stale-While-Revalidate
self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Cachear solo peticiones del mismo dominio
  if (url.origin !== self.location.origin) return;

  // Cachea los datos del dataset
  if (url.pathname.endsWith("/data/commands.json")) {
    event.respondWith(
      caches.open(DATA_CACHE).then((cache) =>
        fetch(req)
          .then((resp) => {
            cache.put(req, resp.clone());
            return resp;
          })
          .catch(() => cache.match(req))
      )
    );
    return;
  }

  // Cachea el app shell y otros recursos
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((resp) => {
        const copy = resp.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
        return resp;
      });
    })
  );
});
