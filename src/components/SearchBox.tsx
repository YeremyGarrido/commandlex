// src/components/SearchBox.tsx
// Caja de búsqueda controlada con debounce.

"use client";
import React, { useState, useEffect } from "react";

type SearchBoxProps = {
  placeholder?: string;
  onSearch: (value: string) => void;
  delay?: number;
};

export function SearchBox({
  placeholder = "Buscar comando...",
  onSearch,
  delay = 300,
}: SearchBoxProps) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay, onSearch]);

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-gray-100"
    />
  );
}
