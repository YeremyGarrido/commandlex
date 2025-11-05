// Importamos el JSON directamente como módulo
import commandsData from "../../public/data/commands.json";

export type Command = {
  id: string;
  comando: string;
  entorno: "Linux" | "PowerShell" | "Git" | "Docker";
  nivel: "básico" | "intermedio" | "avanzado";
  descripcion: string;
  ejemplo: string[];
  requerimientos: string;
  tags: string[];
};

export type Dataset = {
  dataset: { version: string; updatedAt: string };
  niveles: Array<Command["nivel"]>;
  comandos: Command[];
};

/**
 * Carga el dataset. Como es static export, lo importamos directamente.
 */
export async function loadDataset(): Promise<Dataset> {
  // Retornamos el JSON importado
  return commandsData as Dataset;
}
