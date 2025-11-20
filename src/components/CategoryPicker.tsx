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
    // --- Frameworks de Automatización ---
    "Cypress",
    "Playwright",
    "Appium",
    "Cucumber",
    
    // --- Lenguajes y Scripting ---
    "JavaScript",
    "PowerShell",
    "cmd",
    "Linux",
    
    // --- API Testing ---
    "API",
    "Newman",
    "SuperTest",
    
    // --- DevOps & Contenedores ---
    "Git",
    "Docker",
    "Kubernetes",
    "Helm",
    "CI/CD",
    
    // --- Ofimática y Teoría ---
    "Excel",
    "PowerPoint",
    "Word",
    "QA General",
    
    // --- Extras ---
    "SQL",
    "Regex"
  ];

  const appsToShow = appDisplayList.filter((app) => applications.includes(app));

  return (
    <div className="animate-fadeIn max-w-3xl mx-auto my-6">
      <h2 className="text-center text-lg font-semibold text-gray-400 mb-8">
        Selecciona una categoría para empezar
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {appsToShow.map((app) => (
          <button
            key={app}
            onClick={() => onSelectApp(app)}
            className="flex flex-col items-center justify-center p-6 bg-[var(--card)] 
                       rounded-lg border border-[var(--border)]
                       transition-all duration-200
                       hover:border-purple-500 hover:scale-105 hover:bg-[var(--card)]"
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
