import { Suspense } from "react";
import { loadDataset } from "@/lib/data";
import HomePage from "@/components/HomePage";

export default async function Page() {
  const data = await loadDataset();

  return (
    <Suspense fallback={<div className="p-8 text-gray-400">Cargando...</div>}>
      <HomePage initialCommands={data.comandos} />
    </Suspense>
  );
}
