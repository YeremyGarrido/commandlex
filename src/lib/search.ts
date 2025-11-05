// src/lib/search.ts
// Strategy Pattern → motor de búsqueda reemplazable en el futuro (minisearch, fuse.js, etc.)

import type { Command } from "./data";

export type SearchOptions = {
  entorno?: Command["entorno"] | "Todos";
  nivel?: Command["nivel"] | "Todos";
  tags?: string[];
};

/**
 * Tokeniza texto en minúsculas sin tildes.
 */
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .split(/\s+/)
    .filter(Boolean);
}

/**
 * Filtra comandos en memoria según el texto y los filtros opcionales.
 */
export function search(
  commands: Command[],
  query: string,
  opts: SearchOptions = {}
): Command[] {
  const tokens = tokenize(query);
  return commands.filter((c) => {
    if (opts.entorno && opts.entorno !== "Todos" && c.entorno !== opts.entorno)
      return false;
    if (opts.nivel && opts.nivel !== "Todos" && c.nivel !== opts.nivel)
      return false;
    if (opts.tags?.length && !c.tags.some((t) => opts.tags!.includes(t)))
      return false;

    const texto = `${c.comando} ${c.descripcion} ${
      c.requerimientos
    } ${c.tags.join(" ")}`.toLowerCase();
    return tokens.every((t) => texto.includes(t));
  });
}
