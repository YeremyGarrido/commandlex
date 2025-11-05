import { loadDataset } from "@/lib/data";
import { Tag } from "@/components/Tag";
import Link from "next/link";

// ✅ Necesario para "output: export"
// Esto indica a Next qué páginas dinámicas debe generar
export async function generateStaticParams() {
  const dataset = await loadDataset();
  return dataset.comandos.map((cmd) => ({
    id: cmd.id,
  }));
}

// ✅ Metadatos opcionales (Next 14)
export const metadata = {
  title: "Detalle de comando – CommandLex",
  description: "Vista detallada de un comando del catálogo",
};

export default async function DetallePage({
  params,
}: {
  params: { id: string };
}) {
  const dataset = await loadDataset();
  const cmd = dataset.comandos.find((c) => c.id === params.id);

  if (!cmd) {
    return (
      <div className="p-8 text-center">
        <p>Comando no encontrado.</p>
        <Link href="/" className="text-blue-500 underline">
          Volver
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-6 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-2">{cmd.comando}</h1>
      <p className="mb-4 text-gray-600 dark:text-gray-400">{cmd.descripcion}</p>

      <div className="flex flex-wrap gap-2 mb-6">
        <Tag label={cmd.entorno} color="blue" />
        <Tag label={cmd.nivel} color="green" />
        {cmd.tags.map((t) => (
          <Tag key={t} label={t} color="gray" />
        ))}
      </div>

      <h2 className="font-semibold mb-2">Ejemplos</h2>
      <ul className="list-disc pl-6 mb-6">
        {cmd.ejemplo.map((e) => (
          <li key={e}>
            <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">
              {e}
            </code>
          </li>
        ))}
      </ul>

      <p className="text-sm text-gray-500">
        Requerimientos: {cmd.requerimientos || "Ninguno especificado"}
      </p>

      <Link href="/" className="block mt-6 text-blue-500 underline">
        ← Volver al listado
      </Link>
    </main>
  );
}
