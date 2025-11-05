"use client";
import { useEffect, useState } from "react";
import { loadDataset, type Command } from "@/lib/data";
import * as favs from "@/lib/favs";
import { CommandCard } from "@/components/CommandCard";
import { EmptyState } from "@/components/EmptyState";

export default function FavoritosPage() {
  const [commands, setCommands] = useState<Command[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDataset()
      .then((d) => {
        const favIds = favs.get();
        const favCommands = d.comandos.filter((c) => favIds.includes(c.id));
        setCommands(favCommands);
      })
      .finally(() => setLoading(false));
  }, []);

  const toggleFav = (id: string) => {
    favs.toggle(id);
    setCommands(commands.filter((c) => favs.has(c.id)));
  };

  if (loading) return <p className="p-8">Cargando...</p>;

  return (
    <main className="min-h-screen p-6 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-4">Favoritos</h1>
      {commands.length === 0 ? (
        <EmptyState message="No tienes comandos favoritos aún." />
      ) : (
        <div className="grid gap-4">
          {commands.map((cmd) => (
            <CommandCard
              key={cmd.id}
              command={cmd}
              isFav={favs.has(cmd.id)}
              onToggleFav={toggleFav}
            />
          ))}
        </div>
      )}
    </main>
  );
}
