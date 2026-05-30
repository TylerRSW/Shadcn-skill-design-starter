# Design System — shadcn/ui + Tailwind CSS v4 (Next.js)

> **Source of truth**: `variables-export.json` (lazyyysync-variables-v1, **1788 variables**)
> All values extracted directly from Figma. No invented values. Dark mode not defined in token file.

---

## Quick Reference

Most-used tokens at a glance — look here first when writing classes.

### Semantic Colors (use these, never hardcode hex)

| Tailwind Class | Hex | Role |
|---|---|---|
| `bg-background` / `text-foreground` | `#ffffff` / `#0a0a0a` | Page surface / body text |
| `bg-primary` / `text-primary-foreground` | `#171717` / `#fafafa` | CTA button |
| `bg-secondary` / `text-secondary-foreground` | `#f5f5f5` / `#0a0a0a` | Secondary button |
| `bg-muted` / `text-muted-foreground` | `#f5f5f5` / `#737373` | Disabled, placeholder, caption |
| `bg-accent` / `text-accent-foreground` | `#f5f5f5` / `#171717` | Hover highlight |
| `bg-card` / `text-card-foreground` | `#ffffff` / `#0a0a0a` | Card surface |
| `bg-destructive` / `text-destructive-foreground` | `#dc2626` / `#fafafa` | Error, delete |
| `border-border` | `#e5e5e5` | Dividers, outlines |
| `border-input` | `#e5e5e5` | Input border |
| `ring-ring` | `#737373` | Focus ring |
| `bg-sidebar` / `text-sidebar-foreground` | `#fafafa` / `#0a0a0a` | Sidebar surface |

### Common Spacing

`gap-2`=8px · `gap-4`=16px · `gap-6`=24px · `p-4`=16px · `p-6`=24px · `px-4 py-2` (button) · `px-3 py-2` (input)

### Border Radius

`rounded-md`=6px · `rounded-lg`=8px · `rounded-xl`=12px · `rounded-2xl`=16px · `rounded-full`=9999px

### Typography Roles

| Role | Classes |
|---|---|
| Page title | `text-4xl font-bold tracking-tight` |
| Section title | `text-2xl font-semibold tracking-tight` |
| Card title | `text-lg font-semibold` |
| Body | `text-base font-normal leading-6` |
| Caption / label | `text-sm text-muted-foreground` |
| Form label | `text-sm font-medium` |
| Code | `font-mono text-sm` |

---

## 1. Global CSS Setup

Copy verbatim into `app/globals.css` after running `npx shadcn@latest init`.

```css
@import "tailwindcss";

@theme inline {
  --color-background:                  var(--background);
  --color-foreground:                  var(--foreground);
  --color-card:                        var(--card);
  --color-card-foreground:             var(--card-foreground);
  --color-popover:                     var(--popover);
  --color-popover-foreground:          var(--popover-foreground);
  --color-primary:                     var(--primary);
  --color-primary-foreground:          var(--primary-foreground);
  --color-secondary:                   var(--secondary);
  --color-secondary-foreground:        var(--secondary-foreground);
  --color-muted:                       var(--muted);
  --color-muted-foreground:            var(--muted-foreground);
  --color-accent:                      var(--accent);
  --color-accent-foreground:           var(--accent-foreground);
  --color-destructive:                 var(--destructive);
  --color-border:                      var(--border);
  --color-input:                       var(--input);
  --color-ring:                        var(--ring);
  --color-sidebar:                     var(--sidebar);
  --color-sidebar-foreground:          var(--sidebar-foreground);
  --color-sidebar-primary:             var(--sidebar-primary);
  --color-sidebar-primary-foreground:  var(--sidebar-primary-foreground);
  --color-sidebar-accent:              var(--sidebar-accent);
  --color-sidebar-accent-foreground:   var(--sidebar-accent-foreground);
  --color-sidebar-border:              var(--sidebar-border);
  --color-sidebar-ring:                var(--sidebar-ring);
  --color-chart-1:                     var(--chart-1);
  --color-chart-2:                     var(--chart-2);
  --color-chart-3:                     var(--chart-3);
  --color-chart-4:                     var(--chart-4);
  --color-chart-5:                     var(--chart-5);
  --radius-xs:  2px;
  --radius-sm:  4px;
  --radius-md:  6px;
  --radius-lg:  8px;
  --radius-xl:  12px;
  --radius-2xl: 16px;
  --radius-3xl: 24px;
  --radius-4xl: 32px;
}

:root {
  --background:             #ffffff;   /* tw/colors: white */
  --foreground:             #0a0a0a;   /* tw/colors: neutral/950 */
  --card:                   #ffffff;
  --card-foreground:        #0a0a0a;
  --popover:                #ffffff;
  --popover-foreground:     #0a0a0a;
  --primary:                #171717;   /* tw/colors: neutral/900 */
  --primary-foreground:     #fafafa;   /* tw/colors: neutral/50 */
  --secondary:              #f5f5f5;   /* tw/colors: neutral/100 */
  --secondary-foreground:   #0a0a0a;
  --muted:                  #f5f5f5;
  --muted-foreground:       #737373;   /* tw/colors: neutral/500 */
  --accent:                 #f5f5f5;
  --accent-foreground:      #171717;
  --destructive:            #dc2626;   /* tw/colors: red/600 */
  --border:                 #e5e5e5;   /* tw/colors: neutral/200 */
  --input:                  #e5e5e5;
  --ring:                   #737373;
  --sidebar:                      #fafafa;   /* tw/colors: neutral/50 */
  --sidebar-foreground:           #0a0a0a;
  --sidebar-primary:              #171717;
  --sidebar-primary-foreground:   #fafafa;
  --sidebar-accent:               #f5f5f5;
  --sidebar-accent-foreground:    #171717;
  --sidebar-border:               #e5e5e5;
  --sidebar-ring:                 #737373;
  --chart-1:  #5eb1ef;   /* rdx/colors: blue/8 */
  --chart-2:  #0090ff;   /* rdx/colors: blue/9 */
  --chart-3:  #0588f0;   /* rdx/colors: blue/10 */
  --chart-4:  #0d74ce;   /* rdx/colors: blue/11 */
  --chart-5:  #113264;   /* rdx/colors: blue/12 */
  --background-color: rgba(0,0,0,0.30);   /* rdx/colors: black/5 — overlay */
  --semantic-background: #696867;
  --semantic-border:     #898887;
  --semantic-foreground: #ffffff;
}
```

