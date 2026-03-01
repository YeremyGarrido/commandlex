"use client";

import { useEffect } from "react";
import { FaTimes, FaTerminal } from "react-icons/fa";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export function Drawer({ isOpen, onClose, children, title = "Categorías" }: DrawerProps) {
  // Cerrar con Escape y bloquear scroll del body cuando está abierto
  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`cw-drawer-overlay${isOpen ? " open" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <nav
        className={`cw-drawer${isOpen ? " open" : ""}`}
        aria-label="Menú de categorías"
        aria-hidden={!isOpen}
      >
        <div className="cw-drawer-header">
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <FaTerminal size={16} style={{ opacity: 0.6 }} />
            <span className="cw-drawer-title">{title}</span>
          </div>
          <button
            className="cw-drawer-close"
            onClick={onClose}
            aria-label="Cerrar menú"
          >
            <FaTimes size={16} />
          </button>
        </div>

        {children}
      </nav>
    </>
  );
}
