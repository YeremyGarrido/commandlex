"use client";
import React, { useState, useEffect } from "react";

type SearchBoxProps = {
  placeholder?: string;
  onSearch: (value: string) => void;
  delay?: number;
  externalValue: string; // <-- NUEVO: Para recibir el valor de los tags
};

export function SearchBox({
  placeholder = "Buscar comando...",
  onSearch,
  delay = 300,
  externalValue, // <-- NUEVO
}: SearchBoxProps) {
  // Tu estado interno se mantiene
  const [value, setValue] = useState(externalValue);

  // --- NUEVO USEEFFECT ---
  // Sincroniza el estado interno si el valor externo cambia (ej. clic en tag)
  useEffect(() => {
    if (externalValue !== value) {
      setValue(externalValue);
    }
    // No queremos que 'value' sea dependencia,
    // para no crear un bucle cuando el usuario escribe.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalValue]);

  // --- TU DEBOUNCE (SIN CAMBIOS) ---
  // Se activa cuando el 'value' interno cambia (al escribir)
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay, onSearch]);

  return (
    <input
      type="text"
      value={value} // Sigue usando el estado interno
      onChange={(e) => setValue(e.target.value)} // Sigue actualizando el estado interno
      placeholder={placeholder}
      // Tus clases originales (ajusté un par de detalles de tu código)
      className="w-full p-2 border rounded-md dark:border-gray-700 dark:bg-gray-800"
      style={{ height: "42px" }}
    />
  );
}
