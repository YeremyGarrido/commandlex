// src/components/AppIcon.tsx
import {
  FaDocker,
  FaLinux,
  FaGitAlt,
  FaWindows,
  FaFileExcel,
  FaFileWord,          // Ícono de Word (Archivo)
  FaFilePowerpoint,    // Ícono de PowerPoint (Archivo)
  FaQuestionCircle,
} from "react-icons/fa";
import { SiPowers, SiKubernetes, SiHelm } from "react-icons/si";
import React from "react"; // Siempre se recomienda importar React

interface Props {
  appName: string;
}

export const AppIcon = ({ appName }: Props) => {
  const iconSize = 24; // Ajusta el tamaño a tu gusto

  // Normalizamos el nombre para el switch
  const app = appName?.toLowerCase() || "default";

  switch (app) {
    case "docker":
      return <FaDocker size={iconSize} className="text-blue-500" />;
    case "linux":
      return (
        <FaLinux size={iconSize} className="text-gray-700 dark:text-gray-300" />
      );
    case "git":
      return <FaGitAlt size={iconSize} className="text-red-500" />;
    case "powershell":
      return <SiPowers size={iconSize} className="text-blue-600" />;
    case "windows":
      return <FaWindows size={iconSize} className="text-blue-400" />;
    case "excel":
      return <FaFileExcel size={iconSize} className="text-green-600" />;
    case "word": // Mapea a FaFileWord
      return <FaFileWord size={iconSize} className="text-blue-700" />;
    case "powerpoint": // Mapea a FaFilePowerpoint
      return <FaFilePowerpoint size={iconSize} className="text-red-600" />;
    case "office general": // Caso para Office General (se usa el ícono de Windows/Microsoft o uno genérico)
        return <FaWindows size={iconSize} className="text-gray-400" />; 
    case "kubernetes":
      return <SiKubernetes size={iconSize} className="text-blue-700" />;
    case "helm":
      return <SiHelm size={iconSize} className="text-cyan-500" />;

    default:
      return <FaQuestionCircle size={iconSize} className="text-gray-400" />;
  }
};