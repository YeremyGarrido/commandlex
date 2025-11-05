"use client";

import { useEffect } from "react";

export function ServiceWorkerProvider() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then(() => console.log("✅ Service Worker registrado"))
          .catch((err) => console.warn("SW error:", err));
      });
    }
  }, []);

  return null;
}
