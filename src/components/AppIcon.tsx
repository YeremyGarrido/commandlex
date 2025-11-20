"use client";
import React from "react";
import {
  DiDocker,
  DiLinux,
  DiGit,
  DiWindows,
  DiTerminal,
  DiNodejsSmall,
  DiMongodb,
  DiMysql,
  DiHtml5,
  DiCss3,
  DiJavascript1,
  DiReact,
  DiPython,
  DiAndroid,
} from "react-icons/di";

import {
  SiKubernetes,
  SiHelm,
  SiPowers, // CORREGIDO: Usamos el que te funciona a ti
  SiCypress,
  // SiPlaywright, // ELIMINADO: No existe en tu versión
  SiPostman,
  SiCucumber,
  SiAppium,
} from "react-icons/si";

import {
  FaFileExcel,
  FaFileWord,
  FaFilePowerpoint,
  FaQuestionCircle,
  FaFlask,
  FaPlay, // AGREGADO: Reemplazo temporal para Playwright
} from "react-icons/fa";

import { TbApi } from "react-icons/tb";

interface Props {
  appName: string;
  size?: number;
}

export const AppIcon = ({ appName, size = 24 }: Props) => {
  const app = appName?.toLowerCase() || "default";

  switch (app) {
    // --- TUS ICONOS EXISTENTES ---
    case "docker":
      return <DiDocker size={size} className="text-sky-500" aria-hidden="true" />;
    case "linux":
      return <DiLinux size={size} className="text-gray-300" aria-hidden="true" />;
    case "git":
      return <DiGit size={size} className="text-orange-500" aria-hidden="true" />;
    case "windows":
      return <DiWindows size={size} className="text-blue-400" aria-hidden="true" />;

    case "cmd":
    case "terminal":
      return <DiTerminal size={size} className="text-cyan-400" aria-hidden="true" />;
    case "powershell":
      // Usamos SiPowers como indicaste
      return <SiPowers size={size} className="text-sky-400" aria-hidden="true" />;

    case "node":
    case "nodejs":
      return <DiNodejsSmall size={size} className="text-green-500" aria-hidden="true" />;
    case "react":
      return <DiReact size={size} className="text-sky-400" aria-hidden="true" />;
    case "mongodb":
      return <DiMongodb size={size} className="text-green-500" aria-hidden="true" />;
    case "mysql":
      return <DiMysql size={size} className="text-blue-500" aria-hidden="true" />;
    case "python":
      return <DiPython size={size} className="text-yellow-400" aria-hidden="true" />;
    case "android":
      return <DiAndroid size={size} className="text-green-600" aria-hidden="true" />;

    case "kubernetes":
      return <SiKubernetes size={size} className="text-blue-500" aria-hidden="true" />;
    case "helm":
      return <SiHelm size={size} className="text-cyan-400" aria-hidden="true" />;

    case "html":
      return <DiHtml5 size={size} className="text-orange-400" aria-hidden="true" />;
    case "css":
      return <DiCss3 size={size} className="text-blue-500" aria-hidden="true" />;
    case "javascript":
    case "js":
      return <DiJavascript1 size={size} className="text-yellow-400" aria-hidden="true" />;

    case "excel":
      return <FaFileExcel size={size} className="text-green-600" aria-hidden="true" />;
    case "word":
      return <FaFileWord size={size} className="text-blue-700" aria-hidden="true" />;
    case "powerpoint":
      return <FaFilePowerpoint size={size} className="text-orange-600" aria-hidden="true" />;

    // --- NUEVOS ICONOS DE QA AUTOMATION ---

    case "cypress":
      return <SiCypress size={size} className="text-teal-400" aria-hidden="true" />;

    case "playwright":
      // Usamos FaPlay (verde) porque SiPlaywright no existe en tu versión
      return <FaPlay size={size} className="text-green-500" aria-hidden="true" />;

    case "newman":
      return <SiPostman size={size} className="text-orange-500" aria-hidden="true" />;

    case "cucumber":
      return <SiCucumber size={size} className="text-green-500" aria-hidden="true" />;

    case "appium":
      return <SiAppium size={size} className="text-purple-600" aria-hidden="true" />;

    case "supertest":
      return <FaFlask size={size} className="text-pink-500" aria-hidden="true" />;

    case "api":
      return <TbApi size={size} className="text-yellow-400" aria-hidden="true" />;

    default:
      return <FaQuestionCircle size={size} className="text-gray-500" aria-hidden="true" />;
  }
};
