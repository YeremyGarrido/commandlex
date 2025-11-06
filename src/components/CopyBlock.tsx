"use client";
import { useState } from "react"; // <-- ESTA ES LA LÍNEA CORREGIDA
import { FaCopy, FaCheck } from "react-icons/fa";

interface Props {
  textToCopy: string;
}

export const CopyBlock = ({ textToCopy }: Props) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Resetea después de 2 seg
  };

  return (
    // Este es el contenedor oscuro que se parece al de la foto
    <div className="relative flex items-center rounded-lg bg-gray-900 p-4 dark:bg-gray-950">
      <code className="text-sm text-gray-300 dark:text-gray-400">
        <span className="text-gray-500 mr-2">$</span>
        {textToCopy}
      </code>
      <button
        onClick={handleCopy}
        className="absolute right-3 top-3 p-2 text-gray-400 hover:text-white"
        title="Copiar al portapapeles"
      >
        {isCopied ? <FaCheck className="text-green-400" /> : <FaCopy />}
      </button>
    </div>
  );
};
