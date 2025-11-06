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

      // --- Animaciones ---
      keyframes: {
        // CAMBIO: Modificado fadeIn para incluir el "slide" (translateY)
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        // CAMBIO: Ajustada la duración y 'forwards' para la nueva animación
        fadeIn: "fadeIn 300ms ease-out forwards",
        scaleIn: "scaleIn 200ms ease-out", // Se mantiene igual
      },

      // --- Efectos de Sombra (Glow) ---
      boxShadow: {
        "glow-purple": "0 0 15px 0 rgb(168 85 247 / 0.5)",
        "glow-blue": "0 0 15px 0 rgb(59 130 246 / 0.5)",
      },
    },
  },
  plugins: [],
};
export default config;
