// src/components/EmptyState.tsx
// Estado visual cuando no hay resultados.

import React from "react";

export function EmptyState({
  message = "Sin resultados",
}: {
  message?: string;
}) {
  return (
    <div className="text-center py-10 text-gray-500 dark:text-gray-400">
      <p>{message}</p>
    </div>
  );
}
