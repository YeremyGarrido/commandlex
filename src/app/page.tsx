// src/app/page.tsx
"use client";
import { useEffect, useState, useMemo } from "react";
import { loadDataset, type Command } from "@/lib/data";
import { search } from "@/lib/search";
import * as favs from "@/lib/favs";
import { SearchBox } from "@/components/SearchBox";
import { CommandCard } from "@/components/CommandCard";
import { EmptyState } from "@/components/EmptyState";
// import FilterTabs from "@/components/FilterTabs"; // MODIFICADO: Ya no usamos FilterTabs

export default function HomePage() {
  // --- Estados que ya tenías ---
  const [allCommands, setAllCommands] = useState<Command[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [favVersion, setFavVersion] = useState(0);

  // --- NUEVOS ESTADOS PARA EL FILTRO POPOVER ---
  const [showFilters, setShowFilters] = useState(false);
  // Estados temporales (lo que seleccionas DENTRO del menú)
  const [selectedEnvs, setSelectedEnvs] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]); // Asumiendo que 'Command' tiene 'nivel'
  // Estados aplicados (lo que se usa para FILTRAR la lista)
  const [appliedEnvs, setAppliedEnvs] = useState<string[]>([]);
  const [appliedLevels, setAppliedLevels] = useState<string[]>([]);

  // --- Lógica de carga (sin cambios) ---
  useEffect(() => {
    loadDataset()
      .then((d) => {
        setAllCommands(d.comandos);
      })
      .catch(() => console.error("Error cargando dataset"))
      .finally(() => setLoading(false));
  }, []);

  // --- Lógica de Búsqueda y Favoritos (sin cambios) ---
  const handleSearch = (q: string) => {
    setSearchTerm(q);
  };

  const toggleFav = (id: string) => {
    favs.toggle(id);
    setFavVersion((v) => v + 1);
  };

  // --- NUEVOS HANDLERS PARA POPOVER ---
  const handleEnvChange = (env: string) => {
    setSelectedEnvs((prev) =>
      prev.includes(env) ? prev.filter((e) => e !== env) : [...prev, env]
    );
  };

  const handleLevelChange = (level: string) => {
    setSelectedLevels((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
  };

  const handleSaveFilters = () => {
    setAppliedEnvs(selectedEnvs);
    setAppliedLevels(selectedLevels);
    setShowFilters(false);
  };

  const handleCancelFilters = () => {
    setSelectedEnvs(appliedEnvs);
    setSelectedLevels(appliedLevels);
    setShowFilters(false);
  };

  // --- LÓGICA DE FILTRADO MODIFICADA ---

  // 1. Obtenemos las listas de entornos y niveles
  const { entornos, niveles } = useMemo(() => {
    // Asumiendo que tu tipo Command tiene 'entorno' y 'nivel'
    const uniqueEntornos = [
      ...new Set(allCommands.map((cmd) => cmd.entorno)),
    ].sort();
    const uniqueNiveles = [
      ...new Set(allCommands.map((cmd) => cmd.nivel)),
    ].sort();
    return { entornos: uniqueEntornos, niveles: uniqueNiveles };
  }, [allCommands]);

  // 2. Calculamos la lista filtrada (usando los filtros de array)
  const filteredCommands = useMemo(() => {
    return allCommands.filter((command) => {
      // 1. Filtro por búsqueda (usando tu función 'search')
      // Tu función search espera un array, le pasamos un array de 1
      const searchMatch = search([command], searchTerm).length > 0;

      // 2. Filtro por entorno (multi-select)
      const envMatch =
        appliedEnvs.length === 0 || appliedEnvs.includes(command.entorno);

      // 3. Filtro por nivel (multi-select)
      const levelMatch =
        appliedLevels.length === 0 || appliedLevels.includes(command.nivel);

      return searchMatch && envMatch && levelMatch;
    });
  }, [allCommands, searchTerm, appliedEnvs, appliedLevels]); // Añadido favVersion para re-evaluar al dar fav

  // --- Lógica de renderizado ---
  if (loading) return <p className="p-8">Cargando...</p>;

  const activeFilterCount = appliedEnvs.length + appliedLevels.length;

  return (
    <main className="min-h-screen p-6 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-4">CommandLex</h1>

      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        {/* Tu componente SearchBox (sin cambios) */}
        <div className="flex-grow">
          <SearchBox onSearch={handleSearch} />
        </div>

        {/* --- NUEVO: Botón de Filtro y Popover --- */}
        <div className="relative">
          <button
            onClick={() => {
              setSelectedEnvs(appliedEnvs);
              setSelectedLevels(appliedLevels);
              setShowFilters(!showFilters);
            }}
            className="w-full sm:w-auto flex justify-center items-center gap-2 p-2 border rounded-md hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
            // Ajusta el padding/altura si es necesario para que coincida con SearchBox
            style={{ height: "42px" }} // Ajusta este valor si es necesario
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

          {/* El Menú Popover */}
          {showFilters && (
            <div className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg z-10 p-4">
              <h3 className="font-semibold mb-2">Entornos</h3>
              {/* --- ⭐️ CAMBIO AQUÍ: Añadida clase 'custom-scrollbar' --- */}
              <div className="custom-scrollbar max-h-40 overflow-y-auto border dark:border-gray-700 rounded-md p-2 mb-4">
                {entornos.map((env) => (
                  <label
                    key={env}
                    className="flex items-center gap-2 p-1 hover:bg-gray-50 dark:hover:bg-gray-700 rounded"
                  >
                    <input
                      type="checkbox"
                      checked={selectedEnvs.includes(env)}
                      onChange={() => handleEnvChange(env)}
                      // --- ⭐️ CAMBIO AQUÍ: Clase 'rounded' eliminada ---
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    {env}
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
                      // --- ⭐️ CAMBIO AQUÍ: Clase 'rounded' eliminada ---
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

      {/* Tu cuadrícula de comandos (sin cambios) */}
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
