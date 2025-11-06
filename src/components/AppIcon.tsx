// src/components/AppIcon.tsx
import {
  FaDocker,
  FaLinux,
  FaGitAlt,
  FaWindows,
  FaFileExcel,
  FaQuestionCircle,
} from "react-icons/fa";
import { SiPowers, SiKubernetes, SiHelm } from "react-icons/si";
// Puedes añadir más iconos aquí

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
    case "kubernetes":
      return <SiKubernetes size={iconSize} className="text-blue-700" />;
    case "helm":
      return <SiHelm size={iconSize} className="text-cyan-500" />;
    // Añade más casos para 'Office General', 'Word', etc.

    default:
      return <FaQuestionCircle size={iconSize} className="text-gray-400" />;
  }
};
