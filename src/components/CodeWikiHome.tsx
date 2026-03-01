"use client";

import { useState } from "react";
import { type Command } from "@/lib/data";
import { useTheme } from "@/hooks/useTheme";
import { useCommandFilter } from "@/hooks/useCommandFilter";
import * as favs from "@/lib/favs";
import { Header } from "@/components/Header";
import { Drawer } from "@/components/Drawer";
import { CommandModal } from "@/components/CommandModal";
import { FaTerminal, FaLinux, FaWindows, FaGitAlt, FaDocker, FaDatabase, FaStar } from "react-icons/fa";

interface CodeWikiHomeProps {
  initialCommands: readonly Command[];
}

// Mapa de iconos para categorías — definido fuera del componente (no se recrea en cada render)
const ICON_MAP: Record<string, React.ReactNode> = {
  Linux: <FaLinux size={24} />,
  Windows: <FaWindows size={24} />,
  Git: <FaGitAlt size={24} />,
  Docker: <FaDocker size={24} />,
  SQL: <FaDatabase size={24} />,
};

export default function CodeWikiHome({ initialCommands }: CodeWikiHomeProps) {
  const { isDark, toggleTheme } = useTheme();
  const {
    aplicaciones,
    filteredCommands,
    showCards,
    searchTerm,
    selectedCategory,
    handleSearch,
    handleCategorySelect,
    resetView,
  } = useCommandFilter(initialCommands);

  const [selectedCommand, setSelectedCommand] = useState<Command | null>(null);
  const [, setFavVersion] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleFav = (id: string) => {
    favs.toggle(id);
    setFavVersion((v) => v + 1);
  };

  return (
    <>
      <Header
        searchTerm={searchTerm}
        isDark={isDark}
        onSearch={handleSearch}
        onResetView={resetView}
        onToggleTheme={toggleTheme}
        onOpenDrawer={() => setDrawerOpen(true)}
        showMenuBtn={showCards}
      />

      {showCards && (
        <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <SidebarContent
            aplicaciones={aplicaciones}
            selectedCategory={selectedCategory}
            onCategorySelect={(cat) => {
              handleCategorySelect(cat);
              setDrawerOpen(false);
            }}
            onResetView={() => {
              resetView();
              setDrawerOpen(false);
            }}
          />
        </Drawer>
      )}

      {!showCards ? (
        <HeroSection
          aplicaciones={aplicaciones}
          onCategorySelect={handleCategorySelect}
        />
      ) : (
        <ContentLayout
          aplicaciones={aplicaciones}
          selectedCategory={selectedCategory}
          filteredCommands={filteredCommands}
          isDark={isDark}
          onCategorySelect={handleCategorySelect}
          onResetView={resetView}
          onSelectCommand={setSelectedCommand}
          onToggleFav={toggleFav}
        />
      )}

      {selectedCommand && (
        <CommandModal
          comando={selectedCommand}
          onClose={() => setSelectedCommand(null)}
        />
      )}
    </>
  );
}

// --- Subcomponentes locales ---

