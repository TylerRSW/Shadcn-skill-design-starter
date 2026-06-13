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
  parameters: { layout: "centered" },
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
