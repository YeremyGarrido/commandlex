// src/components/FilterTabs.tsx
"use client";

interface FilterTabsProps {
  entornos: string[];
  active: string;
  onChange: (entorno: string) => void;
}

export default function FilterTabs({
  entornos,
  active,
  onChange,
}: FilterTabsProps) {
  return (
    <nav className="flex flex-wrap gap-2 my-4" aria-label="Filtrar por entorno">
      {entornos.map((entorno) => (
        <button
          key={entorno}
          onClick={() => onChange(entorno)}
          className={`
            px-4 py-2 rounded-full text-sm font-medium transition-colors
            ${
              active === entorno
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            }
          `}
        >
          {entorno}
        </button>
      ))}
    </nav>
  );
}
