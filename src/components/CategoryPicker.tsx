"use client";
import React from "react";
import { AppIcon } from "./AppIcon";

interface CategoryPickerProps {
  applications: string[];
  onSelectApp: (app: string) => void;
}

export const CategoryPicker = ({
  applications,
  onSelectApp,
}: CategoryPickerProps) => {
  const appDisplayList = [
    "Git",
    "Docker",
    "PowerShell",
    "cmd",
    "Excel",
    "PowerPoint",
    "Word",
    "Linux",
    "Kubernetes",
    "Helm",
  ];

  const appsToShow = appDisplayList.filter((app) => applications.includes(app));

  return (
    // CAMBIO: de my-12 a my-6 para reducir el espacio vertical
    <div className="animate-fadeIn max-w-3xl mx-auto my-6">
      <h2 className="text-center text-lg font-semibold text-gray-400 mb-8">
        Selecciona una categoría para empezar
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {appsToShow.map((app) => (
          <button
            key={app}
            onClick={() => onSelectApp(app)}
            className="flex flex-col items-center justify-center p-6 bg-gray-800/50 
                       rounded-lg border border-gray-700/50
                       transition-all duration-200
                       hover:border-purple-500 hover:scale-105 hover:bg-gray-800"
            title={`Ver comandos de ${app}`}
          >
            <AppIcon appName={app} size={48} />
            <span className="mt-4 text-sm font-medium text-gray-300">
              {app}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
