# CommandLex — Changelog v2.0.1

Fecha: 2025-11-07  
Estado: Build estable validada (CI/CD + Tests OK)

---

## Contexto

Versión de mantenimiento centrada en la **estabilización del entorno de testing (Jest + TypeScript)** y la **consolidación del core lógico** de CommandLex tras el rediseño visual y funcional de la versión 2.0.

Esta versión garantiza la ejecución correcta del pipeline de GitHub Actions y la compatibilidad con entornos ESM.

---

## Tests Unitarios

**Estado actual:** 100% de suites exitosas  
PASS src/tests/favs.test.ts
PASS src/tests/Tag.test.tsx
PASS src/tests/search.test.ts

markdown
Copiar código

**Resumen:**

- Total de tests: **15**
- Aprobados: **15**
- Fallidos: **0**
- Snapshots: **0**

---

## Cambios Técnicos Principales

### Core

- Refactor de `src/lib/data.ts`:

  - Estructura dataset v3.0 (niveles, aplicaciones, comandos tipados).
  - Soporte consistente para `aplicaciones[]` en lugar de `entorno`.

- Refactor de `src/lib/search.ts`:

  - Soporte de filtros `{ entorno, nivel }`.
  - Tokenización sin diacríticos y tipado seguro.
  - Aislamiento semántico de `Command` independiente de `data.ts`.

- Implementación completa de `src/lib/favs.ts`:
  - Métodos `getAll()` y `clear()` finalizados.
  - Gestión de favoritos robusta vía `localStorage`.

### Tests

- Actualización completa de las suites:
  - `Tag.test.tsx`: verificación de texto y clases CSS.
  - `Favs.test.ts`: validación de flujo completo CRUD de favoritos.
  - `Search.test.ts`: integración con filtros + búsqueda textual.

### Configuración

- Migración de `jest.config.ts` → `jest.config.cjs`
  - Elimina dependencia `ts-node`.
  - Compatible con módulos ESM (Next.js 14).
- Ajustes en `tsconfig.json` para correcto reconocimiento de rutas y tipado en Jest.
- Workflow CI actualizado (`.github/workflows/deploy.yml`):
  - Linter + Tests ejecutados antes del build.
  - Cacheo de dependencias npm.
  - Validación de salida `./out`.

---

## Resultado

| Aspecto                 | Estado      |
| ----------------------- | ----------- |
| **Build local**         | OK          |
| **Tests Jest**          | 100%        |
| **Deploy GitHub Pages** | OK          |
| **Modo offline (SW)**   | Persistente |
| **Dark mode global**    | Forzado     |

---

## Próximos pasos (v2.1)

- Añadir cobertura (`npm run test:coverage`) al CI/CD.
- Integrar badge de tests en README.
- Implementar test de integración para `CategoryPicker`.
- Mejorar test del SW con `msw` o mock fetch.

---

© 2025 — **CommandLex by Yeremy Garrido**  
MIT License
