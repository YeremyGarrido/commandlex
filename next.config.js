/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export" eliminado — ADR-006, migrando a Cloudflare Pages con servidor
  images: {
    // Cloudflare Pages no tiene Image Optimization nativo, usamos loader custom
    unoptimized: true,
  },
  // basePath eliminado — Cloudflare Pages sirve desde raíz, no desde /commandlex
};

export default nextConfig;
