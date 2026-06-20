---
name: shadcn-ui-design
description: Build and modify UI for Next.js (App Router) projects using shadcn/ui and Tailwind CSS v4, driven by Figma-exported design tokens. Use whenever the user asks to create a page/screen/layout, build or install a UI component, apply or customize design tokens/theme/dark mode, add a form with validation, or make UI responsive. Enforces semantic-token-only styling, Server/Client Component rules, and the shadcn CLI workflow.
---

# shadcn/ui + Tailwind CSS v4 — UI Design Skill (Next.js App Router)

Build production UI with shadcn/ui, Tailwind CSS v4, and Next.js App Router, using the design tokens exported from Figma. Semantic tokens are the source of truth — never write a color, spacing, or radius class without checking the reference first.

## Bundled Resources

| Path | What it is | When to use |
|---|---|---|
| `references/DESIGN.md` | Full token spec — 1788 vars (colors, spacing, typography, radius). | Read before choosing any token value. Load on demand — it is large. |
| `assets/globals.css` | Copy-paste `@theme inline` + `:root` token block. | Drop into `app/globals.css` on project setup. |
| `assets/providers.tsx` | `next-themes` provider boilerplate. | Copy to `app/providers.tsx` when adding theming. |
| `assets/theme-toggle.tsx` | Light/dark toggle component. | Copy to `components/` when a theme switch is needed. |
| `scripts/extract_tokens.py` | Regenerate the `:root` block from a Figma `variables-export.json`. | Run when the Figma tokens change. |

---

## Stack

| Layer | Package |
|---|---|
| Framework | `next` (App Router) |
| Styling | `tailwindcss` v4 |
| Components | `shadcn/ui` |
| Icons | `lucide-react` |
| Forms | `react-hook-form` + `zod` + `Field` |
| Themes | `next-themes` |

---

## Rules — Read Before Coding

### Always
- Use semantic token classes (`bg-background`, `text-foreground`) — **never** hardcode hex like `#171717` or primitives like `text-neutral-900`.
- Check `references/DESIGN.md` Quick Reference before choosing any color, spacing, or radius class.
- Import shadcn/ui components from `@/components/ui/`.
- Use `cn()` from `@/lib/utils` for conditional/merged class names.
- Prefer `gap-*` over `space-y-*`; use `size-4` over `h-4 w-4`.
- Use `asChild` on `DialogTrigger`, `TooltipTrigger`, etc. when wrapping a custom element.
- Keep Server Components as the default — add `"use client"` only when needed (see Workflow Step 2).

### Never
- Never edit files inside `components/ui/` — they are owned by the shadcn CLI. Extend by wrapping.
- Never hand-write `components/ui/*` — install via `npx shadcn@latest add <name>`.
- Never mix Tailwind v3 config (`tailwind.config.js` `theme.extend`) with v4 `@theme` CSS.
- Never use inline `style={{ color: '...' }}` for design tokens.
- Never omit `<FieldError />` inside a validated `<Field>`.
- Never use the TypeScript `any` type for form values — infer from the zod schema.
- Never invent dark mode token values — they are not in the token file; define explicitly if needed.

### Accessibility
- Every `<Input>` must have a paired `<FieldLabel>` or `aria-label`.
- Every icon-only button needs `<span className="sr-only">label</span>`.
- Use `<DialogTitle>` + `<DialogDescription>` in every `<Dialog>`.
- Radix UI handles keyboard nav — do not override `tabIndex` unless necessary.

---

## Workflow

### Step 1 — Read project context
```bash
npx shadcn@latest info --json
```
Detects package manager, framework, style, and RSC mode.

### Step 2 — Decide: Server Component or Client Component?
```
Uses hooks / events / browser APIs / next-themes / interactive shadcn (Dialog, Sheet, react-hook-form)?
  → add "use client"
Otherwise → Server Component (no directive). This is the default.
```

### Step 3 — Select / install components
```bash
npx shadcn@latest add <component>
npx shadcn@latest add <component> --dry-run --diff   # preview first
```

