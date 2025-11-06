"use client";

import { useEffect } from "react";

export function ServiceWorkerProvider() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      const basePath =
        process.env.NODE_ENV === "production" ? "/commandlex" : "";
      const swUrl = `${basePath}/sw.js`;

      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register(swUrl)
          .then((reg) => {
            console.log(`✅ Service Worker registrado en: ${reg.scope}`);
          })
          .catch((err) => {
            console.warn("⚠️ Error al registrar el Service Worker:", err);
          });
      });
    }
  }, []);

  return null;
}
