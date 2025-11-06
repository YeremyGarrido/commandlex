// public/sw.js
// Service Worker de CommandLex - estrategia Stale-While-Revalidate

const CACHE_NAME = "commandlex-cache-v2";
const DATA_CACHE = "commandlex-data-v2";

const APP_SHELL = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
];

// ✅ Instala el SW y guarda el app shell
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

// ✅ Limpieza de caches viejos
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.map((k) => k !== CACHE_NAME && caches.delete(k)))
      )
  );
  self.clients.claim();
});

// ✅ Intercepta peticiones y aplica Stale-While-Revalidate
self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

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
    caches.match(req).then(
      (cached) =>
        cached ||
        fetch(req).then((resp) => {
          const copy = resp.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          return resp;
        })
    )
  );
});
