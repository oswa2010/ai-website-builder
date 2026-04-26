# RestoPro — AI Website Builder

> Plantilla de sitio web para restaurante profesional · Vite + Tailwind CSS v4 · Diseño 2026

---

## Características

- **Diseño profesional 2026** — Dark premium, glassmorphism, bento grid, gradientes mesh
- **Multi-página** — Home, carta, dashboard, POS, cocina, reservas, facturación, inventario
- **Sin backend** — 100% frontend estático, reservas guardadas en `localStorage`
- **Alpine.js** — Interactividad ligera sin React ni Vue
- **Tailwind CSS v4** — Sistema de diseño moderno con variables CSS
- **Vite 6** — Dev server ultra-rápido y build optimizado
- **GitHub Actions** — Deploy automático a GitHub Pages en cada push
- **Multi-plataforma** — Scripts listos para Vercel, Netlify, Cloudflare Pages

---

## Inicio rápido

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Build de producción
npm run build

# 4. Preview del build
npm run preview
```

---

## Estructura del proyecto

```
ai-website-builder/
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD → GitHub Pages automático
├── public/
│   ├── favicon.ico
│   └── images/
│       └── desserts/           # Imágenes de postres
├── src/
│   └── main.css                # Sistema de diseño (Tailwind + variables)
├── scripts/
│   ├── deploy.sh               # Menú interactivo de despliegue
│   ├── publish-github.sh       # Deploy manual → GitHub Pages
│   ├── publish-cloudflare.sh   # Deploy → Cloudflare Pages
│   ├── publish-netlify.sh      # Deploy → Netlify
│   ├── publish-vercel.sh       # Deploy → Vercel
│   ├── check-placeholders.sh   # Auditoría antes de publicar
│   └── update-vite-base.mjs    # Configuración base path GitHub Pages
├── restaurante/                # Plantilla tema restaurante (portable)
├── skill/                      # Paquete de habilidad AI instalable
├── index.html                  # Página principal (landing)
├── carta-cliente.html          # Carta para el cliente
├── login.html                  # Login del personal
├── register.html               # Registro de usuarios
├── dashboard.html              # Panel admin / ejecutivo
├── pos.html                    # Punto de venta (TPV)
├── billing.html                # Facturación
├── inventory.html              # Gestión de inventario
├── kitchen.html                # Pantalla de cocina (KDS)
├── menu-management.html        # Gestión de menú
├── reservations.html           # Gestión de reservas
├── customers.html              # CRM clientes
├── user-panel.html             # Panel de usuario
├── package.json
├── vite.config.js
└── .gitignore
```

---

## Páginas disponibles

| Ruta | Descripción | Acceso |
|------|-------------|--------|
| `/` | Landing page principal | Público |
| `/carta-cliente.html` | Carta interactiva para clientes | Público |
| `/login.html` | Login del personal | Staff |
| `/register.html` | Registro de cuentas | Admin |
| `/dashboard.html` | Panel de gestión ejecutiva | Admin |
| `/pos.html` | Terminal punto de venta | Staff |
| `/billing.html` | Facturación y cobros | Staff |
| `/inventory.html` | Gestión de inventario | Admin |
| `/kitchen.html` | Pantalla de cocina (KDS) | Cocina |
| `/menu-management.html` | Editor de carta y precios | Admin |
| `/reservations.html` | Gestión de reservas | Staff |
| `/customers.html` | CRM y base de clientes | Admin |
| `/user-panel.html` | Panel personal del usuario | Staff |

---

## Despliegue

### GitHub Pages (automático)
El workflow `.github/workflows/deploy.yml` hace deploy automático en cada push a `main`.

### Manual (una sola línea)

```bash
npm run publish:github    # GitHub Pages
npm run publish:vercel    # Vercel
npm run publish:netlify   # Netlify
npm run publish:cloudflare # Cloudflare Pages
```

### Auditoría pre-publicación
```bash
npm run audit:placeholders
```

---

## Sistema de diseño

El archivo `src/main.css` define el design system completo con variables CSS, componentes y animaciones.

**Componentes disponibles:** `.btn-primary`, `.card`, `.glass`, `.badge`, `.input`, `.gradient-text`, `.sidebar-link`, `.stat-card`, `.animate-fade-up`, `.animate-float`

---

## Stack tecnológico

| Tecnología | Versión | Uso |
|------------|---------|-----|
| Vite | 6.x | Build tool y dev server |
| Tailwind CSS | 4.x | Framework CSS utility-first |
| Alpine.js | 3.14 | Interactividad ligera |
| Node.js | ≥18 | Runtime para build |

---

## Licencia

MIT © 2026 RestoPro
