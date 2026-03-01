"use client";

import { useState, useEffect } from "react";

type Theme = "light" | "dark";

interface UseThemeReturn {
  isDark: boolean;
  toggleTheme: () => void;
}

export function useTheme(): UseThemeReturn {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // El script blocking en layout.tsx ya aplicó la clase al body antes del primer paint.
    // Aquí solo sincronizamos el estado React con lo que el DOM ya tiene.
    const applied = document.body.classList.contains("dark");
    setIsDark(applied);
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    document.body.classList.toggle("dark", newDark);
    try {
      localStorage.setItem("theme", newDark ? "dark" : "light");
    } catch {
      // localStorage no disponible (modo privado extremo, etc.)
    }
  };

  return { isDark, toggleTheme };
}
