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

  // --- DETECCIÓN DE TIPO DE BLOQUE ---
  // Detectamos si esto es un bloque de código multi-línea (JSON, JS, Snippet)
  // o si son varios ejemplos de comandos separados.
  const isMultiLineBlock = comando.tags.some((t) =>
    ["snippet", "código", "js", "ts", "json", "gherkin"].includes(t)
  );

  // --- HELPERS DE ESTILO ---
  const getStatusStyles = (code: string) => {
    const c = code.toUpperCase();
    if (c.startsWith("2") || c === "POST" || c === "OK") {
      return { border: "border-green-500", text: "text-green-400" };
    }
    if (c.startsWith("3") || c === "GET") {
      return { border: "border-blue-500", text: "text-blue-400" };
    }
    if (c.startsWith("4") || c === "PUT" || c === "PATCH") {
      return { border: "border-yellow-500", text: "text-yellow-400" };
    }
    if (c.startsWith("5") || c === "DELETE" || c === "ERROR") {
      return { border: "border-red-500", text: "text-red-400" };
    }
    return { border: "border-gray-600", text: "text-gray-400" };
  };

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
    const rest = text.substring(code.length).trim();
    const styles = getStatusStyles(code);

    return (
      <div
        className={`
          relative flex items-center px-4 py-3 mb-3
          bg-gray-950/50 rounded-r-lg rounded-l-sm
          border border-gray-800/50
          border-l-4 ${styles.border}
          font-mono text-sm text-gray-300
          hover:bg-gray-900 transition-colors
        `}
      >
        <span className={`font-bold mr-3 ${styles.text}`}>{code}</span>
        <span>{rest}</span>
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

    // Usamos la misma detección de arriba para saber si renderizar Highlight
    if (isMultiLineBlock) {
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
                {isMultiLineBlock ? "Código" : "Ejemplos"}
                <span className="text-xs font-normal text-gray-500 px-2 py-0.5 bg-gray-800 rounded-full border border-gray-700">
                  {isMultiLineBlock ? 1 : comando.ejemplo.length}
                </span>
              </h3>
              
              <div className="flex flex-col gap-4">
                {/* === LÓGICA CORREGIDA AQUÍ === */}
                {isMultiLineBlock ? (
                  // Si es JSON o Snippet, unimos todo el array con saltos de línea
                  // y renderizamos UN SOLO bloque grande.
                  <div className="relative group">
                    {renderExample(comando.ejemplo.join("\n"))}
                  </div>
                ) : (
                  // Si son comandos normales, renderizamos cada uno por separado
                  comando.ejemplo.map((ej, index) => (
                    <div key={index} className="relative group">
                      {renderExample(ej)}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* === COLUMNA DERECHA (Metadata) === */}
            <div className="md:col-span-1">
              <div className="sticky top-0 space-y-6">
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
                <div>
                  <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                    <FaTerminal /> Requerimientos
                  </h4>
                  <p className="text-sm text-gray-300">
                    {comando.requerimientos}
                  </p>
                </div>
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