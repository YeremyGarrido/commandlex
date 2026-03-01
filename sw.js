// public/sw.js
// Service Worker de CommandLex - versión 3.2 (Actualizada tras el bundle del JSON)

const BASE_PATH = self.location.pathname.includes("/commandlex/")
  ? "/commandlex"
  : "";

// ⚠️ IMPORTANTE: Cambié la versión a 3.2 para forzar la actualización en los clientes
const APP_SHELL_CACHE = "commandlex-shell-v3.2";

const APP_SHELL = [
  `${BASE_PATH}/`,
  `${BASE_PATH}/index.html`,
  `${BASE_PATH}/manifest.json`,
  `${BASE_PATH}/icons/icon-192.png`,
  `${BASE_PATH}/icons/icon-512.png`,
  // Nota: Next.js generará sus propios JS/CSS con hashes únicos,
  // estos se cachearán dinámicamente abajo.
];

// ✅ Instalación
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(APP_SHELL_CACHE)
      .then(async (cache) => {
        const validUrls = [];
        for (const url of APP_SHELL) {
          try {
            const response = await fetch(url, { cache: "no-store" });
            if (response.ok) validUrls.push(url);
          } catch (e) {
            console.warn(`⚠️ Skipped: ${url}`);
          }
        }
        return cache.addAll(validUrls);
      })
      .catch((err) => console.error("❌ Error precacheando:", err))
  );
  self.skipWaiting();
});

// ✅ Activación (Limpieza de versiones viejas)
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== APP_SHELL_CACHE) // Borra todo lo que no sea la versión actual
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

  // Ignorar cross-origin (analíticas, fuentes externas, etc.)
  if (url.origin !== self.location.origin) return;

  // Ignorar peticiones a la API de Next.js o datos de desarrollo (hot reload)
  if (url.pathname.includes("/_next/webpack-hmr")) return;

  // --- ESTRATEGIA: Cache First, falling back to Network ---
  // Ideal para Next.js estático, ya que los archivos JS tienen hashes en el nombre
  // (ej: page-a1b2c3.js) y si cambian, el nombre cambia.
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;

      return fetch(req)
        .then((resp) => {
          // Solo cacheamos respuestas válidas (status 200)
          if (!resp || resp.status !== 200 || resp.type !== "basic") {
            return resp;
          }

          const copy = resp.clone();
          caches.open(APP_SHELL_CACHE).then((cache) => cache.put(req, copy));
          return resp;
        })
        .catch(() => {
          // Opcional: Aquí podrías retornar una página offline.html si falla la red
          // y no está en caché.
        });
    })
  );
});
