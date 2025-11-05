// Importamos el JSON directamente como módulo
import commandsData from "../../public/data/commands.json";

export type Command = {
  id: string;
  comando: string;
  // --- MODIFICADO ---
  // Se cambia a 'string' para aceptar los nuevos entornos
  // (Excel, Word, Helm, Kubernetes, etc.)
  entorno: string;
  // Se cambia a 'string' para ser más flexible
  nivel: string;
  // --- FIN MODIFICADO ---
  descripcion: string;
  ejemplo: string[];
  requerimientos: string;
  tags: string[];
};

export type Dataset = {
  dataset: { version: string; updatedAt: string };
  // --- MODIFICADO ---
  // Asegurarse de que 'niveles' sea un array de 'string'
  niveles: string[];
  comandos: Command[];
};

/**
 * Carga el dataset. Como es static export, lo importamos directamente.
 */
export async function loadDataset(): Promise<Dataset> {
  // Retornamos el JSON importado
  return commandsData as Dataset;
}
