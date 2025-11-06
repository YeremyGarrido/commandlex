"use client";
import { useEffect, useState, useMemo } from "react";
import { loadDataset, type Command } from "@/lib/data";
import { search } from "@/lib/search";
import * as favs from "@/lib/favs";
import { SearchBox } from "@/components/SearchBox";
import { CommandCard } from "@/components/CommandCard";
import { EmptyState } from "@/components/EmptyState";
import { CommandModal } from "@/components/CommandModal";
import { FaGithub } from "react-icons/fa";

export default function HomePage() {
  // --- Estados ---
  const [allCommands, setAllCommands] = useState<Command[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [favVersion, setFavVersion] = useState(0);

  // --- Estados para el filtro Popover ---
  const [showFilters, setShowFilters] = useState(false);
  const [selectedApps, setSelectedApps] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [appliedApps, setAppliedApps] = useState<string[]>([]);
  const [appliedLevels, setAppliedLevels] = useState<string[]>([]);
  const [selectedCommand, setSelectedCommand] = useState<Command | null>(null);

  // --- Lógica de carga ---
  useEffect(() => {
    loadDataset()
      .then((d) => {
        setAllCommands(d.comandos);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // --- Handlers ---
  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };
  const handleTagClick = (tag: string) => {
    setSearchTerm(tag);
  };
  const toggleFav = (id: string) => {
    favs.toggle(id);
    setFavVersion((v) => v + 1);
  };

  const { aplicaciones, niveles } = useMemo(() => {
    const apps = new Set<string>();
    const levels = new Set<string>();
    allCommands.forEach((cmd) => {
      cmd.aplicaciones.forEach((app) => apps.add(app));
      levels.add(cmd.nivel);
    });
    return {
      aplicaciones: Array.from(apps).sort(),
      niveles: Array.from(levels).sort(),
    };
  }, [allCommands]);

  const filteredCommands = useMemo(() => {
    let result = search(allCommands, searchTerm);
    if (appliedApps.length > 0) {
      result = result.filter((cmd) =>
        cmd.aplicaciones.some((app) => appliedApps.includes(app))
      );
    }
    if (appliedLevels.length > 0) {
      result = result.filter((cmd) => appliedLevels.includes(cmd.nivel));
    }
    return result;
  }, [allCommands, searchTerm, appliedApps, appliedLevels]);

  const handleSaveFilters = () => {
    setAppliedApps(selectedApps);
    setAppliedLevels(selectedLevels);
    setShowFilters(false);
  };
  const handleCancelFilters = () => {
    setShowFilters(false);
    setSelectedApps(appliedApps);
    setSelectedLevels(appliedLevels);
  };
  const handleAppChange = (app: string) => {
    setSelectedApps((prev) =>
      prev.includes(app) ? prev.filter((a) => a !== app) : [...prev, app]
    );
  };
  const handleLevelChange = (level: string) => {
    setSelectedLevels((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center p-24 text-gray-500">
        Cargando comandos...
      </main>
    );
  }
  const activeFilterCount = appliedApps.length + appliedLevels.length;

  return (
    <main className="text-gray-900 dark:text-gray-100">
      {/* 1. HERO SECTION */}
      <div className="bg-gray-50 dark:bg-gray-950 pt-12 pb-16 min-h-[40vh] px-6">
        {/* ENCABEZADO DE NAVEGACIÓN (GitHub Icono | Navegación) */}
        <div className="flex justify-between items-center mb-16 text-sm max-w-7xl mx-auto">
          {/* ÍCONO DE GITHUB (Izquierda) */}
          <a
            href="https://github.com/YeremyGarrido/commandlex"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-purple-400 transition"
            title="Ver en GitHub"
          >
            <FaGithub size={24} />
          </a>

          {/* NAVEGACIÓN (Derecha) */}
          <div className="flex gap-4">
            <a href="/" className="hover:text-purple-400 dark:text-gray-300">
              Inicio
            </a>
            <span className="mx-0 text-gray-400">|</span>
            <a
              href="/favoritos"
              className="hover:text-purple-400 dark:text-gray-300"
            >
              Favoritos
            </a>
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center">
          {/* Título */}
          <h1 className="text-5xl sm:text-7xl font-extrabold mb-4 tracking-tighter">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
              CommandLex
            </span>
          </h1>

          {/* Subtítulo */}
          <p className="text-lg text-gray-400 mb-10 max-w-lg mx-auto">
            Catálogo offline-first para todos tus comandos favoritos y atajos.
          </p>

          {/* Contenedor de Búsqueda Centrado y FUSIONADO */}
          <div className="flex justify-center mx-auto max-w-xl">
            <div className="flex flex-grow items-center">
              {/* Input (SearchBox) */}
              <div className="relative flex-grow">
                <SearchBox externalValue={searchTerm} onSearch={handleSearch} />
              </div>

              {/* Botón de Filtro - Fusionado */}
              <div className="relative">
                <button
                  onClick={() => {
                    setSelectedApps(appliedApps);
                    setSelectedLevels(appliedLevels);
                    setShowFilters(!showFilters);
                  }}
                  // CLASES DE FUSIÓN: ml-[-1px] y dark:border-l-0
                  className="w-full sm:w-auto flex justify-center items-center p-2 
                                 rounded-r-lg text-gray-400 hover:text-purple-400 dark:bg-gray-900 
                                 dark:border dark:border-l-0 dark:border-gray-700 transition
                                 ml-[-1px]" // TRUCO DE FUSIÓN VISUAL
                  style={{ height: "42px" }}
                  title="Mostrar Filtros"
                >
                  {/* SVG del Filtro */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                  </svg>

                  {/* Contador de Filtros Activos */}
                  {activeFilterCount > 0 && (
                    <span className="bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center absolute -top-1 -right-1">
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                {/* Popover de Filtro */}
                {showFilters && (
                  <div
                    className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-gray-800 
                             border dark:border-gray-700 rounded-lg shadow-2xl z-50 p-4" // <-- Z-50 para máxima prioridad y shadow-2xl
                  >
                    {/* Contenido del Popover */}
                    <h3 className="font-semibold mb-2 text-gray-400 dark:text-gray-400">
                      Aplicaciones
                    </h3>

                    {/* Contenedor de Scroll de Aplicaciones */}
                    <div className="max-h-40 overflow-y-auto border dark:border-gray-700 rounded-md p-2 mb-4">
                      {aplicaciones.map((app) => (
                        <label
                          key={app}
                          className="flex items-center gap-2 p-1 hover:bg-gray-700 rounded transition-colors cursor-pointer" // Hover más oscuro
                        >
                          <input
                            type="checkbox"
                            checked={selectedApps.includes(app)}
                            onChange={() => handleAppChange(app)}
                            // ESTILOS DE CHECKBOX: Aspecto limpio en modo oscuro
                            className="h-4 w-4 rounded border-gray-500 bg-gray-700 text-purple-500 focus:ring-purple-500 transition-colors"
                          />
                          <span className="text-sm text-gray-200">{app}</span>
                        </label>
                      ))}
                    </div>
                    <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">
                      Niveles
                    </h3>
                    {/* Contenedor de Niveles */}
                    <div className="border dark:border-gray-700 rounded-md p-2 mb-4">
                      {niveles.map((level) => (
                        <label
                          key={level}
                          className="flex items-center gap-2 p-1 hover:bg-gray-700 rounded transition-colors cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedLevels.includes(level)}
                            onChange={() => handleLevelChange(level)}
                            className="h-4 w-4 rounded border-gray-500 bg-gray-700 text-purple-500 focus:ring-purple-500 transition-colors"
                          />
                          {/* Aquí estaba el texto duplicado "Niveles". Lo quitamos, el 'level' es suficiente. */}
                          <span className="text-sm text-gray-200 capitalize">
                            {level}
                          </span>
                        </label>
                      ))}
                    </div>

                    {/* Botones de Acción */}
                    <div className="flex justify-end gap-2 border-t dark:border-gray-700 pt-4">
                      <button
                        onClick={handleCancelFilters}
                        // ESTILOS MÁS PLANOS
                        className="px-4 py-2 text-sm rounded-md text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveFilters}
                        // ESTILOS DE ÉNFASIS (AZUL/PÚRPURA)
                        className="px-4 py-2 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* FIN DEL HERO SECTION */}

      {/* 2. CONTENEDOR DE LA CUADRÍCULA */}
      <div className="px-6 max-w-7xl mx-auto">
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCommands.length === 0 ? (
            <EmptyState message="No se encontraron comandos." />
          ) : (
            filteredCommands.map((cmd) => (
              <CommandCard
                key={cmd.id}
                command={cmd}
                isFav={favs.has(cmd.id)}
                onToggleFav={toggleFav}
                onClick={setSelectedCommand}
                onTagClick={handleTagClick}
              />
            ))
          )}
        </div>
      </div>

      {/* 3. MODAL */}
      {selectedCommand && (
        <CommandModal
          comando={selectedCommand}
          onClose={() => setSelectedCommand(null)}
        />
      )}
    </main>
  );
}
