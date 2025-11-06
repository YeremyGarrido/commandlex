# CHANGELOG – CommandLex v2.0

**Fecha de publicación:** 2025-11-06  
**Autor:** Yeremy Garrido  
**Repositorio:** [YeremyGarrido/commandlex](https://github.com/YeremyGarrido/commandlex)  
**Versión anterior:** v1.1  
**Versión actual:** v2.0  
**Tipo de actualización:** Rediseño completo (interfaz + lógica de navegación)

---

## Added

### Nuevas características

- Nueva **vista de inicio por categorías** (`CategoryPicker.tsx`) con íconos grandes para cada aplicación.
- Integración de **búsqueda y filtros** mediante parámetros en la URL (`?category=`, `?q=`), permitiendo navegación fluida con el botón “Atrás”.
- Inclusión de **5 nuevos comandos CMD** (`systeminfo`, `netstat`, `tasklist`, `sfc`, `wmic`).
- Soporte de cierre por **tecla ESC** en `CommandModal.tsx`.
- Nueva lógica de **filtrado dinámico** con contadores activos.
- Compatibilidad completa con **GitHub Pages** mediante configuración de `basePath` y `assetPrefix`.
- Añadido ícono de **GitHub** en la cabecera con enlace al repositorio.
- Nuevas **animaciones personalizadas** (fade + translateY) en `tailwind.config.ts`.

---

## Changed

### Cambios de diseño y estructura

- Rediseño completo de la **Hero Section** con menor espaciado vertical y tipografía optimizada.
- Reorganización visual de la **barra de búsqueda** (centrada y con fondo translúcido).
- Reescritura de la lógica de navegación en `page.tsx` usando `useRouter`, `usePathname` y `useSearchParams`.
- El logotipo “CommandLex” ahora funciona como botón **Reset** para volver a la vista de categorías.
- Ajuste del **Popover de filtros** (mejor contraste, z-index y accesibilidad).
- Actualización de `AppIcon.tsx`:
  - Soporte para **DevIcons** (Docker, Linux, Git, Node.js, React, etc.).
  - Inclusión de íconos de **Microsoft Office** (Word, Excel, PowerPoint).
  - Diferenciación visual entre **CMD** y **PowerShell**.
- Reestructuración de `CommandModal.tsx` para mostrar:
  - Ejemplos con bloques copiables (`CopyBlock`).
  - Nivel, requerimientos y tags en formato visual claro.
- Nuevo **estilo visual coherente** con fondo translúcido, sombras suaves y tipografía uniforme.

---

## Fixed

### Errores corregidos

- Solucionado error de **404 en GitHub Pages** causado por rutas absolutas (`/commandlex`).
- Eliminado el parpadeo al cambiar entre categorías y resultados.
- Corregido comportamiento del botón “Atrás” en el navegador.
- Eliminado desbordamiento del Popover sobre las tarjetas.
- Corrigido bug de iconos duplicados en `AppIcon.tsx`.
- Ajustes de compatibilidad para `output: export` y `images.unoptimized` en `next.config.mjs`.

---

## Dataset

### Versión

```json
{
  "dataset": {
    "version": "3.0",
    "updatedAt": "2025-11-06"
  }
}
```

### Total

- **112 comandos**
- **11 aplicaciones soportadas**
- **3 niveles de dificultad**

---

## Resumen técnico

| Área                     | Descripción breve                                                  |
| ------------------------ | ------------------------------------------------------------------ |
| **Frontend**             | Rediseño completo en Next.js 14.2 + TypeScript 5.9                 |
| **Arquitectura**         | Navegación basada en URL params + búsqueda client-side optimizada  |
| **Rendimiento**          | Animaciones ligeras y carga progresiva de componentes              |
| **Accesibilidad (a11y)** | Mejor contraste, foco en teclado y cierre con tecla ESC            |
| **Exportación**          | `next export` + `output: "export"` para despliegue en GitHub Pages |

---

## Próximos pasos (v3.1)

- Internacionalización (ES/EN)
- Filtro por tags dinámico
- Historial de búsqueda
- Persistencia avanzada de configuraciones
- Sincronización opcional de favoritos con GitHub Gists

---

**Licencia:** MIT
**Desarrollado por:** [Yeremy Garrido](https://github.com/YeremyGarrido)
