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
import { SiKubernetes, SiHelm, SiPowers } from "react-icons/si";
import {
  FaFileExcel,
  FaFileWord,
  FaFilePowerpoint,
  FaQuestionCircle,
} from "react-icons/fa";

interface Props {
  appName: string;
  size?: number;
}

export const AppIcon = ({ appName, size = 24 }: Props) => {
  const app = appName?.toLowerCase() || "default";

  switch (app) {
    case "docker":
      return <DiDocker size={size} className="text-sky-500" />;
    case "linux":
      return <DiLinux size={size} className="text-gray-300" />;
    case "git":
      return <DiGit size={size} className="text-orange-500" />;
    case "windows":
      return <DiWindows size={size} className="text-blue-400" />;

    case "cmd":
    case "terminal":
      return <DiTerminal size={size} className="text-cyan-400" />;
    case "powershell":
      return <SiPowers size={size} className="text-sky-400" />;

    case "node":
    case "nodejs":
      return <DiNodejsSmall size={size} className="text-green-500" />;
    case "react":
      return <DiReact size={size} className="text-sky-400" />;
    case "mongodb":
      return <DiMongodb size={size} className="text-green-500" />;
    case "mysql":
      return <DiMysql size={size} className="text-blue-500" />;
    case "python":
      return <DiPython size={size} className="text-yellow-400" />;
    case "android":
      return <DiAndroid size={size} className="text-green-600" />;

    case "kubernetes":
      return <SiKubernetes size={size} className="text-blue-500" />;
    case "helm":
      return <SiHelm size={size} className="text-cyan-400" />;

    case "html":
      return <DiHtml5 size={size} className="text-orange-400" />;
    case "css":
      return <DiCss3 size={size} className="text-blue-500" />;
    case "javascript":
    case "js":
      return <DiJavascript1 size={size} className="text-yellow-400" />;

    case "excel":
      return <FaFileExcel size={size} className="text-green-600" />;
    case "word":
      return <FaFileWord size={size} className="text-blue-700" />;
    case "powerpoint":
      return <FaFilePowerpoint size={size} className="text-orange-600" />;

    default:
      return <FaQuestionCircle size={size} className="text-gray-500" />;
  }
};
