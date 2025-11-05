// src/components/CommandCard.tsx
// Tarjeta visual de comando con nombre, descripción y etiquetas.

import React from "react";
import type { Command } from "@/lib/data";
import { Tag } from "./Tag";

type CommandCardProps = {
  command: Command;
  onToggleFav?: (id: string) => void;
  isFav?: boolean;
};

export function CommandCard({ command, onToggleFav, isFav }: CommandCardProps) {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-900 dark:border-gray-700 hover:shadow-md transition">
      <div className="flex justify-between items-start mb-2">
        <h2 className="font-semibold text-lg">{command.comando}</h2>
        {onToggleFav && (
          <button
            onClick={() => onToggleFav(command.id)}
            aria-label="Toggle favorito"
            className={`text-xl ${
              isFav ? "text-yellow-400" : "text-gray-400 hover:text-yellow-400"
            }`}
          >
            ★
          </button>
        )}
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
        {command.descripcion}
      </p>
      <div className="flex gap-2 flex-wrap">
        <Tag label={command.aplicaciones.join(", ")} color="blue" />
        <Tag label={command.nivel} color="green" />
        {command.tags.slice(0, 2).map((t) => (
          <Tag key={t} label={t} color="gray" />
        ))}
      </div>
    </div>
  );
}
