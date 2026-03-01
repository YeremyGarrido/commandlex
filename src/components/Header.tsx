"use client";

import { FaGithub, FaStar, FaTerminal, FaMoon, FaSun, FaBars } from "react-icons/fa";

interface HeaderProps {
  searchTerm: string;
  isDark: boolean;
  onSearch: (value: string) => void;
  onResetView: () => void;
  onToggleTheme: () => void;
  onOpenDrawer: () => void;
  showMenuBtn: boolean; // solo true cuando hay contenido (sidebar visible en desktop)
}

export function Header({
  searchTerm,
  isDark,
  onSearch,
  onResetView,
  onToggleTheme,
  onOpenDrawer,
  showMenuBtn,
}: HeaderProps) {
  return (
    <header className="cw-header">
      {/* Hamburguesa — solo en mobile cuando hay sidebar */}
      {showMenuBtn && (
        <button
          className="cw-menu-btn"
          onClick={onOpenDrawer}
          aria-label="Abrir menú de categorías"
        >
          <FaBars size={18} />
        </button>
      )}

      {/* Logo */}
      <button onClick={onResetView} className="cw-logo">
        <FaTerminal size={24} />
        <span>CommandLex</span>
      </button>

      {/* Search */}
      <div className="cw-search-container">
        <div style={{ position: "relative" }}>
          <input
            type="text"
            className="cw-search"
            placeholder="Buscar comandos, flags..."
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            aria-label="Buscar comandos"
          />
          <svg
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "20px",
              height: "20px",
              opacity: 0.6,
              pointerEvents: "none",
            }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: "8px", alignItems: "center", flexShrink: 0 }}>
        <a
          href="/favoritos"
          className="cw-button cw-button-ghost"
          style={{ textDecoration: "none" }}
        >
          <FaStar size={16} />
          <span className="cw-nav-label">Favoritos</span>
        </a>
        <a
          href="https://github.com/YeremyGarrido/commandlex"
          target="_blank"
          rel="noopener noreferrer"
          className="cw-button cw-button-ghost"
          aria-label="Ver en GitHub"
        >
          <FaGithub size={18} />
        </a>
        <button
          onClick={onToggleTheme}
          className="cw-theme-toggle"
          aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
        >
          {isDark ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>
      </div>
    </header>
  );
}
