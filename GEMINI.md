# GEMINI.md

## Project Overview
**ai-website-builder** is a specialized environment designed for building and updating static websites through natural language interaction with AI agents. It targets non-technical users, offering a "no-coding-required" experience by leveraging a pre-configured Vite + Tailwind CSS stack.

### Key Technologies
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (using `@tailwindcss/vite` plugin)
- **Interactivity:** [Alpine.js](https://alpinejs.dev/) (loaded via CDN in HTML)
- **Deployment:** Custom shell scripts for GitHub Pages, Cloudflare, Netlify, and Vercel.

### Architecture & Design
The project follows a multi-page static site architecture.
- **Templates:** Base HTML files in the root (e.g., `index.html`, `billing.html`) and themed subdirectories (e.g., `restaurante/`).
- **Styles:** Tailwind classes are applied **inline in HTML**. The `src/main.css` file is reserved for base imports and should not be modified for specific page styles.
- **Assets:** Managed via the `public/` directory (e.g., `/public/images/`).
- **Skill Integration:** The `skill/` directory contains specialized instructions and resources for AI assistants (Claude, Gemini, Codex).

---

## Building and Running

### Development
Users are expected to run the preview server in a separate terminal.
```bash
npm run dev
```
The preview will be available at `http://localhost:5173`.

### Production Build
```bash
npm run build
```
This generates a production-ready `dist/` directory.

### Deployment
Deployment is handled through interactive or targeted scripts:
- **Interactive Menu:** `npm run deploy`
- **GitHub Pages:** `npm run publish:github`
- **Cloudflare:** `npm run publish:cloudflare`
- **Netlify:** `npm run publish:netlify`
- **Vercel:** `npm run publish:vercel`

---

## Development Conventions

### Guardrails for AI Agents
- **Editable Files:** `*.html` files in root or subdirectories, assets under `public/**`.
- **Restricted Files:** Do NOT edit `setup-guide.html`, `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `README.md`, `setup.sh`, or `QUICK_REFERENCE.txt`.
- **Styling:** Use Tailwind utility classes directly in HTML. Do not modify `src/main.css`.
- **Interactivity:** Use Alpine.js for simple logic (reservations, form handling, UI toggles).

### Core Workflow
1. **Inventory First:** Before using placeholder images, scan `public/images/` for existing assets.
2. **Atomic Changes:** Apply changes one section or feature at a time.
3. **Multi-page Consistency:** When creating new pages, duplicate the `index.html` scaffold to keep navigation, footers, and meta tags in sync.
4. **Safety Audits:** Before publishing, run `scripts/check-placeholders.sh` or search for `[...]`, `lorem ipsum`, and `yourwebsite.com`.

### Tone & Communication
- Use plain language (e.g., "save" instead of "commit", "publish" instead of "deploy").
- Propose a clear plan (2-4 bullets) before applying changes.
- Summarize changes and point the user to the preview after execution.

---

## Important Files
- `package.json`: Script definitions and dependencies.
- `vite.config.js`: Vite configuration with Tailwind plugin.
- `AGENTS.md`: Detailed behavioral and safety mandates for AI assistants.
- `scripts/`: Automation for validation and multi-platform publishing.
- `restaurante/`: A complete themed template example.
