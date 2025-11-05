// src/lib/favs.ts
// Gateway Pattern → encapsula el acceso a localStorage.

const KEY = "favs";

/** Obtiene la lista de IDs marcados como favoritos. */
export function get(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/** Guarda la lista de IDs en localStorage. */
export function set(ids: string[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify([...new Set(ids)]));
  } catch {
    console.warn("No se pudieron guardar los favoritos");
  }
}

/** Alterna un ID (añade o quita). */
export function toggle(id: string): string[] {
  const current = new Set(get());
  current.has(id) ? current.delete(id) : current.add(id);
  const result = [...current];
  set(result);
  return result;
}

/** Verifica si un ID está marcado como favorito. */
export function has(id: string): boolean {
  return get().includes(id);
}
