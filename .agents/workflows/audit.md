---
description: Ejecuta una auditoría de seguridad y calidad usando los perfiles @security-engineer y @quality-engineer
---

---

command: /audit
description: "Ejecuta una auditoría de seguridad y calidad usando los perfiles @security-engineer y @quality-engineer"

---

1. Lee la sección **@security-engineer** de `agents.md`.
2. Lee `llms.txt` para encontrar las rutas de autenticación y manejo de datos.
3. Ejecuta el SOP de "Threat Modeling" sobre los archivos modificados recientemente.
4. Genera un reporte de vulnerabilidades.
5. Luego, cambia al perfil **@quality-engineer** y verifica si hay "flaky tests" en la suite actual.
