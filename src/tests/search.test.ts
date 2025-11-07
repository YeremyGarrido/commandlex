import { search } from "@/lib/search";
import type { Command } from "@/lib/search";

const mockCommands: Command[] = [
  {
    id: "ls",
    comando: "ls",
    descripcion: "Lista archivos y directorios",
    requerimientos: "Ninguno",
    aplicaciones: ["Linux"],
    nivel: "básico",
    tags: ["listar", "archivos"],
  },
  {
    id: "git-status",
    comando: "git status",
    descripcion: "Muestra el estado del repositorio",
    requerimientos: "Git instalado",
    aplicaciones: ["Git"],
    nivel: "básico",
    tags: ["git", "estado"],
  },
  {
    id: "docker-ps",
    comando: "docker ps",
    descripcion: "Lista contenedores activos",
    requerimientos: "Docker instalado",
    aplicaciones: ["Docker"],
    nivel: "intermedio",
    tags: ["docker", "contenedores"],
  },
];

describe("search function", () => {
  it("should return all commands when query is empty", () => {
    const result = search(mockCommands, "");
    expect(result).toHaveLength(3);
  });

  it("should find commands by name", () => {
    const result = search(mockCommands, "git");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("git-status");
  });

  it("should filter by environment (aplicaciones)", () => {
    const result = search(mockCommands, "", { entorno: "Linux" });
    expect(result).toHaveLength(1);
    expect(result[0].aplicaciones?.includes("Linux")).toBe(true);
  });

  it("should filter by level", () => {
    const result = search(mockCommands, "", { nivel: "intermedio" });
    expect(result).toHaveLength(1);
    expect(result[0].nivel).toBe("intermedio");
  });

  it("should combine text and filters", () => {
    const result = search(mockCommands, "docker", { entorno: "Docker" });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("docker-ps");
  });
});
