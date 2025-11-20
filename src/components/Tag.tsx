"use client";
import React from "react";

type TagProps = {
  label: string;
  // 1. AGREGAMOS "red" AQUI
  color?: "blue" | "green" | "yellow" | "gray" | "red";
  onClick?: (label: string) => void;
};

export function Tag({ label, color = "gray", onClick }: TagProps) {
  const colorClasses: Record<string, string> = {
    blue: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    green: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    yellow:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    gray: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
    // 2. DEFINIMOS EL ESTILO ROJO AQUI
    red: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  };

  // Clases comunes para ambos (span y button)
  // Nota: Usamos colorClasses[color] || colorClasses.gray por seguridad
  const selectedColorClass = colorClasses[color] || colorClasses.gray;
  const commonClasses = `px-2 py-1 rounded-full text-xs font-medium ${selectedColorClass}`;

  // Si 'onClick' existe, renderiza un <button> interactivo
  if (onClick) {
    return (
      <button
        onClick={(e) => {
          e.stopPropagation(); // ¡CLAVE! Evita que se abra el modal
          onClick(label);
        }}
        // Añadimos efectos hover
        className={`${commonClasses} transition-transform hover:scale-105 active:scale-95`}
      >
        {label}
      </button>
    );
  }

  // Si no, renderiza un <span> como antes (no clickeable)
  return <span className={commonClasses}>{label}</span>;
}