---

## 2. Semantic Tokens (`shadcn/ui` collection — 35 vars)

### 2.1 Core (18 vars)

| CSS Variable | Figma Alias | Hex | Tailwind Class |
|---|---|---|---|
| `--background` | tw/colors: white | `#ffffff` | `bg-background` |
| `--foreground` | tw/colors: neutral/950 | `#0a0a0a` | `text-foreground` |
| `--card` | tw/colors: white | `#ffffff` | `bg-card` |
| `--card-foreground` | tw/colors: neutral/950 | `#0a0a0a` | `text-card-foreground` |
| `--popover` | tw/colors: white | `#ffffff` | `bg-popover` |
| `--popover-foreground` | tw/colors: neutral/950 | `#0a0a0a` | `text-popover-foreground` |
| `--primary` | tw/colors: neutral/900 | `#171717` | `bg-primary` |
| `--primary-foreground` | tw/colors: neutral/50 | `#fafafa` | `text-primary-foreground` |
| `--secondary` | tw/colors: neutral/100 | `#f5f5f5` | `bg-secondary` |
| `--secondary-foreground` | tw/colors: neutral/950 | `#0a0a0a` | `text-secondary-foreground` |
| `--muted` | tw/colors: neutral/100 | `#f5f5f5` | `bg-muted` |
| `--muted-foreground` | tw/colors: neutral/500 | `#737373` | `text-muted-foreground` |
| `--accent` | tw/colors: neutral/100 | `#f5f5f5` | `bg-accent` |
| `--accent-foreground` | tw/colors: neutral/900 | `#171717` | `text-accent-foreground` |
| `--destructive` | tw/colors: red/600 | `#dc2626` | `bg-destructive` |
| `--border` | tw/colors: neutral/200 | `#e5e5e5` | `border-border` |
| `--input` | tw/colors: neutral/200 | `#e5e5e5` | `border-input` |
| `--ring` | tw/colors: neutral/500 | `#737373` | `ring-ring` |

### 2.2 Sidebar (8 vars)

| CSS Variable | Figma Alias | Hex | Tailwind Class |
|---|---|---|---|
| `--sidebar` | tw/colors: neutral/50 | `#fafafa` | `bg-sidebar` |
| `--sidebar-foreground` | tw/colors: neutral/950 | `#0a0a0a` | `text-sidebar-foreground` |
| `--sidebar-primary` | tw/colors: neutral/900 | `#171717` | `bg-sidebar-primary` |
| `--sidebar-primary-foreground` | tw/colors: neutral/50 | `#fafafa` | `text-sidebar-primary-foreground` |
| `--sidebar-accent` | tw/colors: neutral/100 | `#f5f5f5` | `bg-sidebar-accent` |
| `--sidebar-accent-foreground` | tw/colors: neutral/900 | `#171717` | `text-sidebar-accent-foreground` |
| `--sidebar-border` | tw/colors: neutral/200 | `#e5e5e5` | `border-sidebar-border` |
| `--sidebar-ring` | tw/colors: neutral/500 | `#737373` | `ring-sidebar-ring` |

### 2.3 Chart (5 vars)

| CSS Variable | Figma Alias | Hex | Tailwind Class |
|---|---|---|---|
| `--chart-1` | rdx/colors: blue/8 | `#5eb1ef` | `bg-chart-1` |
| `--chart-2` | rdx/colors: blue/9 | `#0090ff` | `bg-chart-2` |
| `--chart-3` | rdx/colors: blue/10 | `#0588f0` | `bg-chart-3` |
| `--chart-4` | rdx/colors: blue/11 | `#0d74ce` | `bg-chart-4` |
| `--chart-5` | rdx/colors: blue/12 | `#113264` | `bg-chart-5` |

### 2.4 Additional (4 vars)

| CSS Variable | Value | Notes |
|---|---|---|
| `--background-color` | `rgba(0,0,0,0.30)` | rdx/colors: black/5 — overlay backdrop |
| `--semantic-background` | `#696867` | Computed color |
| `--semantic-border` | `#898887` | Computed color |
| `--semantic-foreground` | `#ffffff` | tw/colors: white |

---

## 3. Component Patterns

### Button Variants

