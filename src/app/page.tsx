import { Suspense } from "react";
import { loadDataset } from "@/lib/data";
import CodeWikiHome from "@/components/CodeWikiHome";

export default async function Page() {
  const data = await loadDataset();

  return (
    <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Cargando...</div>}>
      <CodeWikiHome initialCommands={data.comandos} />
    </Suspense>
  );
}
