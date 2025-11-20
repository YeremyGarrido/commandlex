"use client";
import { Suspense } from "react";
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

export default function HomePageWrapper() {
  return (
    <Suspense fallback={<div className="p-8 text-gray-400">Cargando...</div>}>
      <HomePage />
    </Suspense>
  );
}

function HomePage() {
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
  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("q", value);
      params.delete("category");
    } else {
      params.delete("q");
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
    params.delete("q");
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

  // --- Lógica de filtrado ---
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
    if (
      !selectedCategory &&
      !searchTerm &&
      appliedApps.length === 0 &&
      appliedLevels.length === 0
    ) {
      return [];
    }

    return result;
  }, [allCommands, searchTerm, appliedApps, appliedLevels, selectedCategory]);

  // --- Handlers del Popover ---
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
  const showCards =
    !!selectedCategory ||
    !!searchTerm ||
    appliedApps.length > 0 ||
    appliedLevels.length > 0;

  return (
    <main className="text-gray-900 dark:text-gray-100">
      {/* 1. HERO SECTION */}
      <div className="bg-gray-950 pt-10 pb-8 min-h-[35vh] md:pt-12 md:pb-10 md:min-h-[38vh] px-6">
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

          <div className="flex justify-center mx-auto max-w-2xl mt-4 animate-fadeIn relative z-30">
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

                {/* === INICIO DEL FIX DEL FILTRO === */}
                {showFilters && (
                  <div
                    className="absolute right-0 top-full mt-2 w-80 z-50 
                               bg-gray-900 border border-gray-700 rounded-xl shadow-2xl 
                               flex flex-col animate-fadeIn overflow-hidden
                               max-h-[60vh]" /* 1. Altura máxima en el PADRE */
                  >
                    {/* --- CONTENIDO SCROLLABLE (Ocupa el espacio sobrante) --- */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
                      {/* Aplicaciones */}
                      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                        Aplicaciones
                      </h3>
                      <div className="space-y-1">
                        {aplicaciones.map((app) => (
                          <label
                            key={app}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 cursor-pointer transition-colors group"
                          >
                            <div className="relative flex items-center">
                              <input
                                type="checkbox"
                                checked={selectedApps.includes(app)}
                                onChange={() => handleAppChange(app)}
                                className="peer h-4 w-4 rounded border-gray-600 bg-gray-800 
                                           text-purple-500 focus:ring-purple-500/20 focus:ring-offset-0"
                              />
                            </div>
                            <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                              {app}
                            </span>
                          </label>
                        ))}
                      </div>

                      {/* Separador */}
                      <div className="my-4 border-t border-gray-800"></div>

                      {/* Niveles */}
                      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                        Niveles
                      </h3>
                      <div className="space-y-1">
                        {niveles.map((level) => (
                          <label
                            key={level}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 cursor-pointer transition-colors group"
                          >
                            <input
                              type="checkbox"
                              checked={selectedLevels.includes(level)}
                              onChange={() => handleLevelChange(level)}
                              className="h-4 w-4 rounded border-gray-600 bg-gray-800 
                                         text-purple-500 focus:ring-purple-500/20 focus:ring-offset-0"
                            />
                            <span className="text-sm text-gray-300 group-hover:text-white capitalize transition-colors">
                              {level}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* --- FOOTER (Siempre visible abajo) --- */}
                    <div className="p-4 bg-gray-950 border-t border-gray-800 flex justify-end gap-3 shrink-0">
                      <button
                        onClick={handleCancelFilters}
                        className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={handleSaveFilters}
                        className="px-4 py-2 text-sm font-medium bg-purple-600 text-white rounded-lg hover:bg-purple-500 shadow-lg shadow-purple-500/20 transition-all"
                      >
                        Aplicar
                      </button>
                    </div>
                  </div>
                )}
                {/* === FIN DEL FIX DEL FILTRO === */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. CONTENEDOR DE LA CUADRÍCULA */}
      <div className="px-6 max-w-7xl mx-auto">
        {showCards ? (
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