| Variant prop | Tailwind pattern | When to use |
|---|---|---|
| `default` | `bg-primary text-primary-foreground` | Primary action |
| `secondary` | `bg-secondary text-secondary-foreground` | Secondary action |
| `outline` | `border border-input bg-background` | Tertiary / cancel |
| `ghost` | `hover:bg-accent` | Icon button, nav item |
| `destructive` | `bg-destructive text-destructive-foreground` | Delete / danger |
| `link` | `text-primary underline-offset-4` | Inline text link |

### Card Anatomy

```
<Card>                       ← bg-card border border-border rounded-lg shadow-sm
  <CardHeader>               ← p-6 pb-0
    <CardTitle>              ← text-lg font-semibold
    <CardDescription>        ← text-sm text-muted-foreground
  <CardContent>              ← p-6 pt-0
  <CardFooter>               ← p-6 pt-0 flex items-center gap-2
```

### Form Field Anatomy

```
<FormField>
  <FormLabel>                ← text-sm font-medium
  <FormControl>
    <Input>                  ← bg-background border-input rounded-md px-3 py-2 text-sm
  <FormDescription>          ← text-sm text-muted-foreground
  <FormMessage>              ← text-sm text-destructive
```

---

## 4. Layout & Spacing

### App Shell

```tsx
<html lang="en" suppressHydrationWarning>
  <body className="min-h-screen bg-background text-foreground antialiased">
    <header className="border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* nav */}
      </div>
    </header>
    <main className="container mx-auto px-4 py-8">
      {children}
    </main>
  </body>
</html>
```

### Sidebar Layout

```tsx
<div className="flex min-h-screen">
  <aside className="w-64 border-r border-sidebar-border bg-sidebar hidden md:block">
    <nav className="p-4 space-y-1">{/* nav items */}</nav>
  </aside>
  <div className="flex-1 flex flex-col">
    <header className="h-16 border-b border-border px-6 flex items-center" />
    <main className="flex-1 p-6 overflow-auto">{/* content */}</main>
  </div>
</div>
```

### Auth / Centered Layout

```tsx
<div className="min-h-screen flex items-center justify-center bg-background px-4">
  <div className="w-full max-w-sm space-y-6">
    {/* form */}
  </div>
</div>
```

### Container Widths

| Class | px | Use |
|---|---|---|
| `max-w-sm` | 384px | Auth forms |
| `max-w-md` | 448px | Narrow modals |
| `max-w-2xl` | 672px | Article / prose |
| `max-w-4xl` | 896px | Dashboard content |
| `max-w-7xl` | 1280px | Wide layouts |
| `container mx-auto px-4` | Tailwind default | General page |

### Responsive Breakpoints

| Prefix | Min-width | Device |
|---|---|---|
| _(none)_ | 0 | Mobile — write base styles here |
| `sm:` | 640px | Large phone |
| `md:` | 768px | Tablet |
| `lg:` | 1024px | Laptop |
| `xl:` | 1280px | Desktop |
| `2xl:` | 1536px | Wide desktop |

### Spacing Steps (1 step = 4px)

| Step | px | Step | px |
|---|---|---|---|
| 0.5 | 2 | 8 | 32 |
| 1 | 4 | 10 | 40 |
| 1.5 | 6 | 12 | 48 |
| 2 | 8 | 14 | 56 |
| 2.5 | 10 | 16 | 64 |
| 3 | 12 | 20 | 80 |
| 4 | 16 | 24 | 96 |
| 5 | 20 | 32 | 128 |
| 6 | 24 | 48 | 192 |
| 7 | 28 | 64 | 256 |

---

## 5. Typography (`font` collection — 45 vars)

### Families (2 vars)

| Token | Value | Tailwind |
|---|---|---|
| `font/family/sans` | **Inter** | `font-sans` |
| `font/family/mono` | **Geist Mono** | `font-mono` |

### Styles (2 vars)

`font/style/italic` → `italic` · `font/style/not-italic` → `normal`

### Font Size Scale (13 vars)

| Token | px | Tailwind |
|---|---|---|
| `font/size/xs` | 12 | `text-xs` |
| `font/size/sm` | 14 | `text-sm` |
| `font/size/base` | 16 | `text-base` |
| `font/size/lg` | 18 | `text-lg` |
| `font/size/xl` | 20 | `text-xl` |
| `font/size/2xl` | 24 | `text-2xl` |
| `font/size/3xl` | 30 | `text-3xl` |
| `font/size/4xl` | 36 | `text-4xl` |
| `font/size/5xl` | 48 | `text-5xl` |
| `font/size/6xl` | 60 | `text-6xl` |
| `font/size/7xl` | 72 | `text-7xl` |
| `font/size/8xl` | 96 | `text-8xl` |
| `font/size/9xl` | 128 | `text-9xl` |

### Font Weight (9 vars)

| Token | Value | Tailwind |
|---|---|---|
| `font/weight/thin` | 100 | `font-thin` |
| `font/weight/extralight` | 200 | `font-extralight` |
| `font/weight/light` | 300 | `font-light` |
| `font/weight/normal` | 400 | `font-normal` |
| `font/weight/medium` | 500 | `font-medium` |
| `font/weight/semibold` | 600 | `font-semibold` |
| `font/weight/bold` | 700 | `font-bold` |
| `font/weight/extrabold` | 800 | `font-extrabold` |
| `font/weight/black` | 900 | `font-black` |

