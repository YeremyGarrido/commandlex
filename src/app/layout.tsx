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
    <html lang="es" className="dark">
      <body className="min-h-screen bg-gray-950 text-gray-100 antialiased">
        <ServiceWorkerProvider />
        {children}
      </body>
    </html>
  );
}
