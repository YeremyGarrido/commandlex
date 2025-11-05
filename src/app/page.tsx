// src/app/page.tsx
"use client";
import { useEffect, useState, useMemo } from "react";
import { loadDataset, type Command } from "@/lib/data";
import { search } from "@/lib/search";
import * as favs from "@/lib/favs";
import { SearchBox } from "@/components/SearchBox";
import { CommandCard } from "@/components/CommandCard";
import { EmptyState } from "@/components/EmptyState";

export default function HomePage() {
  // --- Estados ---
  const [allCommands, setAllCommands] = useState<Command[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [favVersion, setFavVersion] = useState(0);

  // --- Estados para el filtro Popover (Refactorizado) ---
  const [showFilters, setShowFilters] = useState(false);
  // Estados temporales (lo que seleccionas DENTRO del menú)
  const [selectedApps, setSelectedApps] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  // Estados aplicados (lo que se usa para FILTRAR la lista)
  const [appliedApps, setAppliedApps] = useState<string[]>([]);
  const [appliedLevels, setAppliedLevels] = useState<string[]>([]);

  // --- Lógica de carga ---
  useEffect(() => {
    loadDataset()
      .then((d) => {
        setAllCommands(d.comandos);
      })
      .catch(() => console.error("Error cargando dataset"))
      .finally(() => setLoading(false));
  }, []);

  // --- Handlers (Refactorizado) ---
  const handleSearch = (q: string) => {
    setSearchTerm(q);
  };

  const toggleFav = (id: string) => {
    favs.toggle(id);
    setFavVersion((v) => v + 1);
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

  const handleSaveFilters = () => {
    setAppliedApps(selectedApps);
    setAppliedLevels(selectedLevels);
    setShowFilters(false);
  };

  const handleCancelFilters = () => {
    // Resetea la selección temporal a la que ya está aplicada
    setSelectedApps(appliedApps);
    setSelectedLevels(appliedLevels);
    setShowFilters(false);
  };

  // --- Lógica de Filtrado (Refactorizado) ---

  // 1. Obtenemos las listas de aplicaciones y niveles para el popover
  const { aplicaciones, niveles } = useMemo(() => {
    const allApps = allCommands.flatMap((cmd) => cmd.aplicaciones || []);
    const uniqueApps = [...new Set(allApps)].sort();

    const allLevels = allCommands.map((cmd) => cmd.nivel);
    const uniqueNiveles = [...new Set(allLevels)].sort();

    return { aplicaciones: uniqueApps, niveles: uniqueNiveles };
  }, [allCommands]);

  // 2. Calculamos la lista filtrada
  const filteredCommands = useMemo(() => {
    const filteredByPopover = allCommands.filter((command) => {
      // Filtro por aplicación (intersección de arrays)
      const appMatch =
        appliedApps.length === 0 ||
        command.aplicaciones?.some((app) => appliedApps.includes(app));

      // Filtro por nivel
      const levelMatch =
        appliedLevels.length === 0 || appliedLevels.includes(command.nivel);

      return appMatch && levelMatch;
    });

    // Pasamos la lista pre-filtrada a la función de búsqueda por texto
    return search(filteredByPopover, searchTerm);
  }, [allCommands, searchTerm, appliedApps, appliedLevels]);

  // --- Lógica de renderizado (Refactorizado) ---
  if (loading) return <p className="p-8">Cargando...</p>;

  const activeFilterCount = appliedApps.length + appliedLevels.length;

  return (
    <main className="min-h-screen p-6 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-4">CommandLex</h1>

      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <div className="flex-grow">
          <SearchBox onSearch={handleSearch} />
        </div>

        {/* --- Botón de Filtro y Popover (Refactorizado) --- */}
        <div className="relative">
          <button
            onClick={() => {
              // Al abrir, sincroniza la selección temporal con la aplicada
              setSelectedApps(appliedApps);
              setSelectedLevels(appliedLevels);
              setShowFilters(!showFilters);
            }}
            className="w-full sm:w-auto flex justify-center items-center gap-2 p-2 border rounded-md hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
            style={{ height: "42px" }}
          >
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

            {activeFilterCount > 0 && (
              <span className="bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          {showFilters && (
            <div className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg z-10 p-4">
              <h3 className="font-semibold mb-2">Aplicaciones</h3>
              <div className="custom-scrollbar max-h-40 overflow-y-auto border dark:border-gray-700 rounded-md p-2 mb-4">
                {aplicaciones.map((app) => (
                  <label
                    key={app}
                    className="flex items-center gap-2 p-1 hover:bg-gray-50 dark:hover:bg-gray-700 rounded"
                  >
                    <input
                      type="checkbox"
                      checked={selectedApps.includes(app)}
                      onChange={() => handleAppChange(app)}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    {app}
                  </label>
                ))}
              </div>

              <h3 className="font-semibold mb-2">Niveles</h3>
              <div className="border dark:border-gray-700 rounded-md p-2 mb-4">
                {niveles.map((level) => (
                  <label
                    key={level}
                    className="flex items-center gap-2 p-1 hover:bg-gray-50 dark:hover:bg-gray-700 rounded"
                  >
                    <input
                      type="checkbox"
                      checked={selectedLevels.includes(level)}
                      onChange={() => handleLevelChange(level)}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    {level}
                  </label>
                ))}
              </div>

              <div className="flex justify-end gap-2 border-t dark:border-gray-700 pt-4">
                <button
                  onClick={handleCancelFilters}
                  className="px-4 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 border dark:border-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveFilters}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* --- Cuadrícula de comandos --- */}
      <div className="mt-6 grid gap-4">
        {filteredCommands.length === 0 ? (
          <EmptyState message="No se encontraron comandos." />
        ) : (
          filteredCommands.map((cmd) => (
            <CommandCard
              key={cmd.id}
              command={cmd}
              isFav={favs.has(cmd.id)}
              onToggleFav={toggleFav}
            />
          ))
        )}
      </div>
    </main>
  );
}
