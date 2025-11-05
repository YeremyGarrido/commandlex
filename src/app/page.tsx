// src/app/page.tsx
"use client";
import { useEffect, useState, useMemo } from "react"; // MODIFICADO: Añadido useMemo
import { loadDataset, type Command } from "@/lib/data";
import { search } from "@/lib/search";
import * as favs from "@/lib/favs";
import { SearchBox } from "@/components/SearchBox";
import { CommandCard } from "@/components/CommandCard";
import { EmptyState } from "@/components/EmptyState";
import FilterTabs from "@/components/FilterTabs"; // NUEVO: Importar el componente

export default function HomePage() {
  const [allCommands, setAllCommands] = useState<Command[]>([]);
  // const [filtered, setFiltered] = useState<Command[]>([]); // MODIFICADO: Eliminamos este estado
  const [loading, setLoading] = useState(true);

  // --- NUEVOS ESTADOS PARA LOS FILTROS ---
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("Todos");
  // Estado para forzar re-render al dar fav
  const [favVersion, setFavVersion] = useState(0);

  useEffect(() => {
    loadDataset()
      .then((d) => {
        setAllCommands(d.comandos);
        // setFiltered(d.comandos); // MODIFICADO: Eliminamos esta línea
      })
      .catch(() => console.error("Error cargando dataset"))
      .finally(() => setLoading(false));
  }, []);

  // MODIFICADO: El 'handleSearch' ahora solo actualiza el estado 'searchTerm'
  const handleSearch = (q: string) => {
    setSearchTerm(q);
  };

  // MODIFICADO: 'toggleFav' ahora actualiza 'favVersion' para forzar re-render
  const toggleFav = (id: string) => {
    favs.toggle(id);
    setFavVersion((v) => v + 1); // Esto fuerza al componente a re-renderizarse
  };

  // --- NUEVA LÓGICA DE FILTRADO CON useMemo ---

  // 1. Obtenemos la lista de entornos disponibles
  const entornos = useMemo(() => {
    const uniqueEntornos = [...new Set(allCommands.map((cmd) => cmd.entorno))];
    return ["Todos", ...uniqueEntornos];
  }, [allCommands]);

  // 2. Calculamos la lista filtrada
  const filteredCommands = useMemo(() => {
    // Primero, filtramos por el entorno (Tab)
    const filteredByEnv = allCommands.filter((command) => {
      if (activeFilter === "Todos") return true;
      return command.entorno === activeFilter;
    });

    // Luego, filtramos por búsqueda (usando tu función 'search')
    return search(filteredByEnv, searchTerm);
  }, [allCommands, activeFilter, searchTerm]); // Se recalcula si algo de esto cambia

  if (loading) return <p className="p-8">Cargando...</p>;

  return (
    <main className="min-h-screen p-6 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-4">CommandLex</h1>

      {/* MODIFICADO: 'onSearch' ahora es 'onChange' para ser más semántico */}
      {/* Asegúrate de que tu SearchBox use 'onChange' o ajústalo a 'onSearch' */}
      <SearchBox onSearch={handleSearch} />

      {/* NUEVO: Añadimos los tabs de filtro */}
      <FilterTabs
        entornos={entornos}
        active={activeFilter}
        onChange={(nuevoEntorno) => setActiveFilter(nuevoEntorno)}
      />

      <div className="mt-6 grid gap-4">
        {/* MODIFICADO: Usamos 'filteredCommands.length' */}
        {filteredCommands.length === 0 ? (
          <EmptyState message="No se encontraron comandos." />
        ) : (
          // MODIFICADO: Usamos 'filteredCommands.map'
          filteredCommands.map((cmd) => (
            <CommandCard
              key={cmd.id}
              command={cmd}
              isFav={favs.has(cmd.id)} // Esto se re-evalúa gracias a 'favVersion'
              onToggleFav={toggleFav}
            />
          ))
        )}
      </div>
    </main>
  );
}
