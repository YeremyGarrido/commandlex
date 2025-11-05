# CommandLex

> Catálogo inteligente de comandos con búsqueda offline-first

[![Deploy](https://github.com/YeremyGarrido/commandlex/actions/workflows/deploy.yml/badge.svg)](https://github.com/YeremyGarrido/commandlex/actions/workflows/deploy.yml)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

**[ Ver Demo en Vivo](https://yeremygarrido.github.io/commandlex)**

---

## Características

- **Búsqueda inteligente en tiempo real** - Encuentra comandos por nombre, descripción, aplicación o tags
- **Filtros multi-selección** - Filtra por múltiples aplicaciones y niveles simultáneamente
- **Sistema de favoritos** - Guarda tus comandos más usados con persistencia local
- **Modo oscuro** - Interfaz adaptable con soporte nativo para dark mode
- **100% Responsive** - Funciona perfectamente en móviles, tablets y desktop
- **Offline-first** - Service Worker para uso sin conexión a internet
- **PWA ready** - Instalable como aplicación nativa
- **Ultra rápido** - Static export optimizado, sin servidor necesario

---

## Dataset v3.0

**107 comandos** organizados en:

### Aplicaciones Soportadas

- **Docker** (21 comandos) - Contenedores, imágenes, redes, volúmenes
- **Linux** (32 comandos) - Comandos básicos, administración de sistema, redes
- **Git** (18 comandos) - Control de versiones, branching, historial
- **PowerShell** (15 comandos) - Administración Windows, scripting
- **Excel** (10 comandos) - Atajos y funciones
- **Office General** (4 comandos) - Atajos compartidos entre aplicaciones
- **PowerPoint** (3 comandos) - Atajos específicos de presentaciones
- **Word** (2 comandos) - Edición de documentos
- **Kubernetes** (2 comandos) - Orquestación de contenedores
- **Helm** (1 comando) - Gestor de paquetes K8s

### Niveles de Dificultad

- **Básico** (66 comandos) - Para comenzar
- **Intermedio** (30 comandos) - Uso avanzado
- **Avanzado** (11 comandos) - Para expertos

---

## Instalación y Desarrollo

### Prerrequisitos

- Node.js 20+
- npm o yarn

### Inicio Rápido

```bash
# Clonar repositorio
git clone https://github.com/YeremyGarrido/commandlex.git
cd commandlex

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo con hot-reload
npm run build        # Build de producción
npm run start        # Servidor de producción (requiere build)
npm run lint         # Verificar código con ESLint
npm run test         # Ejecutar tests con Jest
npm run test:watch   # Tests en modo watch
npm run test:coverage # Coverage de tests
```

---

## Estructura del Proyecto

```
commandlex/
├── public/
│   ├── data/
│   │   └── commands.json      # Dataset de comandos (v3.0)
│   ├── icons/                 # Iconos PWA
│   ├── manifest.json          # Manifest PWA
│   ├── sw.js                  # Service Worker
│   └── .nojekyll              # Desactiva Jekyll en GitHub Pages
├── src/
│   ├── app/
│   │   ├── detalle/[id]/      # Página de detalle dinámico
│   │   ├── favoritos/         # Página de favoritos
│   │   ├── layout.tsx         # Layout raíz con navegación
│   │   ├── page.tsx           # Página principal con filtros
│   │   └── globals.css        # Estilos globales + scrollbar
│   ├── components/
│   │   ├── CommandCard.tsx    # Tarjeta de comando
│   │   ├── EmptyState.tsx     # Estado vacío
│   │   ├── SearchBox.tsx      # Caja de búsqueda
│   │   ├── ServiceWorkerProvider.tsx # PWA provider
│   │   └── Tag.tsx            # Etiquetas de comandos
│   ├── lib/
│   │   ├── data.ts            # Carga de dataset y tipos
│   │   ├── favs.ts            # Gestión de favoritos (localStorage)
│   │   └── search.ts          # Motor de búsqueda
│   └── tests/                 # Tests unitarios
│       ├── search.test.ts
│       ├── favs.test.ts
│       └── Tag.test.tsx
├── .github/workflows/
│   └── deploy.yml             # CI/CD automático
├── jest.config.ts             # Configuración de Jest
├── jest.setup.ts              # Setup de Testing Library
└── tailwind.config.ts         # Configuración de Tailwind
```

---

## Agregar Nuevos Comandos

Edita el archivo `public/data/commands.json`:

```json
{
  "dataset": {
    "version": "3.0",
    "updatedAt": "2025-11-05"
  },
  "niveles": ["básico", "intermedio", "avanzado"],
  "comandos": [
    {
      "id": "mi-comando",
      "comando": "nombre del comando",
      "aplicaciones": ["Linux", "macOS"],
      "nivel": "básico",
      "descripcion": "Descripción clara del comando",
      "ejemplo": ["ejemplo 1", "ejemplo 2 con opciones"],
      "requerimientos": "Software necesario o permisos",
      "tags": ["tag1", "tag2", "tag3"]
    }
  ]
}
```

### Campos Requeridos

| Campo            | Tipo     | Descripción                          |
| ---------------- | -------- | ------------------------------------ |
| `id`             | string   | Identificador único (kebab-case)     |
| `comando`        | string   | Nombre del comando o atajo           |
| `aplicaciones`   | string[] | Array de aplicaciones donde funciona |
| `nivel`          | string   | básico, intermedio o avanzado        |
| `descripcion`    | string   | Descripción clara y concisa          |
| `ejemplo`        | string[] | Array de ejemplos de uso             |
| `requerimientos` | string   | Software o permisos necesarios       |
| `tags`           | string[] | Palabras clave para búsqueda         |

### Aplicaciones Disponibles

`Docker`, `Linux`, `Git`, `PowerShell`, `Excel`, `Office General`, `PowerPoint`, `Word`, `Kubernetes`, `Helm`

**Nota:** Un comando puede pertenecer a múltiples aplicaciones (ej: `Ctrl+C` funciona en Excel, Word y Office General).

---

## Características de Búsqueda

### Búsqueda Inteligente

- Busca en comando, descripción, aplicaciones, requerimientos y tags
- Sin tildes (busca "aplicacion" o "aplicación", ambos funcionan)
- Tokenización inteligente (busca palabras individuales)
- Resultados instantáneos mientras escribes

### Filtros Multi-selección

- Filtra por múltiples aplicaciones simultáneamente
- Filtra por niveles de dificultad
- Combina filtros con búsqueda de texto
- Contador visual de filtros activos
- Popover con checkboxes intuitivo

---

## Deploy

El proyecto usa GitHub Actions para deploy automático:

### Deploy Automático

1. Haz cambios en tu código
2. Commit con mensaje descriptivo:
   ```bash
   git add .
   git commit -m "feat: descripción del cambio"
   git push origin main
   ```
3. GitHub Actions ejecuta automáticamente:
   - Instala dependencias
   - Ejecuta build de Next.js
   - Despliega a rama `gh-pages`
4. El sitio se actualiza en 1-2 minutos en https://yeremygarrido.github.io/commandlex

### Deploy Manual (Local)

```bash
npm run build
# Los archivos estáticos quedan en /out
```

---

## Testing

### Ejecutar Tests

```bash
npm test              # Ejecuta todos los tests
npm run test:watch    # Modo watch (desarrollo)
npm run test:coverage # Reporte de cobertura
```

### Tests Incluidos

- `search.test.ts` - Tests del motor de búsqueda
- `favs.test.ts` - Tests de sistema de favoritos
- `Tag.test.tsx` - Tests de componente Tag

---

## Tecnologías

### Core

- **Next.js 14** - Framework React con App Router
- **TypeScript 5.9** - Tipado estático
- **React 18** - Biblioteca UI

### Estilos

- **Tailwind CSS 3.4** - Utility-first CSS
- **@tailwindcss/forms** - Estilos de formularios

### Testing

- **Jest 30** - Framework de testing
- **Testing Library** - Testing de componentes React

### Herramientas

- **ESLint** - Linter de código
- **PostCSS** - Procesador CSS

---

## Contribuir

Las contribuciones son bienvenidas! Aquí está cómo puedes ayudar:

### Agregar Comandos

1. Edita `public/data/commands.json`
2. Sigue la estructura documentada arriba
3. Asegúrate de que el JSON sea válido
4. Haz PR con tus cambios

### Mejorar el Código

1. Fork el proyecto
2. Crea una rama: `git checkout -b feature/nueva-feature`
3. Haz tus cambios con commits descriptivos
4. Ejecuta `npm run lint` y `npm test`
5. Push: `git push origin feature/nueva-feature`
6. Abre un Pull Request

### Reportar Bugs

Usa los [GitHub Issues](https://github.com/YeremyGarrido/commandlex/issues) con:

- Descripción clara del problema
- Pasos para reproducir
- Comportamiento esperado vs actual
- Screenshots si aplica

---

## Roadmap

### v3.1 (Próximo)

- [ ] Agregar más comandos de Kubernetes y Helm
- [ ] Filtro por tags dinámico
- [ ] Historial de búsquedas

### v4.0 (Futuro)

- [ ] Exportar/Importar favoritos como JSON
- [ ] Compartir enlaces a comandos específicos
- [ ] Modo de comparación de comandos
- [ ] API REST para integraciones
- [ ] Sistema de votación de comandos útiles
- [ ] Comentarios y ejemplos de usuarios
- [ ] Sincronización con GitHub Gists
- [ ] Comandos personalizados del usuario

---

## Estadísticas del Proyecto

- **107 comandos** en el dataset
- **10 aplicaciones** soportadas
- **3 niveles** de dificultad
- **0 vulnerabilidades** de seguridad
- **PWA score: 100** (Lighthouse)
- **Offline-first** con Service Worker

---

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

Esto significa que puedes:

- Usar comercialmente
- Modificar
- Distribuir
- Uso privado

---

## Autor

**Yeremy Garrido**

- GitHub: [@YeremyGarrido](https://github.com/YeremyGarrido)
- Proyecto: [commandlex](https://yeremygarrido.github.io/commandlex)
- Email: yeremy_neira@hotmail.com

---

## Agradecimientos

- **Next.js** por el framework
- **Tailwind CSS** por el sistema de estilos
- **La comunidad open source** por las herramientas y soporte

---

## Recursos Adicionales

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [GitHub Pages Docs](https://docs.github.com/en/pages)

---

<div align="center">
  
  **Si este proyecto te fue útil, considera darle una estrella en GitHub**
  
  [Reportar Bug](https://github.com/YeremyGarrido/commandlex/issues) · [Solicitar Feature](https://github.com/YeremyGarrido/commandlex/issues) · [Ver Demo](https://yeremygarrido.github.io/commandlex)
  
</div>