### Line Height / Leading (13 vars)

| Token | px | Tailwind | Token | px | Tailwind |
|---|---|---|---|---|---|
| `font/leading/3` | 12 | `leading-3` | `font/leading/9` | 36 | `leading-9` |
| `font/leading/4` | 16 | `leading-4` | `font/leading/10` | 40 | `leading-10` |
| `font/leading/5` | 20 | `leading-5` | `font/leading/12` | 48 | `leading-12` |
| `font/leading/6` | 24 | `leading-6` | `font/leading/15` | 60 | `leading-15` |
| `font/leading/7` | 28 | `leading-7` | `font/leading/18` | 72 | `leading-18` |
| `font/leading/8` | 32 | `leading-8` | `font/leading/24` | 96 | `leading-24` |
| — | — | — | `font/leading/32` | 128 | `leading-32` |

### Letter Spacing / Tracking (6 vars)

| Token | px | Tailwind |
|---|---|---|
| `font/tracking/tighter` | −0.8 | `tracking-tighter` |
| `font/tracking/tight` | −0.4 | `tracking-tight` |
| `font/tracking/normal` | 0 | `tracking-normal` |
| `font/tracking/wide` | +0.4 | `tracking-wide` |
| `font/tracking/wider` | +0.8 | `tracking-wider` |
| `font/tracking/widest` | +1.6 | `tracking-widest` |

---

## 6. Border Radius & Border Width

### Border Radius — Base Values (`border-radius` — 10 of 150 vars)

| Token | px | Tailwind | Use |
|---|---|---|---|
| `rounded-none` | 0 | `rounded-none` | Flush |
| `rounded-xs` | 2 | `rounded-xs` | Tags, chips |
| `rounded-sm` | 4 | `rounded-sm` | Small badges |
| `rounded-md` | 6 | `rounded-md` | Inputs, buttons |
| `rounded-lg` | 8 | `rounded-lg` | Cards, dropdowns |
| `rounded-xl` | 12 | `rounded-xl` | Large cards |
| `rounded-2xl` | 16 | `rounded-2xl` | Modals, sheets |
| `rounded-3xl` | 24 | `rounded-3xl` | Large modals |
| `rounded-4xl` | 32 | `rounded-4xl` | Hero sections |
| `rounded-full` | 9999 | `rounded-full` | Avatars, pills |

