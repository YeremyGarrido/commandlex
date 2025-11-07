// Importamos el JSON directamente como módulo
import commandsData from "../../public/data/commands.json";

export type Command = {
  id: string;
  comando: string;
  entorno?: string;
  aplicaciones: string[];
  nivel: string;
  descripcion: string;
  ejemplo: string[];
  requerimientos: string;
  tags: string[];
};

export type Dataset = {
  dataset: { version: string; updatedAt: string };
  niveles: string[];
  comandos: Command[];
};

export async function loadDataset(): Promise<Dataset> {
  // Retornamos el JSON importado
  return commandsData as Dataset;
}
