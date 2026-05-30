# Claude Code Instructions

Loaded into Claude Code's system prompt on every session. This project builds **Next.js (App Router) UI with shadcn/ui + Tailwind CSS v4**, translating **Figma** designs into production code with strict 1:1 fidelity.

## Read first

1. **[`.claude/skills/shadcn-ui-design/SKILL.md`](./.claude/skills/shadcn-ui-design/SKILL.md)** — the UI build workflow, rules, and recipes. Auto-discovered; full instructions load when UI work begins.
2. **[`.claude/skills/shadcn-ui-design/references/DESIGN.md`](./.claude/skills/shadcn-ui-design/references/DESIGN.md)** — design token spec (1788 Figma-exported vars). Read before any color, spacing, radius, or typography decision.

## Stack

- **Framework:** Next.js (App Router) · TypeScript · React
- **Styling:** Tailwind CSS v4 — tokens via `@theme inline` in `app/globals.css` (no `tailwind.config.ts`)
- **UI library:** shadcn/ui — CLI-driven, components live in `components/ui/`
- **Design source:** Figma — live via the Figma MCP server, plus the token export in `references/DESIGN.md`
- **Package manager:** **npm** (use `npm install` / `npm run …` / `npx shadcn@latest …`)

## Project context

Run before any code change:

```bash
npx shadcn@latest info --json
```

Returns: framework, style, base library (Radix or Base UI), RSC mode, Tailwind version, CSS path, icon library, installed components. Use `isRSC` to decide whether components need `"use client"`.

## Figma source

> **Not set yet — fill in when available.** Until then, ask the user for the Figma URL each time.

```
Figma file key:   <FILE_KEY>          # from figma.com/design/<FILE_KEY>/...
Default frame:    <NODE_ID>           # node-id with "-" converted to ":"
Code Connect:     not configured
```

When a key is provided, replace the placeholders above so any agent can resolve nodes without re-asking.

## Figma workflow (design → code)

When the user provides a Figma URL or asks to implement a frame, follow this order. **Never** infer pixel values — read them from Figma.

### 1. Parse the URL
`figma.com/design/:fileKey/:name?node-id=:nodeId` → extract `fileKey` + `nodeId` (convert `-` to `:` in nodeId).

### 2. Inventory the node (cheap → detailed)
| Step | Figma MCP tool | Purpose |
|---|---|---|
| Overview | `get_metadata` | Node tree, names, sizes — cheap structural map |
| Full context | `get_design_context` | Layout, spacing, typography, fills, auto-layout |
| Variables | `get_variable_defs` | Figma variables → map to our semantic tokens |
| Visual truth | `get_screenshot` | Reference image to validate the build against |
| Code links | `get_code_connect_map` | Existing Figma-node → component mappings (reuse them) |

### 3. Map Figma variables to tokens
Match each Figma variable to a semantic token in `references/DESIGN.md` (e.g. Figma `neutral/900` → `--primary` → `bg-primary`). If a Figma value has **no** matching token, stop and ask — do not hardcode the hex.

### 4. Build with strict fidelity
- **No adding** — if Figma shows no hover/focus/placeholder/icon, don't add one.
- **No removing** — honor exact paddings, font sizes, hairlines, and original-language labels.
- **No inferring** — if a value or behavior is ambiguous (disabled state, click target, empty/loading state, sample data), **stop and ask**.
- **No polishing** — the designer's choices are the spec; raise concerns, don't silently "fix".

### 5. Validate
Compare the rendered result against `get_screenshot`. Spacing, sizes, and colors must match.

## Hard rules

- **Figma fidelity** — build exactly what the node shows. Inventory first; ask when unsure.
- **Semantic tokens only** — `bg-primary`, `text-muted-foreground`; never raw `bg-blue-500` or hex.
- **`gap-*` not `space-y-*`. `size-10` not `w-10 h-10`.**
- **Use `cn()`** from `@/lib/utils` for conditional/merged classes.
- **Edit `app/globals.css`** for tokens — never create a new CSS file, never change the `@theme inline` mapping.
- **CLI for components** — `npx shadcn@latest add <name>`; never hand-write `components/ui/*`.
- **Server Components by default** — add `"use client"` only for hooks, events, browser APIs, or `next-themes`.
- **No invented dark mode values** — not in the token export; define a `.dark {}` block explicitly if needed.

## Directory map

```
CLAUDE.md                  ← this file (project entry, every session)
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

## Commands

```bash
npm run dev          # Next.js dev server
npm run build        # Production build
npm run lint         # ESLint

npx shadcn@latest info --json                        # project context (run first)
npx shadcn@latest search <query>                     # find components
npx shadcn@latest add <component>                    # install a component
npx shadcn@latest add <component> --dry-run --diff   # preview before applying

# Regenerate token :root block from an updated Figma export
python3 .claude/skills/shadcn-ui-design/scripts/extract_tokens.py variables-export.json
```
