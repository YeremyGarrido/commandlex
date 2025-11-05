# CommandLex

> Catálogo de comandos offline-first para desarrolladores

[![Deploy](https://github.com/YeremyGarrido/commandlex/actions/workflows/deploy.yml/badge.svg)](https://github.com/YeremyGarrido/commandlex/actions/workflows/deploy.yml)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

**[Ver Demo en Vivo](https://yeremygarrido.github.io/commandlex)**

---

## Características

- **Búsqueda en tiempo real** - Encuentra comandos instantáneamente
- **Sistema de favoritos** - Guarda tus comandos más usados
- **Dark mode** - Soporte para modo oscuro
- **Responsive** - Funciona en móviles, tablets y desktop
- **Offline-first** - Service Worker para uso sin conexión
- **Rápido** - Static export optimizado
- **Filtros inteligentes** - Por entorno y nivel de dificultad

---

## Tecnologías

- **Framework:** Next.js 14 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Deploy:** GitHub Pages + GitHub Actions
- **PWA:** Service Worker para offline

---

## Instalación y Desarrollo

### Prerrequisitos

- Node.js 20+ 
- npm o yarn

### Clonar e instalar

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
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # Verificar código con ESLint
```

---

## Estructura del Proyecto

```
commandlex/
├── public/
│   ├── data/
│   │   └── commands.json      # Dataset de comandos
│   ├── icons/                 # Iconos PWA
│   ├── manifest.json          # Manifest PWA
│   └── sw.js                  # Service Worker
├── src/
│   ├── app/
│   │   ├── detalle/[id]/      # Página de detalle
│   │   ├── favoritos/         # Página de favoritos
│   │   ├── layout.tsx         # Layout raíz
│   │   └── page.tsx           # Página principal
│   ├── components/
│   │   ├── CommandCard.tsx    # Tarjeta de comando
│   │   ├── EmptyState.tsx     # Estado vacío
│   │   ├── SearchBox.tsx      # Caja de búsqueda
│   │   ├── ServiceWorkerProvider.tsx
│   │   └── Tag.tsx            # Etiquetas
│   └── lib/
│       ├── data.ts            # Carga de dataset
│       ├── favs.ts            # Gestión de favoritos
│       └── search.ts          # Lógica de búsqueda
└── .github/workflows/
    └── deploy.yml             # CI/CD automático
```

---

## Agregar Nuevos Comandos

Edita el archivo `public/data/commands.json`:

```json
{
  "comandos": [
    {
      "id": "tu-comando",
      "comando": "nombre del comando",
      "entorno": "Linux",
      "nivel": "básico",
      "descripcion": "Descripción del comando",
      "ejemplo": ["ejemplo 1", "ejemplo 2"],
      "requerimientos": "Ninguno",
      "tags": ["tag1", "tag2"]
    }
  ]
}
```

**Entornos disponibles:** `Linux`, `PowerShell`, `Git`, `Docker`  
**Niveles disponibles:** `básico`, `intermedio`, `avanzado`

---

## Deploy

El proyecto usa GitHub Actions para deploy automático:

1. Haz cambios en tu código
2. Commit y push a `main`:
   ```bash
   git add .
   git commit -m "feat: tu cambio"
   git push origin main
   ```
3. GitHub Actions hace build y deploy automático
4. El sitio se actualiza en 1-2 minutos

---

## Contribuir

Las contribuciones son bienvenidas! Si quieres agregar comandos, mejorar la UI, o arreglar bugs:

1. Fork el proyecto
2. Crea una rama: `git checkout -b feature/nueva-feature`
3. Commit: `git commit -m "feat: descripción"`
4. Push: `git push origin feature/nueva-feature`
5. Abre un Pull Request

---

## Roadmap

- [ ] Más comandos (Linux, Docker, PowerShell)
- [ ] Exportar/Importar favoritos
- [ ] Compartir enlaces a comandos específicos
- [ ] Categorías y subcategorías
- [ ] Modo de comparación de comandos
- [ ] API para integraciones
- [ ] Sistema de votación de comandos útiles

---

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

## Autor

**Yeremy Garrido**

- GitHub: [@YeremyGarrido](https://github.com/YeremyGarrido)
- Sitio: [commandlex](https://yeremygarrido.github.io/commandlex)

---

## Agradecimientos

- Next.js por el increíble framework
- Vercel por la documentación
- Tailwind CSS por el sistema de estilos

---

<div align="center">
  <strong>Si este proyecto te fue útil, considera darle una estrella</strong>
</div>
