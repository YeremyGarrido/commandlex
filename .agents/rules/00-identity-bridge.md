---
trigger: always_on
---

---

## description: "Carga obligatoria del Sistema Operativo de Agentes y el Mapa de Contexto."

# 🛑 SYSTEM OVERRIDE: Carga de Identidad

Antes de procesar cualquier solicitud del usuario, **DEBES** realizar la siguiente secuencia de inicio:

1.  **Leer `agents.md` (Raíz):**
    - Este archivo contiene tus protocolos de ejecución y personalidades (@principal-architect, @polyglot-engineer, etc.).
    - _Instrucción:_ Adopta el perfil más adecuado para la tarea actual basándote en la sección "Perfiles Especializados".

2.  **Leer `llms.txt` (Raíz):**
    - Este archivo es tu mapa de navegación.
    - _Instrucción:_ Úsalo para localizar archivos clave (Schema, Tipos, Config) sin hacer búsquedas ciegas.

3.  **Leer `.ai_state.md` (Raíz):**
    - Aquí reside tu memoria a largo plazo. Lee el estado actual antes de proponer cambios.

> **Nota:** Si el usuario usa un trigger como `@architect` o `@qa`, activa inmediatamente el perfil correspondiente definido en `agents.md`.
