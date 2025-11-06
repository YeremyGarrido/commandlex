"use client";
import { useEffect, useState, useMemo } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { loadDataset, type Command } from "@/lib/data";
import { search } from "@/lib/search";
import * as favs from "@/lib/favs";
import { SearchBox } from "@/components/SearchBox";
import { CommandCard } from "@/components/CommandCard";
import { EmptyState } from "@/components/EmptyState";
import { CommandModal } from "@/components/CommandModal";
import { FaGithub } from "react-icons/fa";
import { CategoryPicker } from "@/components/CategoryPicker";
import Link from "next/link";

export default function HomePage() {
  // --- Estados Locales (Solo para datos y UI) ---
  const [allCommands, setAllCommands] = useState<Command[]>([]);
  const [loading, setLoading] = useState(true);
  const [favVersion, setFavVersion] = useState(0);

  // --- Estados para el filtro Popover ---
  const [showFilters, setShowFilters] = useState(false);
  const [selectedApps, setSelectedApps] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [appliedApps, setAppliedApps] = useState<string[]>([]);
  const [appliedLevels, setAppliedLevels] = useState<string[]>([]);
  const [selectedCommand, setSelectedCommand] = useState<Command | null>(null);

  // --- Leer estado desde la URL ---
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category") || "";
  const searchTerm = searchParams.get("q") || "";

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

  // --- Handlers (Ahora actualizan la URL) ---

  // !!!!! --- ESTA ES LA FUNCIÓN CORREGIDA --- !!!!!
  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      // Si el usuario escribe algo, SÍ reseteamos la categoría
      params.set("q", value);
      params.delete("category");
    } else {
      // Si el valor es vacío (ej. borró el texto), solo borra 'q'
      params.delete("q");
      // NO borramos la categoría aquí
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleTagClick = (tag: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("q", tag);
    params.delete("category");
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleCategorySelect = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    params.delete("q"); // Seleccionar categoría resetea la búsqueda
    setAppliedApps([]);
    setAppliedLevels([]);
    router.push(`${pathname}?${params.toString()}`);
  };

  const resetView = () => {
    setAppliedApps([]);
    setAppliedLevels([]);
    router.push(pathname);
  };

  const toggleFav = (id: string) => {
    favs.toggle(id);
    setFavVersion((v) => v + 1);
  };

  // --- Lógica de filtrado (sin cambios) ---
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
    let result = allCommands;

    if (selectedCategory) {
      result = result.filter((cmd) =>
        cmd.aplicaciones.includes(selectedCategory)
      );
    }
    if (appliedApps.length > 0) {
      result = result.filter((cmd) =>
        cmd.aplicaciones.some((app) => appliedApps.includes(app))
      );
    }
    if (appliedLevels.length > 0) {
      result = result.filter((cmd) => appliedLevels.includes(cmd.nivel));
    }
    if (searchTerm) {
      result = search(result, searchTerm);
    }
    if (!selectedCategory && !searchTerm) {
      return [];
    }
    return result;
  }, [allCommands, searchTerm, appliedApps, appliedLevels, selectedCategory]);

  // --- Handlers del Popover (sin cambios) ---
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
  const showCards = !!selectedCategory || !!searchTerm;

  return (
    <main className="text-gray-900 dark:text-gray-100">
      {/* 1. HERO SECTION (con espacio reducido) */}
      <div className="bg-gray-50 dark:bg-gray-950 pt-10 pb-8 min-h-[35vh] md:pt-12 md:pb-10 md:min-h-[38vh] px-6">
        <div className="flex justify-between items-center mb-8 text-sm max-w-7xl mx-auto">
          <a
            href="https://github.com/YeremyGarrido/commandlex"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-purple-400 transition"
            title="Ver en GitHub"
          >
            <FaGithub size={24} />
          </a>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-purple-400 dark:text-gray-300">
              Inicio
            </Link>
            <span className="mx-0 text-gray-400">|</span>
            <Link
              href="/favoritos"
              className="hover:text-purple-400 dark:text-gray-300"
            >
              Favoritos
            </Link>
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center">
          {/* Título (Resetea la vista) */}
          <h1
            className="text-5xl sm:text-7xl font-extrabold mb-4 tracking-tighter cursor-pointer"
            onClick={resetView}
            title="Volver a Categorías"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
              CommandLex
            </span>
          </h1>

          <p className="text-lg text-gray-400 mb-4 max-w-xl mx-auto leading-relaxed">
            Catálogo{" "}
            <span className="text-purple-400 font-medium">offline-first</span>{" "}
            para todos tus comandos favoritos y atajos.
          </p>

          {/* Barra de búsqueda (Siempre visible) */}
          <div className="flex justify-center mx-auto max-w-2xl mt-4 animate-fadeIn">
            <div className="flex flex-grow items-center gap-2">
              <div className="relative flex-grow rounded-xl border border-gray-800 bg-gray-900/60 shadow-lg backdrop-blur-sm focus-within:ring-2 focus-within:ring-purple-500/40 transition-all">
                <SearchBox externalValue={searchTerm} onSearch={handleSearch} />
              </div>
              <div className="relative">
                <button
                  onClick={() => {
                    setSelectedApps(appliedApps);
                    setSelectedLevels(appliedLevels);
                    setShowFilters(!showFilters);
                  }}
                  className="w-full sm:w-auto flex justify-center items-center p-2 
                                 rounded-r-lg text-gray-400 hover:text-purple-400 dark:bg-gray-900 
                                 dark:border dark:border-l-0 dark:border-gray-700 transition
                                 ml-[-1px]"
                  style={{ height: "42px" }}
                  title="Mostrar Filtros"
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
                    <span className="bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center absolute -top-1 -right-1">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
                {showFilters && (
                  <div
                    className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-gray-800 
                             border dark:border-gray-700 rounded-lg shadow-2xl z-50 p-4"
                  >
                    <h3 className="font-semibold mb-2 text-gray-400 dark:text-gray-400">
                      Aplicaciones
                    </h3>
                    <div className="max-h-40 overflow-y-auto border dark:border-gray-700 rounded-md p-2 mb-4">
                      {aplicaciones.map((app) => (
                        <label
                          key={app}
                          className="flex items-center gap-2 p-1 hover:bg-gray-700 rounded transition-colors cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedApps.includes(app)}
                            onChange={() => handleAppChange(app)}
                            className="h-4 w-4 rounded border-gray-500 bg-gray-700 text-purple-500 focus:ring-purple-500 transition-colors"
                          />
                          <span className="text-sm text-gray-200">{app}</span>
                        </label>
                      ))}
                    </div>
                    <h3 className="font-semibold mb-2 text-gray-400 dark:text-gray-400">
                      Niveles
                    </h3>
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
                          <span className="text-sm text-gray-200 capitalize">
                            {level}
                          </span>
                        </label>
                      ))}
                    </div>
                    <div className="flex justify-end gap-2 border-t dark:border-gray-700 pt-4">
                      <button
                        onClick={handleCancelFilters}
                        className="px-4 py-2 text-sm rounded-md text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveFilters}
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

      {/* 2. CONTENEDOR DE LA CUADRÍCULA (Condicional) */}
      <div className="px-6 max-w-7xl mx-auto">
        {showCards ? (
          // A. VISTA DE CARDS (si hay categoría o búsqueda)
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-fadeIn">
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
        ) : (
          // B. VISTA DE CATEGORÍAS (por defecto)
          <CategoryPicker
            applications={aplicaciones}
            onSelectApp={handleCategorySelect}
          />
        )}
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
