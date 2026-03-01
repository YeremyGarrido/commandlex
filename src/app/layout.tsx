import "./globals-codewiki.css";
import { ServiceWorkerProvider } from "@/components/ServiceWorkerProvider";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata = {
  title: "CommandLex",
  description: "Tu biblioteca de comandos de terminal, siempre accesible",
};

const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (stored === 'dark' || (!stored && prefersDark)) {
      document.body.classList.add('dark');
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={roboto.variable}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <ServiceWorkerProvider />
        {children}
      </body>
    </html>
  );
}
