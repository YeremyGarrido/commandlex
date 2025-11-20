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
  SiPowers, // CORREGIDO
  SiCypress,
  // SiPlaywright, // ELIMINADO
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
  FaPlay, // Reemplazo para Playwright
  FaDatabase, // Nuevo para SQL
  FaBug,      // Nuevo para QA General
  FaInfinity, // Nuevo para CI/CD (DevOps loop)
} from "react-icons/fa";

import { 
  TbApi,
  TbRegex // Nuevo para Regex
} from "react-icons/tb";

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

    // --- ICONOS DE QA AUTOMATION & EXTRAS ---

    case "cypress":
      return <SiCypress size={size} className="text-teal-400" aria-hidden="true" />;

    case "playwright":
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

    // --- NUEVOS ICONOS AGREGADOS ---
    
    case "ci/cd":
      return <FaInfinity size={size} className="text-blue-400" aria-hidden="true" />; // Símbolo DevOps
      
    case "qa general":
      return <FaBug size={size} className="text-red-500" aria-hidden="true" />; // Bicho/Bug
      
    case "sql":
      return <FaDatabase size={size} className="text-blue-600" aria-hidden="true" />; // Base de datos
      
    case "regex":
      return <TbRegex size={size} className="text-purple-400" aria-hidden="true" />; // Símbolo Regex

    default:
      return <FaQuestionCircle size={size} className="text-gray-500" aria-hidden="true" />;
  }
};