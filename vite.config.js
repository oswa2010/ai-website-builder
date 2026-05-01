import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

/**
 * RestoPro — Vite Configuration
 * Multi-page app (MPA) — every HTML page is a separate entry point.
 * Build: `npm run build`  → dist/
 * Preview: `npm run preview`
 */
export default defineConfig({
  plugins: [tailwindcss()],
  base: './',

  // Root: project root (default)
  root: '.',

  // Public assets served from /public/
  publicDir: 'public',

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // Asset file names with content hash for cache busting
    assetsDir: 'assets',
    // Multi-page entries
    rollupOptions: {
      input: {
        // Main site
        main:             resolve(__dirname, 'index.html'),
        // Customer-facing
        'carta-cliente':  resolve(__dirname, 'carta-cliente.html'),
        // Staff / admin
        login:            resolve(__dirname, 'login.html'),
        register:         resolve(__dirname, 'register.html'),
        dashboard:        resolve(__dirname, 'dashboard.html'),
        pos:              resolve(__dirname, 'pos.html'),
        billing:          resolve(__dirname, 'billing.html'),
        inventory:        resolve(__dirname, 'inventory.html'),
        kitchen:          resolve(__dirname, 'kitchen.html'),
        'menu-management': resolve(__dirname, 'menu-management.html'),
        reservations:     resolve(__dirname, 'reservations.html'),
        customers:        resolve(__dirname, 'customers.html'),
        crm:              resolve(__dirname, 'crm.html'),
        'user-panel':     resolve(__dirname, 'user-panel.html'),
      },
    },
  },

  server: {
    port: 5173,
    open: true,  // auto-open browser on `npm run dev`
  },

  preview: {
    port: 4173,
  },
})
