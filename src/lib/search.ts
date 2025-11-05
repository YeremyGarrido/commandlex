// src/lib/search.ts
import type { Command } from "./data";

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
 * Filtra comandos en memoria según el texto de búsqueda.
 * La lógica de filtrado por facetas (aplicaciones, nivel) se maneja en el componente de UI.
 */
export function search(commands: Command[], query: string): Command[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) {
    return commands;
  }

  return commands.filter((c) => {
    // Construimos el texto de búsqueda uniendo todos los campos relevantes
    const searchableText = [
      c.comando,
      c.descripcion,
      c.requerimientos,
      ...(c.aplicaciones || []),
      ...(c.tags || []),
    ]
      .join(" ")
      .toLowerCase();

    return tokens.every((t) => searchableText.includes(t));
  });
}