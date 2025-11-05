// src/components/MultiSelectFilter.tsx
"use client";

import { useState } from "react";

// Componentes de Shadcn/ui
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Icono (el mismo que tenías)
const FilterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path
      fillRule="evenodd"
      d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 0 1 .628.74v2.288a2.25 2.25 0 0 1-.659 1.59l-4.682 4.683a2.25 2.25 0 0 0-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 0 1 8 18.25v-5.757a2.25 2.25 0 0 0-.659-1.59L2.659 6.22A2.25 2.25 0 0 1 2 4.629V2.34a.75.75 0 0 1 .628-.74Z"
      clipRule="evenodd"
    />
  </svg>
);

// MODIFICADO: CheckboxItem ahora usa los componentes de Shadcn
interface CheckboxItemProps {
  label: string;
  isChecked: boolean;
  onChange: () => void;
}
const CheckboxItem = ({ label, isChecked, onChange }: CheckboxItemProps) => (
  <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
    <Checkbox
      id={label}
      checked={isChecked}
      onCheckedChange={onChange} // onCheckedChange es la prop de Shadcn
    />
    <label
      htmlFor={label}
      className="text-sm font-medium leading-none text-gray-900 dark:text-gray-100 cursor-pointer"
    >
      {label}
    </label>
  </div>
);

// Interface (sin cambios)
interface MultiSelectFilterProps {
  entornos: string[];
  niveles: string[];
  selectedEntornos: string[];
  selectedNiveles: string[];
  onEntornoChange: (entorno: string) => void;
  onNivelChange: (nivel: string) => void;
  onClearFilters: () => void;
}

export default function MultiSelectFilter({
  entornos,
  niveles,
  selectedEntornos,
  selectedNiveles,
  onEntornoChange,
  onNivelChange,
  onClearFilters,
}: MultiSelectFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const activeFilterCount = selectedEntornos.length + selectedNiveles.length;

  return (
    <div className="relative">
      {/* MODIFICADO: Botón principal de Shadcn */}
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
      >
        <FilterIcon />
        <span>Filtros</span>
        {activeFilterCount > 0 && (
          <span className="ml-1 px-2 py-0.5 rounded-full bg-blue-600 text-white text-xs">
            {activeFilterCount}
          </span>
        )}
      </Button>

      {/* MODIFICADO: Menú desplegable usa Card de Shadcn */}
      {isOpen && (
        <Card className="absolute z-10 top-12 left-0 w-72 shadow-xl">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">Filtrar</h2>
              <Button variant="link" onClick={onClearFilters} className="p-0">
                Limpiar todo
              </Button>
            </div>

            {/* Sección de Entornos */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 my-2">
                Entorno
              </h3>
              <div className="flex flex-col">
                {entornos.map((entorno) => (
                  <CheckboxItem
                    key={entorno}
                    label={entorno}
                    isChecked={selectedEntornos.includes(entorno)}
                    onChange={() => onEntornoChange(entorno)}
                  />
                ))}
              </div>
            </div>

            {/* MODIFICADO: Separador de Shadcn */}
            <Separator className="my-4" />

            {/* Sección de Niveles */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 my-2">Nivel</h3>
              <div className="flex flex-col">
                {niveles.map((nivel) => (
                  <CheckboxItem
                    key={nivel}
                    label={nivel}
                    isChecked={selectedNiveles.includes(nivel)}
                    onChange={() => onNivelChange(nivel)}
                  />
                ))}
              </div>
            </div>

            {/* MODIFICADO: Botón de Shadcn */}
            <Button onClick={() => setIsOpen(false)} className="mt-4 w-full">
              Aplicar
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
