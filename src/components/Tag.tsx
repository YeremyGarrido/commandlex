// src/components/Tag.tsx
// Etiqueta de color según tipo o nivel.

import React from "react";

type TagProps = {
  label: string;
  color?: "blue" | "green" | "yellow" | "gray";
};

export function Tag({ label, color = "gray" }: TagProps) {
  const colorClasses: Record<string, string> = {
    blue: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    green: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    yellow:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    gray: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${colorClasses[color]}`}
    >
      {label}
    </span>
  );
}