// Contenido del sidebar — compartido entre desktop sidebar y mobile drawer
interface SidebarContentProps {
  aplicaciones: string[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  onResetView: () => void;
}

function SidebarContent({
  aplicaciones,
  selectedCategory,
  onCategorySelect,
  onResetView,
}: SidebarContentProps) {
  return (
    <div>
      <button onClick={onResetView} className="cw-nav-item" style={{ width: "100%" }}>
        ← Volver a categorías
      </button>
      <div style={{ marginTop: "24px" }}>
        <div
          style={{
            fontSize: "12px",
            fontWeight: 600,
            textTransform: "uppercase",
            opacity: 0.6,
            marginBottom: "12px",
            padding: "0 12px",
          }}
        >
          Categorías
        </div>
        {aplicaciones.map((app) => (
          <button
            key={app}
            onClick={() => onCategorySelect(app)}
            className={`cw-nav-item ${
              selectedCategory === app ? "cw-nav-item-active" : ""
            }`}
            style={{ width: "100%" }}
          >
            <span style={{ fontSize: "18px", lineHeight: 1, flexShrink: 0 }}>
              {ICON_MAP[app] ?? <FaTerminal size={18} />}
            </span>
            {app}
          </button>
        ))}
      </div>
    </div>
  );
}


interface HeroSectionProps {
  aplicaciones: string[];
  onCategorySelect: (category: string) => void;
}

function HeroSection({ aplicaciones, onCategorySelect }: HeroSectionProps) {
  return (
    <div>
      <div className="cw-hero cw-animate-in">
        <h1 className="cw-hero-title">CommandLex</h1>
        <p className="cw-hero-subtitle">
          Tu biblioteca de comandos de terminal, siempre accesible.
          <br />
          Offline-first, rápido y fácil de usar.
        </p>
      </div>

      <div className="cw-category-grid" style={{ paddingBottom: "80px" }}>
        {aplicaciones.map((app) => (
          <button
            key={app}
            onClick={() => onCategorySelect(app)}
            className="cw-category-card"
            aria-label={`Ver comandos de ${app}`}
          >
            <div className="cw-category-icon">
              {ICON_MAP[app] ?? <FaTerminal size={24} />}
            </div>
            <span className="cw-category-name">{app}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

interface ContentLayoutProps {
  aplicaciones: string[];
  selectedCategory: string;
  filteredCommands: readonly Command[];
  isDark: boolean;
  onCategorySelect: (category: string) => void;
  onResetView: () => void;
  onSelectCommand: (cmd: Command) => void;
  onToggleFav: (id: string) => void;
}

function ContentLayout({
  aplicaciones,
  selectedCategory,
  filteredCommands,
  isDark,
  onCategorySelect,
  onResetView,
  onSelectCommand,
  onToggleFav,
}: ContentLayoutProps) {
  return (
    <div className="cw-layout">
      {/* Sidebar — solo desktop; en mobile usa el Drawer */}
      <aside className="cw-sidebar">
        <SidebarContent
          aplicaciones={aplicaciones}
          selectedCategory={selectedCategory}
          onCategorySelect={onCategorySelect}
          onResetView={onResetView}
        />
      </aside>

      {/* Main */}
      <main className="cw-content">
        {selectedCategory && (
          <div className="cw-breadcrumb">
            <button
              onClick={onResetView}
              className="cw-breadcrumb-link"
              style={{ background: "none", border: "none", padding: 0 }}
            >
              Inicio
            </button>
            <span>/</span>
            <span>{selectedCategory}</span>
          </div>
        )}

        <CommandGrid
          commands={filteredCommands}
          isDark={isDark}
          onSelectCommand={onSelectCommand}
          onToggleFav={onToggleFav}
        />
      </main>
    </div>
  );
}

interface CommandGridProps {
  commands: readonly Command[];
  isDark: boolean;
  onSelectCommand: (cmd: Command) => void;
  onToggleFav: (id: string) => void;
}

function CommandGrid({ commands, isDark, onSelectCommand, onToggleFav }: CommandGridProps) {
  // Snapshot de favoritos para este render — evita N llamadas a localStorage
  const favSet = new Set(favs.get());

  if (commands.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "60px 20px",
          opacity: 0.6,
        }}
      >
        No se encontraron comandos.
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "16px",
      }}
      className="cw-animate-in"
    >
      {commands.map((cmd) => (
        <CommandCardCW
          key={cmd.id}
          cmd={cmd}
          isFav={favSet.has(cmd.id)}
          isDark={isDark}
          onSelect={onSelectCommand}
          onToggleFav={onToggleFav}
        />
      ))}
    </div>
  );
}

interface CommandCardCWProps {
  cmd: Command;
  isFav: boolean;
  isDark: boolean;
  onSelect: (cmd: Command) => void;
  onToggleFav: (id: string) => void;
}

function CommandCardCW({ cmd, isFav, isDark, onSelect, onToggleFav }: CommandCardCWProps) {
  return (
    <div
      className="cw-command-card"
      onClick={() => onSelect(cmd)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onSelect(cmd)}
      aria-label={`Ver detalle de ${cmd.comando}`}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "start",
          marginBottom: "12px",
        }}
      >
        <span
          style={{
            fontSize: "18px",
            fontWeight: 500,
            fontFamily: "monospace",
          }}
        >
          {cmd.comando}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFav(cmd.id);
          }}
          aria-label={isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: isFav ? "#F9A825" : "currentColor",
            opacity: isFav ? 1 : 0.4,
          }}
        >
          <FaStar size={16} />
        </button>
      </div>

      <p
        style={{
          fontSize: "14px",
          opacity: 0.8,
          lineHeight: 1.5,
          marginBottom: "12px",
        }}
      >
        {/* Strip de markdown básico — DT-011 parcial */}
        {cmd.descripcion.replace(/\*\*(.*?)\*\*/g, "$1").replace(/`(.*?)`/g, "$1")}
      </p>

      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
        {cmd.tags?.slice(0, 3).map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: "12px",
              padding: "4px 8px",
              borderRadius: "4px",
              backgroundColor: isDark
                ? "rgba(138, 180, 248, 0.1)"
                : "rgba(26, 115, 232, 0.08)",
              color: isDark ? "#8ab4f8" : "#1a73e8",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
