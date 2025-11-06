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

## Novedades en la Versión 2.0

### Cambios funcionales

- Nueva vista inicial por categorías (`CategoryPicker.tsx`) con íconos grandes y filtrado directo.
- Búsqueda y categorías integradas en la URL (`?category=`, `?q=`) con soporte completo para el botón “Atrás”.
- Reescritura de la lógica de navegación usando `useRouter`, `usePathname` y `useSearchParams`.
- Eliminado el “parpadeo” al alternar entre vistas.
- Filtros avanzados con persistencia temporal y contadores dinámicos.
- Corrección de enlaces 404 en GitHub Pages mediante rutas relativas (`basePath`, `assetPrefix`).
- Dataset ampliado con **5 nuevos comandos CMD** (systeminfo, netstat, tasklist, sfc, wmic).

### Cambios visuales

- Rediseño completo de la Hero Section con espaciado optimizado.
- Barra de búsqueda central más compacta.
- Inclusión de ícono de GitHub en cabecera.
- Popover de filtros rediseñado (tema oscuro, bordes, z-index corregido).
- Nuevas animaciones suaves (fade + translateY).
- Mejora de sombras, márgenes y tipografía.
- Modal de comandos con cierre por tecla **ESC** y layout adaptativo.

### Componentes actualizados

- `AppIcon.tsx` actualizado con soporte para DevIcons, íconos de Office y diferenciación entre CMD y PowerShell.
- Nuevo componente `CategoryPicker.tsx`.
- `CommandModal.tsx` reorganizado para mostrar ejemplos, nivel y tags de forma más clara.
- `tailwind.config.ts` modificado con nuevas animaciones personalizadas.

---

## Dataset v3.0

**112 comandos** organizados en:

### Aplicaciones Soportadas

- **Docker** (21 comandos) - Contenedores, imágenes, redes, volúmenes
- **Linux** (32 comandos) - Comandos básicos, administración de sistema, redes
- **Git** (18 comandos) - Control de versiones, branching, historial
- **PowerShell** (15 comandos) - Administración Windows, scripting
- **CMD** (5 comandos) - Diagnóstico y administración de sistema Windows
- **Excel** (10 comandos) - Atajos y funciones
- **Office General** (4 comandos) - Atajos compartidos entre aplicaciones
- **PowerPoint** (3 comandos) - Atajos específicos de presentaciones
- **Word** (2 comandos) - Edición de documentos
- **Kubernetes** (2 comandos) - Orquestación de contenedores
- **Helm** (1 comando) - Gestor de paquetes K8s

### Niveles de Dificultad

- **Básico** (70 comandos) - Para comenzar
- **Intermedio** (31 comandos) - Uso avanzado
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
│   │   ├── page.tsx           # Página principal con lógica de búsqueda y categorías
│   │   └── globals.css        # Estilos globales + scrollbar
│   ├── components/
│   │   ├── CommandCard.tsx    # Tarjeta de comando
│   │   ├── EmptyState.tsx     # Estado vacío
│   │   ├── SearchBox.tsx      # Caja de búsqueda
│   │   ├── ServiceWorkerProvider.tsx # PWA provider
│   │   ├── CategoryPicker.tsx # Nueva vista por categorías
│   │   ├── CommandModal.tsx   # Modal con soporte para tecla ESC
│   │   ├── AppIcon.tsx        # Íconos de aplicaciones actualizados
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
└── tailwind.config.ts         # Configuración de Tailwind (animaciones y colores)
```

---

## Características de Búsqueda

### Búsqueda Inteligente

- Busca en comando, descripción, aplicaciones, requerimientos y tags
- Sin tildes (busca "aplicacion" o "aplicación", ambos funcionan)
- Tokenización inteligente (busca palabras individuales)
- Resultados instantáneos mientras escribes
- Navegación con parámetros (`?q=`, `?category=`)

### Filtros Multi-selección

- Filtra por múltiples aplicaciones simultáneamente
- Filtra por niveles de dificultad
- Combina filtros con búsqueda de texto
- Contador visual de filtros activos
- Popover rediseñado con tema oscuro

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

4. El sitio se actualiza en 1-2 minutos en [https://yeremygarrido.github.io/commandlex](https://yeremygarrido.github.io/commandlex)

### Deploy Manual (Local)

```bash
npm run build
# Los archivos estáticos quedan en /out
```

---

## Roadmap

### v2.0 (Actual)

- Rediseño total de la interfaz
- Nueva arquitectura de navegación y filtros
- Corrección de errores 404
- Mejoras de rendimiento y accesibilidad
- Integración de comandos CMD

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

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---

## Autor

**Yeremy Garrido**

- GitHub: [@YeremyGarrido](https://github.com/YeremyGarrido)
- Proyecto: [commandlex](https://yeremygarrido.github.io/commandlex)
- Email: [yeremy_neira@hotmail.com](mailto:yeremy_neira@hotmail.com)
