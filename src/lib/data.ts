import commandsData from "../../public/data/commands.json";

// Niveles posibles en el dataset
export type Nivel = "básico" | "intermedio" | "avanzado" | "teórico";

// Modo de renderizado del bloque de ejemplos en CommandModal
// Reemplaza el Magic Array de tags (DT-006)
export type RenderMode = "command" | "snippet" | "shortcut" | "status-code";

export type Command = {
  readonly id: string;
  readonly comando: string;
  readonly entorno?: string; // campo legacy v2.x — no añadir en comandos nuevos
  readonly aplicaciones: readonly string[];
  readonly nivel: Nivel;
  readonly descripcion: string;
  readonly ejemplo: readonly string[];
  readonly requerimientos: string;
  readonly tags: readonly string[];
  readonly renderMode?: RenderMode; // explícito en JSON cuando aplica (DT-006)
};

export type Dataset = {
  readonly dataset: { readonly version: string; readonly updatedAt: string };
  readonly niveles: readonly string[];
  readonly comandos: readonly Command[];
};

export async function loadDataset(): Promise<Dataset> {
  return commandsData as unknown as Dataset;
}
