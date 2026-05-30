# shadcn-skill-design-starter

A **Next.js (App Router)** starter for translating **Figma** designs into production UI with strict 1:1 fidelity, built on **shadcn/ui** + **Tailwind CSS v4** and driven by Figma-exported design tokens. It ships with a custom Claude Code skill (`shadcn-ui-design`) that enforces the build workflow, semantic-token-only styling, and the shadcn CLI conventions.

## 🤔 What is this?

A token-driven UI system wired for AI-assisted, design-faithful development:

- 🎨 **Design tokens first** — 1788 Figma-exported variables mapped to semantic tokens (`--primary`, `--muted-foreground`, …) in `app/globals.css` via Tailwind v4's `@theme inline`. No `tailwind.config.ts`.
- 🧩 **shadcn/ui (new-york)** — components installed via the CLI into `components/ui/`, never hand-written.
- 🤖 **Claude Code skill** — `.claude/skills/shadcn-ui-design/` encodes the Figma → code workflow, hard rules, and recipes so any agent builds consistently.
- 🖼️ **Figma MCP** — read layout, spacing, typography, fills, and variables straight from the design source; validate against screenshots.
- 🌗 **Theming** — `next-themes` + a theme toggle, with semantic tokens for light/dark.

## 🧱 Tech stack

- **Framework:** Next.js `^15.1.6` (App Router) · React `^19` · TypeScript `^5.7`
- **Styling:** Tailwind CSS `^4.0` — tokens via `@theme inline` in `app/globals.css`
- **UI library:** shadcn/ui (style `new-york`, base color `neutral`, CSS variables)
- **Icons:** lucide-react
- **Utilities:** `clsx` + `tailwind-merge` via `cn()`, `class-variance-authority`, `tw-animate-css`
- **Theme:** next-themes
- **Design source:** Figma (live via the Figma MCP server) + token export in `references/DESIGN.md`
- **Package manager:** npm

## 📁 Project structure

```
CLAUDE.md                  ← project entry, loaded every Claude Code session
package.json               ← npm scripts & deps (Next 15 · React 19 · Tailwind v4)
components.json            ← shadcn config (style new-york · base neutral · CSS vars)
tsconfig.json              ← "@/*" path alias → project root
app/
  layout.tsx               ← root layout (Inter font + Providers)
  page.tsx                 ← home (token swatch demo)
  providers.tsx            ← "use client" — next-themes
  globals.css              ← @theme inline + :root tokens (the live source)
lib/utils.ts               ← cn() helper
components/ui/             ← shadcn components land here (via CLI)
.claude/skills/shadcn-ui-design/
  SKILL.md                 ← UI workflow, rules, recipes
  references/DESIGN.md     ← full token spec (read on demand)
  assets/                  ← globals.css · providers.tsx · theme-toggle.tsx
  scripts/extract_tokens.py ← regenerate :root from a Figma export
```

## 🚀 Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

Then check the project context before any code change:

```bash
npx shadcn@latest info --json
```

Returns framework, style, base library, RSC mode, Tailwind version, CSS path, icon library, and installed components.

## 🤝 Working with Claude Code

This repo is built to be driven by Claude Code. On every session it loads `CLAUDE.md`, and the `shadcn-ui-design` skill activates whenever UI work begins.

The Figma → code workflow (never infer pixel values — read them from Figma):

1. **Parse the URL** — `figma.com/design/:fileKey/:name?node-id=:nodeId` (convert `-` to `:` in nodeId)
2. **Inventory the node** — `get_metadata` → `get_design_context` → `get_variable_defs` → `get_screenshot` → `get_code_connect_map`
3. **Map variables to tokens** — match each Figma variable to a semantic token in `references/DESIGN.md`; if none matches, **stop and ask** (no hardcoded hex)
4. **Build with strict fidelity** — no adding, no removing, no inferring, no polishing
5. **Validate** — compare the render against `get_screenshot`

## 📐 Hard rules

- **Figma fidelity** — build exactly what the node shows; inventory first, ask when unsure
- **Semantic tokens only** — `bg-primary`, `text-muted-foreground`; never raw `bg-blue-500` or hex
- **`gap-*` not `space-y-*`** · **`size-10` not `w-10 h-10`**
- **Use `cn()`** from `@/lib/utils` for conditional/merged classes
- **Edit `app/globals.css`** for tokens — never create a new CSS file or change the `@theme inline` mapping
- **CLI for components** — `npx shadcn@latest add <name>`; never hand-write `components/ui/*`
- **Server Components by default** — add `"use client"` only for hooks, events, browser APIs, or next-themes

## 🛠️ Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Next.js dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npx shadcn@latest info --json` | Project context (run first) |
| `npx shadcn@latest search <query>` | Find components |
| `npx shadcn@latest add <component>` | Install a component |
| `python3 .claude/skills/shadcn-ui-design/scripts/extract_tokens.py variables-export.json` | Regenerate the `:root` token block from a Figma export |

## ☁️ Deploy

Deploy on [Vercel](https://vercel.com/new) (the Next.js platform) or any host that supports Next.js. Build with `npm run build` and serve with `npm run start`.
