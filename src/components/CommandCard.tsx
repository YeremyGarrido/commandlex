"use client";
import type { Command } from "@/lib/data";
// Usamos los alias que ya corregimos
import { Tag } from "@/components/Tag";
import { AppIcon } from "@/components/AppIcon";
import { FaStar } from "react-icons/fa";
import React from "react";

interface Props {
  command: Command;
  onToggleFav?: (id: string) => void;
  isFav?: boolean;
  onClick: (command: Command) => void;
  onTagClick: (tag: string) => void; // <-- CAMBIO 1: AÑADIDO
}

export function CommandCard({
  command,
  onToggleFav,
  isFav,
  onClick,
  onTagClick, // <-- CAMBIO 2: AÑADIDO
}: Props) {
  const handleFavClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleFav) {
      onToggleFav(command.id);
    }
  };

  return (
    // 1. DIV EXTERIOR (EL BORDE)
    <div
      onClick={() => onClick(command)}
      className="group h-full rounded-lg p-[2px] transition-all duration-300
                 bg-gray-200 dark:bg-gray-700 
                 hover:bg-gradient-to-r from-purple-500 to-cyan-400
                 hover:-translate-y-1 hover:scale-[1.02]"
    >
      {/* 2. DIV INTERIOR (LA TARJETA) */}
      <div
        className="relative flex h-full cursor-pointer flex-col justify-between 
                   rounded-[7px] bg-white 
                   dark:bg-gray-800
                   overflow-hidden"
      >
        {/* 3. EL DIV DE "GLOW" INTERNO */}
        <div
          className="absolute inset-0 z-0
                     bg-gradient-to-r from-purple-500 to-cyan-400
                     blur-lg
                     opacity-0 transition-opacity duration-300 group-hover:opacity-10"
        ></div>

        {/* 4. CONTENEDOR DEL CONTENIDO REAL */}
        <div className="relative z-10 flex h-full flex-col justify-between p-4">
          {/* 1. PARTE SUPERIOR: Título, Fav e Icono de App */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              {onToggleFav && (
                <button
                  onClick={handleFavClick}
                  className="text-gray-300 transition-colors dark:text-gray-600"
                  title={isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
                >
                  <FaStar
                    size={18}
                    className={
                      isFav
                        ? "text-yellow-400 dark:text-yellow-500"
                        : "hover:text-gray-400 dark:hover:text-gray-400"
                    }
                  />
                </button>
              )}
              <h2 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                {command.comando}
              </h2>
            </div>
            <AppIcon appName={command.aplicaciones[0]} />
          </div>

          {/* 2. DESCRIPCIÓN */}
          <p className="mb-4 text-sm text-gray-600 dark:text-gray-400 flex-grow">
            {command.descripcion}
          </p>

          {/* 3. FOOTER (CAMBIO 3: AÑADIDO 'onClick' a los Tags) */}
          <div className="flex items-end justify-between">
            <div className="flex flex-wrap gap-1">
              {/* Mostramos los tags con tu componente */}
              {command.tags.slice(0, 3).map((t) => (
                <Tag
                  key={t}
                  label={t}
                  color="gray"
                  onClick={onTagClick} // <-- AÑADIDO
                />
              ))}
            </div>

            {/* Mostramos el nivel con tu componente */}
            <Tag
              label={command.nivel}
              color="green"
              onClick={onTagClick} // <-- AÑADIDO
            />
          </div>
        </div>
      </div>
    </div>
  );
}
