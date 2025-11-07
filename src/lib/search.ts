// src/lib/search.ts
import type { Command } from "./data"; // <-- usa el mismo tipo del dataset

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .split(/\s+/)
    .filter(Boolean);
}

export function search(
  commands: Command[],
  query: string,
  filters?: { entorno?: string; nivel?: string }
): Command[] {
  const tokens = tokenize(query);
  let filtered = [...commands];

  const entorno = filters?.entorno?.toLowerCase();
  const nivel = filters?.nivel?.toLowerCase();

  // Filtra por entorno (v2.x) o aplicaciones (v3.x)
  if (entorno) {
    filtered = filtered.filter((c) =>
      "entorno" in c && typeof c.entorno === "string"
        ? c.entorno.toLowerCase() === entorno
        : (c.aplicaciones ?? []).some((app) => app.toLowerCase() === entorno)
    );
  }

  // Filtra por nivel
  if (nivel) {
    filtered = filtered.filter((c) => (c.nivel ?? "").toLowerCase() === nivel);
  }

  // Si no hay texto, retorna los filtrados por facetas
  if (tokens.length === 0) return filtered;

  // Búsqueda textual completa (nombre, descripción, requerimientos, tags, etc.)
  return filtered.filter((c) => {
    const searchableText = [
      c.comando,
      c.descripcion,
      c.requerimientos ?? "",
      ...(c.aplicaciones ?? []),
      ...(c.tags ?? []),
    ]
      .join(" ")
      .toLowerCase();

    return tokens.every((t) => searchableText.includes(t));
  });
}
