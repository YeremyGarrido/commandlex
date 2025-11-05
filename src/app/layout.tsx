import Link from "next/link";
import "./globals.css";
import { ServiceWorkerProvider } from "@/components/ServiceWorkerProvider";

export const metadata = {
  title: "CommandLex – MVP",
  description: "Catálogo de comandos offline-first",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <ServiceWorkerProvider />
        <header className="p-4 bg-gray-100 dark:bg-gray-900 flex gap-4 shadow-sm">
          <Link href="/" className="font-semibold hover:underline">
            Inicio
          </Link>
          <Link href="/favoritos" className="hover:underline">
            Favoritos
          </Link>
        </header>
        {children}
      </body>
    </html>
  );
}
