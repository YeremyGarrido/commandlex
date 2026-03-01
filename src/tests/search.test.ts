import { search } from "@/lib/search";
import type { Command } from "@/lib/data";

// Muestra representativa del dataset real con edge cases incluidos
const mockCommands: Command[] = [
  {
    id: "ls",
    comando: "ls",
    descripcion: "Lista archivos y directorios",
    requerimientos: "Ninguno",
    aplicaciones: ["Linux"],
    nivel: "básico",
    tags: ["listar", "archivos"],
    ejemplo: ["ls -la"],
  },
  {
    id: "git-status",
    comando: "git status",
    descripcion: "Muestra el estado del repositorio",
    requerimientos: "Git instalado",
    aplicaciones: ["Git"],
    nivel: "básico",
    tags: ["git", "estado"],
    ejemplo: ["git status"],
  },
  {
    id: "docker-ps",
    comando: "docker ps",
    descripcion: "Lista contenedores activos",
    requerimientos: "Docker instalado",
    aplicaciones: ["Docker"],
    nivel: "intermedio",
    tags: ["docker", "contenedores"],
    ejemplo: ["docker ps", "docker ps -a"],
  },
  {
    id: "aplicaciones-vacias",
    comando: "test-edge",
    descripcion: "Comando sin aplicaciones para probar edge case",
    requerimientos: "Ninguno",
    aplicaciones: [],
    nivel: "avanzado",
    tags: [],
    ejemplo: [],
  },
];

describe("search — caminos felices", () => {
  it("devuelve todos los comandos con query vacío", () => {
    expect(search(mockCommands, "")).toHaveLength(4);
  });

  it("encuentra por nombre exacto", () => {
    const result = search(mockCommands, "git status");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("git-status");
  });

  it("filtra por entorno/aplicación", () => {
    const result = search(mockCommands, "", { entorno: "Linux" });
    expect(result).toHaveLength(1);
    expect(result[0].aplicaciones).toContain("Linux");
  });

  it("filtra por nivel", () => {
    const result = search(mockCommands, "", { nivel: "intermedio" });
    expect(result).toHaveLength(1);
    expect(result[0].nivel).toBe("intermedio");
  });

  it("combina texto y filtro de aplicación", () => {
    const result = search(mockCommands, "docker", { entorno: "Docker" });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("docker-ps");
  });
});

describe("search — normalización de tildes", () => {
  const conTildes: Command[] = [
    {
      id: "aplicacion-tildes",
      comando: "ejemplo",
      descripcion: "Gestión de aplicación con carácter especial",
      requerimientos: "Ninguno",
      aplicaciones: ["Linux"],
      nivel: "básico",
      tags: ["administración"],
      ejemplo: [],
    },
  ];

  it("encuentra sin tildes cuando el campo tiene tildes", () => {
    expect(search(conTildes, "gestion")).toHaveLength(1);
    expect(search(conTildes, "aplicacion")).toHaveLength(1);
    expect(search(conTildes, "caracter")).toHaveLength(1);
  });

  it("encuentra con tildes cuando el campo tiene tildes", () => {
    expect(search(conTildes, "gestión")).toHaveLength(1);
  });

  it("encuentra con tags sin tildes", () => {
    expect(search(conTildes, "administracion")).toHaveLength(1);
  });
});

describe("search — multi-token", () => {
  it("requiere que todos los tokens estén presentes (AND)", () => {
    // "git" y "estado" ambos en el mismo comando
    const r1 = search(mockCommands, "git estado");
    expect(r1).toHaveLength(1);
    expect(r1[0].id).toBe("git-status");
  });

  it("no devuelve nada si un token no coincide", () => {
    expect(search(mockCommands, "git inexistente")).toHaveLength(0);
  });

  it("busca en descripción además del nombre", () => {
    const result = search(mockCommands, "contenedores");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("docker-ps");
  });
});

describe("search — boundary conditions", () => {
  it("query con solo espacios equivale a query vacío", () => {
    expect(search(mockCommands, "   ")).toHaveLength(4);
  });

  it("dataset vacío no lanza excepción", () => {
    expect(search([], "git")).toHaveLength(0);
  });

  it("comando con aplicaciones vacías no rompe el filtro por entorno", () => {
    const result = search(mockCommands, "", { entorno: "Docker" });
    // Solo docker-ps debe coincidir, el edge-case con aplicaciones:[] no debe crashear
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("docker-ps");
  });

  it("query que no coincide devuelve array vacío, no undefined", () => {
    const result = search(mockCommands, "xyzabcnotexist");
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);
  });

  it("busca en tags", () => {
    const result = search(mockCommands, "contenedores");
    expect(result.some((c) => c.id === "docker-ps")).toBe(true);
  });
});

describe("search — con datos reales del dataset", () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const dataset = require("../../public/data/commands.json");
  const realCommands: Command[] = dataset.comandos;

  it("carga el dataset y tiene comandos", () => {
    expect(realCommands.length).toBeGreaterThan(100);
  });

  it("busca 'docker' y devuelve comandos de Docker", () => {
    const result = search(realCommands, "docker");
    expect(result.length).toBeGreaterThan(0);
    result.forEach((c) =>
      expect(
        c.aplicaciones.includes("Docker") ||
          c.descripcion.toLowerCase().includes("docker") ||
          c.tags.includes("docker")
      ).toBe(true)
    );
  });

  it("busca sin tildes 'administracion' y encuentra comandos con 'administración'", () => {
    const result = search(realCommands, "administracion");
    expect(result.length).toBeGreaterThan(0);
  });

  it("filtra por nivel 'avanzado' y todos los resultados son avanzados", () => {
    const result = search(realCommands, "", { nivel: "avanzado" });
    expect(result.length).toBeGreaterThan(0);
    result.forEach((c) => expect(c.nivel).toBe("avanzado"));
  });

  it("filtra por nivel 'teórico' y devuelve el comando de la pirámide", () => {
    const result = search(realCommands, "", { nivel: "teórico" });
    expect(result.length).toBeGreaterThanOrEqual(1);
    expect(result[0].id).toBe("qa-concept-testing-pyramid");
  });
});