Directional variants: 15 prefixes × 10 values = **150 total** — see [Appendix: Full Token Reference](#appendix-full-token-reference).

### Border Width (`border-width` — 45 vars)

Values: `0` · `1` · `2` · `4` · `8` px
Directional prefixes: `border-` · `border-x-` · `border-y-` · `border-s-` · `border-e-` · `border-t-` · `border-r-` · `border-b-` · `border-l-`

---

## 7. Opacity & Stroke Width

### Opacity (`opacity` — 21 vars)

Steps 0–100 in increments of 5: `opacity-0` · `opacity-5` · `opacity-10` · `opacity-15` · `opacity-20` · `opacity-25` · `opacity-30` · `opacity-35` · `opacity-40` · `opacity-45` · `opacity-50` · `opacity-55` · `opacity-60` · `opacity-65` · `opacity-70` · `opacity-75` · `opacity-80` · `opacity-85` · `opacity-90` · `opacity-95` · `opacity-100`

### Stroke Width (`stroke-width` — 11 vars)

`stroke-0.5` · `stroke-0.75` · `stroke-1` · `stroke-1.25` · `stroke-1.5` · `stroke-1.75` · `stroke-2` · `stroke-2.25` · `stroke-2.5` · `stroke-2.75` · `stroke-3`

---

## 8. Icon Convention

Use **lucide-react** exclusively. Size with `size-{N}` (Tailwind v4 shorthand).

```tsx
import { Plus, Trash2 } from "lucide-react"

<Plus className="size-4" />   {/* 16px — default */}
<Plus className="size-5" />   {/* 20px */}
```

Icon-only buttons require `<span className="sr-only">label</span>` or `aria-label`.

---

## Appendix: Full Token Reference

> Complete data for all 1788 variables. Consult when picking primitive color values or verifying exact spacing steps.

### A. tw/colors (244 vars) — 22 families × 11 steps + black + white

**Neutral** · 50:`#fafafa` · 100:`#f5f5f5` · 200:`#e5e5e5` · 300:`#d4d4d4` · 400:`#a3a3a3` · 500:`#737373` · 600:`#525252` · 700:`#404040` · 800:`#262626` · 900:`#171717` · 950:`#0a0a0a`

**Slate** · 50:`#f8fafc` · 100:`#f1f5f9` · 200:`#e2e8f0` · 300:`#cbd5e1` · 400:`#94a3b8` · 500:`#64748b` · 600:`#475569` · 700:`#334155` · 800:`#1e293b` · 900:`#0f172a` · 950:`#020617`

**Gray** · 50:`#f9fafb` · 100:`#f3f4f6` · 200:`#e5e7eb` · 300:`#d1d5db` · 400:`#9ca3af` · 500:`#6b7280` · 600:`#4b5563` · 700:`#374151` · 800:`#1f2937` · 900:`#111827` · 950:`#030712`

**Zinc** · 50:`#fafafa` · 100:`#f4f4f5` · 200:`#e4e4e7` · 300:`#d4d4d8` · 400:`#a1a1aa` · 500:`#71717a` · 600:`#52525b` · 700:`#3f3f46` · 800:`#27272a` · 900:`#18181b` · 950:`#09090b`

**Stone** · 50:`#fafaf9` · 100:`#f5f5f4` · 200:`#e7e5e4` · 300:`#d6d3d1` · 400:`#a8a29e` · 500:`#78716c` · 600:`#57534e` · 700:`#44403c` · 800:`#292524` · 900:`#1c1917` · 950:`#0c0a09`

**Red** · 50:`#fef2f2` · 100:`#fee2e2` · 200:`#fecaca` · 300:`#fca5a5` · 400:`#f87171` · 500:`#ef4444` · 600:`#dc2626` · 700:`#b91c1c` · 800:`#991b1b` · 900:`#7f1d1d` · 950:`#450a0a`

**Orange** · 50:`#fff7ed` · 100:`#ffedd5` · 200:`#fed7aa` · 300:`#fdba74` · 400:`#fb923c` · 500:`#f97316` · 600:`#ea580c` · 700:`#c2410c` · 800:`#9a3412` · 900:`#7c2d12` · 950:`#431407`

**Amber** · 50:`#fffbeb` · 100:`#fef3c7` · 200:`#fde68a` · 300:`#fcd34d` · 400:`#fbbf24` · 500:`#f59e0b` · 600:`#d97706` · 700:`#b45309` · 800:`#92400e` · 900:`#78350f` · 950:`#451a03`

**Yellow** · 50:`#fefce8` · 100:`#fef9c3` · 200:`#fef08a` · 300:`#fde047` · 400:`#facc15` · 500:`#eab308` · 600:`#ca8a04` · 700:`#a16207` · 800:`#854d0e` · 900:`#713f12` · 950:`#422006`

**Lime** · 50:`#f7fee7` · 100:`#ecfccb` · 200:`#d9f99d` · 300:`#bef264` · 400:`#a3e635` · 500:`#84cc16` · 600:`#65a30d` · 700:`#4d7c0f` · 800:`#3f6212` · 900:`#365314` · 950:`#1a2e05`

**Green** · 50:`#f0fdf4` · 100:`#dcfce7` · 200:`#bbf7d0` · 300:`#86efac` · 400:`#4ade80` · 500:`#22c55e` · 600:`#16a34a` · 700:`#15803d` · 800:`#166534` · 900:`#14532d` · 950:`#052e16`

**Emerald** · 50:`#ecfdf5` · 100:`#d1fae5` · 200:`#a7f3d0` · 300:`#6ee7b7` · 400:`#34d399` · 500:`#10b981` · 600:`#059669` · 700:`#047857` · 800:`#065f46` · 900:`#064e3b` · 950:`#022c22`

**Teal** · 50:`#f0fdfa` · 100:`#ccfbf1` · 200:`#99f6e4` · 300:`#5eead4` · 400:`#2dd4bf` · 500:`#14b8a6` · 600:`#0d9488` · 700:`#0f766e` · 800:`#115e59` · 900:`#134e4a` · 950:`#042f2e`

**Cyan** · 50:`#ecfeff` · 100:`#cffafe` · 200:`#a5f3fc` · 300:`#67e8f9` · 400:`#22d3ee` · 500:`#06b6d4` · 600:`#0891b2` · 700:`#0e7490` · 800:`#155e75` · 900:`#164e63` · 950:`#083344`

**Sky** · 50:`#f0f9ff` · 100:`#e0f2fe` · 200:`#bae6fd` · 300:`#7dd3fc` · 400:`#38bdf8` · 500:`#0ea5e9` · 600:`#0284c7` · 700:`#0369a1` · 800:`#075985` · 900:`#0c4a6e` · 950:`#082f49`

**Blue** · 50:`#eff6ff` · 100:`#dbeafe` · 200:`#bfdbfe` · 300:`#93c5fd` · 400:`#60a5fa` · 500:`#3b82f6` · 600:`#2563eb` · 700:`#1d4ed8` · 800:`#1e40af` · 900:`#1e3a8a` · 950:`#172554`

**Indigo** · 50:`#eef2ff` · 100:`#e0e7ff` · 200:`#c7d2fe` · 300:`#a5b4fc` · 400:`#818cf8` · 500:`#6366f1` · 600:`#4f46e5` · 700:`#4338ca` · 800:`#3730a3` · 900:`#312e81` · 950:`#1e1b4b`

**Violet** · 50:`#f5f3ff` · 100:`#ede9fe` · 200:`#ddd6fe` · 300:`#c4b5fd` · 400:`#a78bfa` · 500:`#8b5cf6` · 600:`#7c3aed` · 700:`#6d28d9` · 800:`#5b21b6` · 900:`#4c1d95` · 950:`#2e1065`

**Purple** · 50:`#faf5ff` · 100:`#f3e8ff` · 200:`#e9d5ff` · 300:`#d8b4fe` · 400:`#c084fc` · 500:`#a855f7` · 600:`#9333ea` · 700:`#7e22ce` · 800:`#6b21a8` · 900:`#581c87` · 950:`#3b0764`

**Fuchsia** · 50:`#fdf4ff` · 100:`#fae8ff` · 200:`#f5d0fe` · 300:`#f0abfc` · 400:`#e879f9` · 500:`#d946ef` · 600:`#c026d3` · 700:`#a21caf` · 800:`#86198f` · 900:`#701a75` · 950:`#4a044e`

**Pink** · 50:`#fdf2f8` · 100:`#fce7f3` · 200:`#fbcfe8` · 300:`#f9a8d4` · 400:`#f472b6` · 500:`#ec4899` · 600:`#db2777` · 700:`#be185d` · 800:`#9d174d` · 900:`#831843` · 950:`#500724`

**Rose** · 50:`#fff1f2` · 100:`#ffe4e6` · 200:`#fecdd3` · 300:`#fda4af` · 400:`#fb7185` · 500:`#f43f5e` · 600:`#e11d48` · 700:`#be123c` · 800:`#9f1239` · 900:`#881337` · 950:`#4c0519`

**Black**: `#000000` · **White**: `#ffffff`

---

### B. rdx/colors (396 vars) — 33 families × 12 steps (1–12)

**amber** · 1:`#fefdfb` 2:`#fefbe9` 3:`#fff7c2` 4:`#ffee9c` 5:`#fbe577` 6:`#f3d673` 7:`#e9c162` 8:`#e2a336` 9:`#ffc53d` 10:`#ffba18` 11:`#ab6400` 12:`#4f3422`

**black** · all steps: `#000000`

**blue** · 1:`#fbfdff` 2:`#f4faff` 3:`#e6f4fe` 4:`#d5efff` 5:`#c2e5ff` 6:`#acd8fc` 7:`#8ec8f6` 8:`#5eb1ef` 9:`#0090ff` 10:`#0588f0` 11:`#0d74ce` 12:`#113264`

**bronze** · 1:`#fdfcfc` 2:`#fdf7f5` 3:`#f6edea` 4:`#efe4df` 5:`#e7d9d3` 6:`#dfcdc5` 7:`#d3bcb3` 8:`#c2a499` 9:`#a18072` 10:`#957468` 11:`#7d5e54` 12:`#43302b`

**brown** · 1:`#fefdfc` 2:`#fcf9f6` 3:`#f6eee7` 4:`#f0e4d9` 5:`#ebdaca` 6:`#e4cdb7` 7:`#dcbc9f` 8:`#cea37e` 9:`#ad7f58` 10:`#a07553` 11:`#815e46` 12:`#3e332e`

**crimson** · 1:`#fffcfd` 2:`#fef7f9` 3:`#ffe9f0` 4:`#fedce7` 5:`#facedd` 6:`#f3bed1` 7:`#eaacc3` 8:`#e093b2` 9:`#e93d82` 10:`#df3478` 11:`#cb1d63` 12:`#621639`

**cyan** · 1:`#fafdfe` 2:`#f2fafb` 3:`#def7f9` 4:`#caf1f6` 5:`#b5e9f0` 6:`#9ddde7` 7:`#7dcedc` 8:`#3db9cf` 9:`#00a2c7` 10:`#0797b9` 11:`#107d98` 12:`#0d3c48`

**gold** · 1:`#fdfdfc` 2:`#faf9f2` 3:`#f2f0e7` 4:`#eae6db` 5:`#e1dccf` 6:`#d8d0bf` 7:`#cbc0aa` 8:`#b9a88d` 9:`#978365` 10:`#8c7a5e` 11:`#71624b` 12:`#3b352b`

**grass** · 1:`#fbfefb` 2:`#f5fbf5` 3:`#e9f6e9` 4:`#daf1db` 5:`#c9e8ca` 6:`#b2ddb5` 7:`#94ce9a` 8:`#65ba74` 9:`#46a758` 10:`#3e9b4f` 11:`#2a7e3b` 12:`#203c25`

**gray** · 1:`#fcfcfc` 2:`#f9f9f9` 3:`#f0f0f0` 4:`#e8e8e8` 5:`#e0e0e0` 6:`#d9d9d9` 7:`#cecece` 8:`#bbbbbb` 9:`#8d8d8d` 10:`#838383` 11:`#646464` 12:`#202020`

**green** · 1:`#fbfefc` 2:`#f4fbf6` 3:`#e6f6eb` 4:`#d6f1df` 5:`#c4e8d1` 6:`#adddc0` 7:`#8eceaa` 8:`#5bb98b` 9:`#30a46c` 10:`#2b9a66` 11:`#218358` 12:`#193b2d`

**indigo** · 1:`#fdfdfe` 2:`#f7f9ff` 3:`#edf2fe` 4:`#e1e9ff` 5:`#d2deff` 6:`#c1d0ff` 7:`#abbdf9` 8:`#8da4ef` 9:`#3e63dd` 10:`#3358d4` 11:`#3a5bc7` 12:`#1f2d5c`

**iris** · 1:`#fdfdff` 2:`#f8f8ff` 3:`#f0f1fe` 4:`#e6e7ff` 5:`#dadcff` 6:`#cbcdff` 7:`#b8baf8` 8:`#9b9ef0` 9:`#5b5bd6` 10:`#5151cd` 11:`#5753c6` 12:`#272962`

**jade** · 1:`#fbfefd` 2:`#f4fbf7` 3:`#e6f7ed` 4:`#d6f1e3` 5:`#c3e9d7` 6:`#acdec8` 7:`#8bceb6` 8:`#56ba9f` 9:`#29a383` 10:`#26997b` 11:`#208368` 12:`#1d3b31`

**lime** · 1:`#fcfdfa` 2:`#f8faf3` 3:`#eef6d6` 4:`#e2f0bd` 5:`#d3e7a6` 6:`#c2da91` 7:`#abc978` 8:`#8db654` 9:`#bdee63` 10:`#b0e64c` 11:`#5c7c2f` 12:`#37401c`

**mauve** · 1:`#fdfcfd` 2:`#faf9fb` 3:`#f2eff3` 4:`#eae7ec` 5:`#e3dfe6` 6:`#dbd8e0` 7:`#d0cdd7` 8:`#bcbac7` 9:`#8e8c99` 10:`#84828e` 11:`#65636d` 12:`#211f26`

**mint** · 1:`#f9fefd` 2:`#f2fbf9` 3:`#ddf9f2` 4:`#c8f4e9` 5:`#b3ecde` 6:`#9ce0d0` 7:`#7ecfbd` 8:`#4cbba5` 9:`#86ead4` 10:`#7de0cb` 11:`#027864` 12:`#16433c`

**olive** · 1:`#fcfdfc` 2:`#f8faf8` 3:`#eff1ef` 4:`#e7e9e7` 5:`#dfe2df` 6:`#d7dad7` 7:`#cccfcc` 8:`#b9bcb8` 9:`#898e87` 10:`#7f847d` 11:`#60655f` 12:`#1d211c`

**orange** · 1:`#fefcfb` 2:`#fff7ed` 3:`#ffefd6` 4:`#ffdfb5` 5:`#ffd19a` 6:`#ffc182` 7:`#f5ae73` 8:`#ec9455` 9:`#f76b15` 10:`#ef5f00` 11:`#cc4e00` 12:`#582d1d`

**pink** · 1:`#fffcfe` 2:`#fef7fb` 3:`#fee9f5` 4:`#fbdcef` 5:`#f6cee7` 6:`#efbfdd` 7:`#e7acd0` 8:`#dd93c2` 9:`#d6409f` 10:`#cf3897` 11:`#c2298a` 12:`#651249`

**plum** · 1:`#fefcff` 2:`#fdf7fd` 3:`#fbebfb` 4:`#f7def8` 5:`#f2d1f3` 6:`#e9c2ec` 7:`#deade3` 8:`#cf91d8` 9:`#ab4aba` 10:`#a144af` 11:`#953ea3` 12:`#53195d`

**purple** · 1:`#fefcfe` 2:`#fbf7fe` 3:`#f7edfe` 4:`#f2e2fc` 5:`#ead5f9` 6:`#e0c4f4` 7:`#d1afec` 8:`#be93e4` 9:`#8e4ec6` 10:`#8347b9` 11:`#8145b5` 12:`#402060`

**red** · 1:`#fffcfc` 2:`#fff7f7` 3:`#feebec` 4:`#ffdbdc` 5:`#ffcdce` 6:`#fdbdbe` 7:`#f4a9aa` 8:`#eb8e90` 9:`#e5484d` 10:`#dc3e42` 11:`#ce2c31` 12:`#641723`

**ruby** · 1:`#fffcfd` 2:`#fff7f8` 3:`#feeaed` 4:`#ffdce1` 5:`#ffced6` 6:`#f8bfc8` 7:`#efacb8` 8:`#e592a3` 9:`#e54666` 10:`#dc3b5d` 11:`#ca244d` 12:`#64172b`

**sage** · 1:`#fbfdfc` 2:`#f7f9f8` 3:`#eeeeff` 4:`#e6e9e8` 5:`#dfe2e0` 6:`#d7dad9` 7:`#cbcfcd` 8:`#b8bcba` 9:`#868e8b` 10:`#7c8481` 11:`#5f6563` 12:`#1a211e`

**sand** · 1:`#fdfdfc` 2:`#f9f9f8` 3:`#f1f0ef` 4:`#e9e8e6` 5:`#e2e1de` 6:`#dad9d6` 7:`#cfceca` 8:`#bcbbb5` 9:`#8d8d86` 10:`#82827c` 11:`#63635e` 12:`#21201c`

**sky** · 1:`#f9feff` 2:`#f1fafd` 3:`#e1f6fd` 4:`#d1f0fa` 5:`#bee7f5` 6:`#a9daed` 7:`#8dcae3` 8:`#60b3d7` 9:`#7ce2fe` 10:`#74daf8` 11:`#00749e` 12:`#1d3e56`

**slate** · 1:`#fcfcfd` 2:`#f9f9fb` 3:`#f0f0f3` 4:`#e8e8ec` 5:`#e0e1e6` 6:`#d9d9e0` 7:`#cdced6` 8:`#b9bbc6` 9:`#8b8d98` 10:`#80838d` 11:`#60646c` 12:`#1c2024`

**teal** · 1:`#fafefd` 2:`#f3fbf9` 3:`#e0f8f3` 4:`#ccf3ea` 5:`#b8eae0` 6:`#a1ded2` 7:`#83cdc1` 8:`#53b9ab` 9:`#12a594` 10:`#0d9b8a` 11:`#008573` 12:`#0d3d38`

**tomato** · 1:`#fffcfc` 2:`#fff8f7` 3:`#feebe7` 4:`#ffdcd3` 5:`#ffcdc2` 6:`#fdbdaf` 7:`#f5a898` 8:`#ec8e7b` 9:`#e54d2e` 10:`#dd4425` 11:`#d13415` 12:`#5c271f`

**violet** · 1:`#fdfcfe` 2:`#faf8ff` 3:`#f4f0fe` 4:`#ebe4ff` 5:`#e1d9ff` 6:`#d4cafe` 7:`#c2b5f5` 8:`#aa99ec` 9:`#6e56cf` 10:`#654dc4` 11:`#6550b9` 12:`#2f265f`

**white** · all steps: `#ffffff`

**yellow** · 1:`#fdfdf9` 2:`#fefce9` 3:`#fffab8` 4:`#fff394` 5:`#ffe770` 6:`#f3d768` 7:`#e4c767` 8:`#d5ae39` 9:`#ffe629` 10:`#ffdc00` 11:`#9e6c00` 12:`#473b1f`

---

### C. Spacing Collections

All collections share the same base unit: **1 Tailwind step = 4px**.
Steps available in all collections: `0, px(1px), 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96`

| Collection | Vars | Variants per step |
|---|---|---|
| `gap` | 102 | `gap-{N}` · `gap-x-{N}` · `gap-y-{N}` |
| `padding` | 245 | `p-{N}` · `px-{N}` · `py-{N}` · `pt-{N}` · `pr-{N}` · `pb-{N}` · `pl-{N}` |
| `margin` | 245 | `m-{N}` · `mx-{N}` · `my-{N}` · `mt-{N}` · `mr-{N}` · `mb-{N}` · `ml-{N}` |
| `space` | 68 | `space-x-{N}` · `space-y-{N}` |

---

### D. Dimension Tokens

**Height (`height` — 24 vars)**
`h-0`=0 · `h-px`=1 · `h-0.5`=2 · `h-1`=4 · `h-2`=8 · `h-2.5`=10 · `h-3`=12 · `h-3.5`=14 · `h-4`=16 · `h-5`=20 · `h-6`=24 · `h-7`=28 · `h-8`=32 · `h-9`=36 · `h-10`=40 · `h-12`=48 · `h-14`=56 · `h-16`=64 · `h-18`=72 · `h-20`=80 · `h-24`=96 · `h-48`=192 · `h-72`=288 · `h-96`=384

**Max Height (`max-height` — 35 vars)** — classes: `max-h-{step}`
Steps: 0, px, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96

**Max Width (`max-width` — 35 vars)** — classes: `max-w-{step}`
Same steps as max-height.

---

### E. Base Numeric Scale (`tokens` — 87 vars)

All spacing, sizing, and radius values reference this scale (px).

```
-0.8, -0.4, 0, 0.4, 0.5, 0.75, 0.8, 1, 1.25, 1.5, 1.6, 1.75,
2, 2.25, 2.5, 2.75, 3, 4, 5, 6, 8, 10, 12, 14, 15, 16, 18, 20,
24, 25, 28, 30, 32, 35, 36, 40, 44, 45, 48, 50, 55, 56, 60, 64,
65, 70, 72, 75, 80, 85, 90, 95, 96, 100, 112, 128, 144, 160, 176,
192, 200, 208, 224, 240, 256, 288, 300, 320, 384, 400, 448, 500,
512, 576, 600, 640, 672, 700, 768, 800, 896, 900, 1024, 1152,
1280, 1536, 9999
```

---

### F. Border Radius — Directional Variants (`border-radius` — 150 vars)

15 directional prefixes × 10 base values (`none, xs, sm, md, lg, xl, 2xl, 3xl, 4xl, full`):

| Prefix | Corners affected |
|---|---|
| `rounded-{N}` | All 4 corners |
| `rounded-s-{N}` | Inline-start (top-left + bottom-left LTR) |
| `rounded-e-{N}` | Inline-end (top-right + bottom-right LTR) |
| `rounded-t-{N}` | Top-left + top-right |
| `rounded-r-{N}` | Top-right + bottom-right |
| `rounded-b-{N}` | Bottom-left + bottom-right |
| `rounded-l-{N}` | Top-left + bottom-left |
| `rounded-ss-{N}` | Start-start (top-left LTR) |
| `rounded-se-{N}` | Start-end (top-right LTR) |
| `rounded-ee-{N}` | End-end (bottom-right LTR) |
| `rounded-es-{N}` | End-start (bottom-left LTR) |
| `rounded-tl-{N}` | Top-left only |
| `rounded-tr-{N}` | Top-right only |
| `rounded-br-{N}` | Bottom-right only |
| `rounded-bl-{N}` | Bottom-left only |

---

### G. Collections Summary

| Collection | Vars | Description |
|---|---|---|
| `shadcn/ui` | 35 | Semantic design tokens |
| `tw/colors` | 244 | Tailwind primitive color palette |
| `rdx/colors` | 396 | Radix UI primitive color palette |
| `font` | 45 | Family, size, weight, leading, tracking |
| `border-radius` | 150 | All corner radius variants |
| `border-width` | 45 | Border width utilities |
| `stroke-width` | 11 | SVG stroke width |
| `padding` | 245 | Padding utilities |
| `margin` | 245 | Margin utilities |
| `gap` | 102 | Gap utilities |
| `space` | 68 | Space-between utilities |
| `tokens` | 87 | Base numeric scale (px) |
| `height` | 24 | Height utilities |
| `max-height` | 35 | Max-height utilities |
| `max-width` | 35 | Max-width utilities |
| `opacity` | 21 | Opacity utilities |
| **Total** | **1788** | |
