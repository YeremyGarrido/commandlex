// public/sw.js
// Service Worker de CommandLex - versión 3.1
// Estrategia: Stale-While-Revalidate, adaptada para GitHub Pages (subpath /commandlex)

const BASE_PATH = self.location.pathname.includes("/commandlex/")
  ? "/commandlex"
  : "";

const APP_SHELL_CACHE = "commandlex-shell-v3.1";
const DATA_CACHE = "commandlex-data-v3.1";

const APP_SHELL = [
  `${BASE_PATH}/`,
  `${BASE_PATH}/index.html`,
  `${BASE_PATH}/manifest.json`,
  `${BASE_PATH}/icons/icon-192.png`,
  `${BASE_PATH}/icons/icon-512.png`,
];

// ✅ Instalación del Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(APP_SHELL_CACHE)
      .then(async (cache) => {
        // Validación: solo agregar recursos que existan
        const validUrls = [];
        for (const url of APP_SHELL) {
          try {
            const response = await fetch(url, { cache: "no-store" });
            if (response.ok) validUrls.push(url);
            else console.warn(`⚠️ Skipped (HTTP ${response.status}): ${url}`);
          } catch (e) {
            console.warn(`⚠️ Skipped (fetch failed): ${url}`);
          }
        }
        return cache.addAll(validUrls);
      })
      .catch((err) => console.error("❌ Error precacheando:", err))
  );
  self.skipWaiting();
});

// ✅ Activación: limpiar caches antiguos
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k !== APP_SHELL_CACHE && k !== DATA_CACHE)
            .map((k) => caches.delete(k))
        )
      )
  );
  self.clients.claim();
});

// ✅ Interceptar peticiones
self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Ignorar cross-origin
  if (url.origin !== self.location.origin) return;

  // Dataset: stale-while-revalidate
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

  // App shell y recursos estáticos
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req)
        .then((resp) => {
          const copy = resp.clone();
          caches.open(APP_SHELL_CACHE).then((cache) => cache.put(req, copy));
          return resp;
        })
        .catch(() => cached);
    })
  );
});
