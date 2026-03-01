"use client";

import { useMemo } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { type Command } from "@/lib/data";
import { search } from "@/lib/search";

interface UseCommandFilterReturn {
  // Datos derivados
  aplicaciones: string[];
  filteredCommands: readonly Command[];
  showCards: boolean;
  // Valores actuales
  searchTerm: string;
  selectedCategory: string;
  // Handlers
  handleSearch: (value: string) => void;
  handleCategorySelect: (category: string) => void;
  resetView: () => void;
}

export function useCommandFilter(allCommands: readonly Command[]): UseCommandFilterReturn {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedCategory = searchParams.get("category") ?? "";
  const searchTerm = searchParams.get("q") ?? "";

  const aplicaciones = useMemo(() => {
    const apps = new Set<string>();
    allCommands.forEach((cmd) => cmd.aplicaciones.forEach((a) => apps.add(a)));
    return Array.from(apps).sort();
  }, [allCommands]);

  const filteredCommands = useMemo(() => {
    let result = allCommands;

    if (selectedCategory) {
      result = result.filter((cmd) =>
        cmd.aplicaciones.includes(selectedCategory)
      );
    }
    if (searchTerm) {
      result = search(result, searchTerm);
    }

    return result;
  }, [allCommands, searchTerm, selectedCategory]);

  const showCards = !!selectedCategory || !!searchTerm;

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("q", value);
      params.delete("category");
    } else {
      params.delete("q");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleCategorySelect = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    params.delete("q");
    router.push(`${pathname}?${params.toString()}`);
  };

  const resetView = () => {
    router.push(pathname);
  };

  return {
    aplicaciones,
    filteredCommands,
    showCards,
    searchTerm,
    selectedCategory,
    handleSearch,
    handleCategorySelect,
    resetView,
  };
}
