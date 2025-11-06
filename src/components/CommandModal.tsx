"use client";
import type { Command } from "@/lib/data";
import { AppIcon } from "./AppIcon";
import { CopyBlock } from "./CopyBlock"; // <-- El bloque que acabamos de crear
import { Tag } from "./Tag"; // <-- Tu componente Tag
import { FaTimes, FaLayerGroup, FaTerminal, FaTags } from "react-icons/fa";

interface Props {
  comando: Command;
  onClose: () => void;
}

export const CommandModal = ({ comando, onClose }: Props) => {
  return (
    // 1. Overlay (fondo oscuro semi-transparente)
    <div
      onClick={onClose}
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm
                 animate-fadeIn" // <-- AÑADE ESTA CLASE
    >
      {/* 2. Contenedor del Modal (evita que el clic en él cierre el modal) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl rounded-lg border border-gray-700 bg-gray-800 p-8 shadow-2xl dark:bg-gray-900
                   animate-scaleIn" // <-- AÑADE ESTA CLASE
      >
        {/* 3. Botón de Cerrar */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-gray-400 hover:text-white"
        >
          <FaTimes size={20} />
        </button>

        {/* 4. Layout Principal (2 columnas, como en la foto) */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* === COLUMNA IZQUIERDA (Principal) === */}
          <div className="md:col-span-2">
            {/* Header: Icono y Título */}
            <div className="flex items-center gap-4 mb-4">
              <AppIcon appName={comando.aplicaciones[0]} />
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {comando.comando}
                </h2>
                <p className="text-gray-400">
                  {comando.aplicaciones.join(", ")}
                </p>
              </div>
            </div>

            {/* Descripción */}
            <p className="text-gray-300 mb-6">{comando.descripcion}</p>

            {/* Ejemplos (¡Lo más importante!) */}
            <h3 className="text-lg font-semibold text-white mb-3">Ejemplos</h3>
            <div className="flex flex-col gap-3">
              {comando.ejemplo.map((ej, index) => (
                <CopyBlock key={index} textToCopy={ej} />
              ))}
            </div>
          </div>

          {/* === COLUMNA DERECHA (Metadata "Ad-hoc") === */}
          <div className="md:col-span-1">
            {/* Nivel */}
            <div className="mb-4">
              <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-400 mb-2">
                <FaLayerGroup /> Nivel
              </h4>
              <Tag label={comando.nivel} color="green" />
            </div>

            {/* Requerimientos */}
            <div className="mb-4">
              <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-400 mb-2">
                <FaTerminal /> Requerimientos
              </h4>
              <p className="text-sm text-gray-300">{comando.requerimientos}</p>
            </div>

            {/* Tags */}
            <div className="mb-4">
              <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-400 mb-2">
                <FaTags /> Tags
              </h4>
              <div className="flex flex-wrap gap-1">
                {comando.tags.map((tag) => (
                  <Tag key={tag} label={tag} color="gray" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
