"use client";
import { useEffect } from "react";
import type { Command } from "@/lib/data";
import { AppIcon } from "./AppIcon";
import { CopyBlock } from "./CopyBlock";
import { Tag } from "./Tag";
import { FaTimes, FaLayerGroup, FaTerminal, FaTags } from "react-icons/fa";
import { Highlight, themes } from "prism-react-renderer";
import ReactMarkdown from "react-markdown";

interface Props {
  comando: Command;
  onClose: () => void;
}

export const CommandModal = ({ comando, onClose }: Props) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // --- HELPERS DE RENDERIZADO ---

  const renderShortcut = (text: string) => {
    const parts = text.split("+");
    return (
      <div className="flex items-center gap-2 flex-wrap">
        {parts.map((part, i) => (
          <span key={i} className="flex items-center">
            <kbd className="px-2 py-1.5 text-sm font-semibold text-gray-200 bg-gray-700 border border-gray-600 rounded-md shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)]">
              {part.trim()}
            </kbd>
            {i < parts.length - 1 && (
              <span className="ml-2 text-gray-500">+</span>
            )}
          </span>
        ))}
      </div>
    );
  };

  const renderStatusCode = (text: string) => {
    const code = text.split(" ")[0];
    let colorClass = "bg-gray-700 text-gray-300";

    if (code.startsWith("2"))
      colorClass = "bg-green-900/50 text-green-300 border-green-700";
    if (code.startsWith("3"))
      colorClass = "bg-blue-900/50 text-blue-300 border-blue-700";
    if (code.startsWith("4"))
      colorClass = "bg-yellow-900/50 text-yellow-300 border-yellow-700";
    if (code.startsWith("5"))
      colorClass = "bg-red-900/50 text-red-300 border-red-700";

    return (
      <div
        className={`flex items-center px-3 py-2 rounded border ${colorClass} font-mono text-sm`}
      >
        <span className="font-bold mr-2">{code}</span>
        <span>{text.substring(code.length).trim()}</span>
      </div>
    );
  };

  const renderExample = (example: string) => {
    if (comando.tags.includes("atajo") && example.includes("+")) {
      return (
        <div className="p-4 bg-gray-900 rounded-md border border-gray-700">
          {renderShortcut(example)}
        </div>
      );
    }

    if (comando.tags.includes("teoría") || example.match(/^\d{3}\s/)) {
      return renderStatusCode(example);
    }

    const isCodeSnippet = comando.tags.some((t) =>
      ["snippet", "código", "js", "ts", "json"].includes(t)
    );

    if (isCodeSnippet) {
      return (
        <div className="rounded-md overflow-hidden border border-gray-700 text-sm">
          <Highlight theme={themes.vsDark} code={example} language="javascript">
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre
                style={style}
                className={`${className} p-4 overflow-auto custom-scrollbar`}
              >
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line })}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        </div>
      );
    }

    return <CopyBlock textToCopy={example} />;
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl border border-gray-700 bg-gray-800 shadow-2xl dark:bg-gray-900 animate-scaleIn custom-scrollbar"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-gray-400 hover:text-white bg-gray-800/50 rounded-full hover:bg-gray-700 transition-colors z-10"
        >
          <FaTimes size={20} />
        </button>

        <div className="p-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* === COLUMNA IZQUIERDA === */}
            <div className="md:col-span-2">
              <div className="flex items-start gap-5 mb-6">
                <div className="p-3 bg-gray-800 rounded-lg border border-gray-700">
                  <AppIcon appName={comando.aplicaciones[0]} size={40} />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-1 break-all">
                    {comando.comando}
                  </h2>
                  <p className="text-gray-400 text-sm font-medium flex items-center gap-2">
                    {comando.aplicaciones.join(", ")}
                  </p>
                </div>
              </div>

              <div className="text-gray-300 mb-8 leading-relaxed prose prose-invert max-w-none">
                <ReactMarkdown>{comando.descripcion}</ReactMarkdown>
              </div>

              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                Ejemplos
                <span className="text-xs font-normal text-gray-500 px-2 py-0.5 bg-gray-800 rounded-full border border-gray-700">
                  {comando.ejemplo.length}
                </span>
              </h3>
              <div className="flex flex-col gap-4">
                {comando.ejemplo.map((ej, index) => (
                  <div key={index} className="relative group">
                    {renderExample(ej)}
                  </div>
                ))}
              </div>
            </div>

            {/* === COLUMNA DERECHA (Metadata Limpia) === */}
            <div className="md:col-span-1">
              {/* Quitamos bg-gray-800, border, p-5, etc. Solo dejamos sticky si quieres que persiga al scroll */}
              <div className="sticky top-0 space-y-6">
                {/* Nivel */}
                <div>
                  <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                    <FaLayerGroup /> Nivel
                  </h4>
                  <Tag
                    label={comando.nivel}
                    color={
                      comando.nivel === "básico"
                        ? "green"
                        : comando.nivel === "intermedio"
                        ? "yellow"
                        : "red"
                    }
                  />
                </div>

                {/* Requerimientos (Estilo limpio recuperado) */}
                <div>
                  <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                    <FaTerminal /> Requerimientos
                  </h4>
                  <p className="text-sm text-gray-300">
                    {comando.requerimientos}
                  </p>
                </div>

                {/* Tags */}
                <div>
                  <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                    <FaTags /> Tags
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {comando.tags.map((tag) => (
                      <Tag key={tag} label={tag} color="blue" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
