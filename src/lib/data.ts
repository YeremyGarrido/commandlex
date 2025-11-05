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
 * Carga el dataset local desde /public/data/commands.json.
 * Usa fetch en el navegador y lectura de archivo en el build/export.
 */
export async function loadDataset(): Promise<Dataset> {
  // En entorno navegador → fetch
  if (typeof window !== "undefined") {
    const res = await fetch("/data/commands.json", { cache: "no-store" });
    if (!res.ok) throw new Error("No se pudo cargar el dataset local");
    return (await res.json()) as Dataset;
  }

  // En entorno Node.js → importar fs dinámicamente
  const { readFileSync } = await import("fs");
  const { join } = await import("path");
  const filePath = join(process.cwd(), "public", "data", "commands.json");

  const json = readFileSync(filePath, "utf-8");
  const data = JSON.parse(json);

  if (!isValidDataset(data)) {
    throw new Error("Dataset inválido");
  }

  return data as Dataset;
}

function isValidDataset(d: any): d is Dataset {
  return (
    d &&
    typeof d.dataset?.version === "string" &&
    Array.isArray(d.niveles) &&
    Array.isArray(d.comandos)
  );
}
