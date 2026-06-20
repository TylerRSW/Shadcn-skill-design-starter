/**
 * Generate Storybook stories from components/demos/*-demo.tsx.
 * One story per demo, wrapping the existing demo component, grouped by category.
 * Run: node scripts/gen-stories.mjs
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs"
import { join } from "node:path"

const DEMOS = "components/demos"

// Sidebar category map (kebab name → group). Unmapped → "Components".
const CAT = {
  Forms: ["button", "button-group", "input", "input-group", "input-otp", "textarea",
    "label", "field", "checkbox", "radio-group", "switch", "select", "native-select",
    "slider", "toggle", "toggle-group", "calendar", "date-picker", "combobox"],
  Overlays: ["dialog", "alert-dialog", "sheet", "drawer", "popover", "hover-card",
    "tooltip", "dropdown-menu", "context-menu", "menubar", "command", "navigation-menu"],
  Feedback: ["alert", "sonner", "progress", "skeleton", "spinner", "badge", "empty"],
  "Data Display": ["table", "data-table", "card", "avatar", "accordion", "collapsible",
    "carousel", "chart", "pagination", "breadcrumb", "tabs", "separator", "aspect-ratio",
    "scroll-area", "item", "kbd"],
}
const catOf = (name) =>
  Object.entries(CAT).find(([, list]) => list.includes(name))?.[0] || "Components"

// Per-demo a11y rule disables, each with a documented justification.
// Two kinds only:
//   (a) Figma-token fidelity decision — the token fails WCAG but is kept 1:1
//       per CLAUDE.md (see memory figma-fidelity-over-a11y).
//   (b) shadcn/Radix-internal structure axe flags that cannot be fixed from the
//       demo layer without hand-editing components/ui/* (forbidden by CLAUDE.md).
// These are documented exceptions, NOT silent suppressions.
const A11Y_OFF = {
  alert: [["color-contrast", "Figma --muted-foreground (#737373) on muted = 4.35:1; kept for 1:1 fidelity"]],
  avatar: [["color-contrast", "Figma --muted-foreground fallback text on muted; kept for 1:1 fidelity"]],
  kbd: [["color-contrast", "Figma --muted-foreground kbd keys on muted; kept for 1:1 fidelity"]],
  command: [["aria-required-children", "cmdk-internal listbox structure; not fixable from demo without editing components/ui"]],
  item: [["aria-required-children", "shadcn Item-internal structure; not fixable from demo without editing components/ui"]],
  "scroll-area": [["scrollable-region-focusable", "shadcn ScrollArea viewport is not tabbable; not fixable from demo without editing components/ui"]],
  slider: [["aria-input-field-name", "shadcn Slider does not forward aria-label to the thumb; not fixable from demo without editing components/ui"]],
}

// Build the `parameters` block, injecting documented a11y rule disables when present.
const paramsBlock = (name) => {
  const off = A11Y_OFF[name]
  if (!off) return `  parameters: { layout: "centered" },`
  const rules = off
    .map(([id, why]) => `        // ${why}\n        { id: "${id}", enabled: false },`)
    .join("\n")
  return `  parameters: {
    layout: "centered",
    // Documented a11y exception(s) — see scripts/gen-stories.mjs A11Y_OFF.
    a11y: {
      config: {
        rules: [
${rules}
        ],
      },
    },
  },`
}

const pretty = (name) =>
  name.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ")

const files = readdirSync(DEMOS).filter((f) => f.endsWith("-demo.tsx"))
let made = 0
for (const file of files) {
  const name = file.replace(/-demo\.tsx$/, "")
  const src = readFileSync(join(DEMOS, file), "utf8")
  const m = src.match(/export\s+function\s+(\w+)/)
  if (!m) { console.log(`! skip ${file} (no export function)`); continue }
  const comp = m[1]
  const title = `${catOf(name)}/${pretty(name)}`
  const story = `import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ${comp} } from "./${file.replace(/\.tsx$/, "")}"

const meta = {
  title: "${title}",
  component: ${comp},
${paramsBlock(name)}
  tags: ["autodocs"],
} satisfies Meta<typeof ${comp}>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
`
  writeFileSync(join(DEMOS, `${name}-demo.stories.tsx`), story)
  made++
}
console.log(`Generated ${made} story file(s) from ${files.length} demo(s).`)