### Step 4 — Write the layout
Mobile-first — base styles first, then `sm:` / `md:` / `lg:` overrides.
Containers: `max-w-sm` (auth) · `max-w-2xl` (prose) · `max-w-4xl` (dashboard) · `container mx-auto px-4`.

### Step 5 — Apply tokens
- **Colors**: semantic only — `bg-background`, `text-foreground`, `bg-primary`, `text-muted-foreground`, `border-border`. Full list in `references/DESIGN.md §2`.
- **Spacing**: `gap-2`=8px · `gap-4`=16px · `p-4`=16px · `p-6`=24px (1 step = 4px).
- **Radius**: `rounded-md`=6px (inputs/buttons) · `rounded-lg`=8px (cards) · `rounded-full`=9999px.
- **Typography**: `text-2xl font-semibold tracking-tight` (h2) · `text-base leading-6` (body) · `text-sm text-muted-foreground` (caption) · `text-sm font-medium` (label).

### Step 6 — Wire forms (if needed)
Follow the Field Pattern below — shadcn's `Field` primitives + `react-hook-form` + a zod schema. (The older `Form`/`FormField` wrapper is deprecated in favor of `Field`.)

---

## Next.js App Router Patterns

### File Structure
```
app/
  layout.tsx          ← Root layout — Server Component
  page.tsx            ← Server Component by default
  providers.tsx       ← "use client" — from assets/providers.tsx
  (auth)/login/page.tsx
  dashboard/layout.tsx  page.tsx
components/
  ui/                 ← shadcn primitives — never edit
  [feature]/          ← composite components
lib/
  utils.ts            ← cn() helper
```

### Server Component (default)
```tsx
// app/dashboard/page.tsx — no directive needed
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function DashboardPage() {
  const data = await fetchData()   // server-side, no useEffect
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {data.map(item => <MetricCard key={item.id} {...item} />)}
      </div>
    </div>
  )
}
```

### Client Component
```tsx
"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function FeatureForm() {
  const [open, setOpen] = useState(false)
  return <Button onClick={() => setOpen(true)}>Open</Button>
}
```

### Root layout wiring (uses `assets/providers.tsx`)
```tsx
// app/layout.tsx — Server Component wrapping a Client Provider
import { Providers } from "./providers"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

---

## Component Recipes

### Card with action
```tsx
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function ProductCard({ name, description }: { name: string; description: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Card body content here.</p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Confirm</Button>
      </CardFooter>
    </Card>
  )
}
```

### Dialog / Modal
```tsx
"use client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function ConfirmDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline">Cancel</Button>
          <Button variant="destructive">Delete</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
```

### Badge / Status
```tsx
import { Badge } from "@/components/ui/badge"

<Badge variant="default">Active</Badge>
<Badge variant="secondary">Draft</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="outline">Pending</Badge>
```

---

## Field Pattern (forms)

shadcn's `Field` primitives are the current way to lay out forms — the older `Form`/`FormField` wrapper is **deprecated**. Compose `Field` with `react-hook-form` + a zod schema. Exports: `Field`, `FieldGroup`, `FieldLabel`, `FieldDescription`, `FieldError`, `FieldSet`, `FieldLegend`, `FieldSeparator`, `FieldContent`, `FieldTitle`.

### Setup
```bash
npm install react-hook-form zod @hookform/resolvers
npx shadcn@latest add field input label textarea select checkbox
```

### Full example (Field + react-hook-form + zod)
```tsx
"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Minimum 8 characters"),
})

type FormValues = z.infer<typeof schema>

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  })

  return (
    <form onSubmit={handleSubmit((values) => console.log(values))}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          <FieldError errors={[errors.email]} />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            type="password"
            aria-invalid={!!errors.password}
            {...register("password")}
          />
          <FieldDescription>Must be at least 8 characters.</FieldDescription>
          <FieldError errors={[errors.password]} />
        </Field>
        <Button type="submit" className="w-full">Sign in</Button>
      </FieldGroup>
    </form>
  )
}
```

### Select field
```tsx
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

