// src/lib/search.ts
// Módulo de búsqueda tolerante entre v2.x (entorno) y v3.x (aplicaciones)

export type Command = {
  id?: string;
  comando: string;
  descripcion: string;
  requerimientos?: string;
  aplicaciones?: string[]; // v3.0
  entorno?: string; // v2.x (compatibilidad temporal)
  nivel?: string;
  tags?: string[];
};

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

  // Filtra por entorno (usando entorno o aplicaciones[])
  if (entorno) {
    filtered = filtered.filter((c) =>
      c.entorno
        ? c.entorno.toLowerCase() === entorno
        : c.aplicaciones?.some((app) => app.toLowerCase() === entorno)
    );
  }

  // Filtra por nivel
  if (nivel) {
    filtered = filtered.filter((c) => (c.nivel ?? "").toLowerCase() === nivel);
  }

  // Si no hay query, retorna los filtrados
  if (tokens.length === 0) return filtered;

  // Busca por texto completo
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
