import * as favs from "@/lib/favs";

describe("favs — caminos felices", () => {
  beforeEach(() => localStorage.clear());

  it("toggle añade un favorito", () => {
    favs.toggle("ls");
    expect(favs.has("ls")).toBe(true);
  });

  it("toggle dos veces quita el favorito", () => {
    favs.toggle("ls");
    favs.toggle("ls");
    expect(favs.has("ls")).toBe(false);
  });

  it("has devuelve false para ID inexistente", () => {
    expect(favs.has("non-existent")).toBe(false);
  });

  it("get devuelve array vacío sin favoritos", () => {
    expect(favs.get()).toEqual([]);
  });

  it("get devuelve todos los favoritos", () => {
    favs.toggle("ls");
    favs.toggle("git-status");
    favs.toggle("docker-ps");
    const all = favs.get();
    expect(all).toHaveLength(3);
    expect(all).toContain("ls");
    expect(all).toContain("git-status");
    expect(all).toContain("docker-ps");
  });

  it("clear elimina todos los favoritos", () => {
    favs.toggle("ls");
    favs.toggle("git-status");
    favs.clear();
    expect(favs.get()).toHaveLength(0);
  });
});

describe("favs — boundary conditions", () => {
  beforeEach(() => localStorage.clear());

  it("set deduplica IDs repetidos", () => {
    favs.set(["ls", "ls", "git-status", "git-status"]);
    expect(favs.get()).toHaveLength(2);
  });

  it("toggle sobre ID vacío no rompe el estado", () => {
    expect(() => favs.toggle("")).not.toThrow();
    expect(favs.has("")).toBe(true); // string vacío es un ID válido técnicamente
    favs.toggle(""); // quitar
    expect(favs.has("")).toBe(false);
  });

  it("has devuelve false tras clear", () => {
    favs.toggle("ls");
    favs.clear();
    expect(favs.has("ls")).toBe(false);
  });

  it("get con localStorage corrupto devuelve array vacío (no lanza)", () => {
    localStorage.setItem("favs", "INVALID_JSON{{{{");
    expect(() => favs.get()).not.toThrow();
    expect(favs.get()).toEqual([]);
  });

  it("múltiples toggles mantienen consistencia", () => {
    favs.toggle("a");
    favs.toggle("b");
    favs.toggle("a"); // quitar a
    favs.toggle("c");
    const result = favs.get();
    expect(result).toContain("b");
    expect(result).toContain("c");
    expect(result).not.toContain("a");
  });
});
