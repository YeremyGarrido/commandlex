// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },

      // --- Animaciones del Modal (ya las tenías) ---
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 200ms ease-out",
        scaleIn: "scaleIn 200ms ease-out",
      },

      // --- AÑADE ESTO PARA EL GLOW (OPCIÓN 1) ---
      boxShadow: {
        "glow-purple": "0 0 15px 0 rgb(168 85 247 / 0.5)",
        "glow-blue": "0 0 15px 0 rgb(59 130 246 / 0.5)",
      },
      // --- FIN DE LO AÑADIDO ---
    },
  },
  plugins: [],
};
export default config;
