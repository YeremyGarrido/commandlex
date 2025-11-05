"use client";
import { useEffect, useState } from "react";
import { loadDataset, type Command } from "@/lib/data";
import { search } from "@/lib/search";
import * as favs from "@/lib/favs";
import { SearchBox } from "@/components/SearchBox";
import { CommandCard } from "@/components/CommandCard";
import { EmptyState } from "@/components/EmptyState";

export default function HomePage() {
  const [allCommands, setAllCommands] = useState<Command[]>([]);
  const [filtered, setFiltered] = useState<Command[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDataset()
      .then((d) => {
        setAllCommands(d.comandos);
        setFiltered(d.comandos);
      })
      .catch(() => console.error("Error cargando dataset"))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (q: string) => {
    const results = search(allCommands, q);
    setFiltered(results);
  };

  const toggleFav = (id: string) => {
    favs.toggle(id);
    setFiltered([...filtered]); // fuerza re-render
  };

  if (loading) return <p className="p-8">Cargando...</p>;

  return (
    <main className="min-h-screen p-6 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-4">CommandLex</h1>
      <SearchBox onSearch={handleSearch} />
      <div className="mt-6 grid gap-4">
        {filtered.length === 0 ? (
          <EmptyState message="No se encontraron comandos." />
        ) : (
          filtered.map((cmd) => (
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