<Field>
  <FieldLabel htmlFor="role">Role</FieldLabel>
  <Select onValueChange={field.onChange} defaultValue={field.value}>
    <SelectTrigger id="role"><SelectValue placeholder="Select a role" /></SelectTrigger>
    <SelectContent>
      <SelectItem value="admin">Admin</SelectItem>
      <SelectItem value="user">User</SelectItem>
      <SelectItem value="viewer">Viewer</SelectItem>
    </SelectContent>
  </Select>
  <FieldError errors={[errors.role]} />
</Field>
```

### Checkbox field (horizontal)
```tsx
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldLabel } from "@/components/ui/field"

<Field orientation="horizontal">
  <Checkbox id="terms" checked={field.value} onCheckedChange={field.onChange} />
  <FieldLabel htmlFor="terms" className="font-normal">
    I accept the terms and conditions
  </FieldLabel>
</Field>
```

---

## Layout Patterns

### Responsive grid
```tsx
<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
  {items.map(item => <ItemCard key={item.id} {...item} />)}
</div>
```

### Sidebar shell
```tsx
<div className="flex min-h-screen">
  <aside className="w-64 border-r border-sidebar-border bg-sidebar hidden md:block">
    <nav className="p-4 flex flex-col gap-1">{/* nav items */}</nav>
  </aside>
  <div className="flex-1 flex flex-col">
    <header className="h-16 border-b border-border px-6 flex items-center" />
    <main className="flex-1 p-6 overflow-auto">{/* content */}</main>
  </div>
</div>
```

---

## Theming

### Customizing a token
Edit only the hex values in `app/globals.css` inside `:root`. Do **not** change the `@theme inline` block. Pick hex from palettes in `references/DESIGN.md` Appendix A.

```css
:root {
  --primary:            #1d4ed8;   /* tw/colors: blue/700 */
  --primary-foreground: #eff6ff;   /* tw/colors: blue/50 */
}
```

### Adding a custom color token
```css
@theme inline { --color-brand: var(--brand); }
:root { --brand: #16a34a; }   /* tw/colors: green/600 */
```
Use as `bg-brand`, `text-brand`, `border-brand`.

### Dark mode
Copy `assets/providers.tsx` → `app/providers.tsx`, `assets/theme-toggle.tsx` → `components/theme-toggle.tsx`.
Dark mode token values are **not** in the export — define a `.dark { … }` block manually if needed.

---

## First-time Setup
```bash
# 1. Create Next.js app
npx create-next-app@latest my-app \
  --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# 2. Init shadcn/ui  (Style → Default · Base color → Neutral · CSS variables → Yes)
npx shadcn@latest init

# 3. Replace app/globals.css with assets/globals.css from this skill

# 4. Dark mode
npm install next-themes
```
> Tailwind v4 has no `tailwind.config.ts` — all config lives in CSS via `@theme inline`.

---

## CLI Reference
```bash
npx shadcn@latest info --json
npx shadcn@latest search <query>
npx shadcn@latest add <component> [--dry-run --diff]

# All 55 components (install any: npx shadcn@latest add <name>)
# Layout & containers
accordion aspect-ratio card carousel collapsible scroll-area separator sidebar tabs
# Forms & inputs
button button-group checkbox field input input-group input-otp label native-select radio-group select slider switch textarea toggle toggle-group
# Overlays & menus
alert-dialog command context-menu dialog drawer dropdown-menu hover-card menubar popover sheet tooltip
# Navigation
breadcrumb navigation-menu pagination
# Feedback & status
alert badge empty progress skeleton sonner spinner
# Data display
avatar calendar chart combobox data-table date-picker item kbd table

# Notes:
#  - `form` is DEPRECATED → use `field` + react-hook-form (see Field Pattern).
#  - combobox / date-picker / data-table are COMPOSITIONS (no single file):
#      combobox    = popover + command
#      date-picker = popover + calendar
#      data-table  = table + @tanstack/react-table

npm run dev | build | lint
```
