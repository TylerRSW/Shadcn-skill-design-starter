# Storybook — component workbench for dev & QA

Storybook hosts every UI component in isolation, in **light + dark**, with an
**accessibility panel** and **interaction tests**. It complements the design-system
docs site (`/docs`): docs explain the tokens, Storybook is where dev & QA exercise
the components.

## Run it

```bash
npm run storybook          # dev server → http://localhost:6006
npm run build-storybook    # static build → storybook-static/
npm run test-storybook     # run every story as a test (interaction + a11y)
```

## Stack

- **Storybook 10** · framework `@storybook/nextjs-vite` (Vite, fast HMR)
- **Tailwind v4** tokens load via `app/globals.css` imported in `.storybook/preview.tsx`
- **Dark mode** — toolbar theme switch toggles the `.dark` class (`@storybook/addon-themes`),
  matching the project's `@custom-variant dark` token setup
- **a11y** — `@storybook/addon-a11y` (axe) runs on every story
- **Tests** — `@storybook/addon-vitest` runs play functions + a11y headless in Chromium

## Where stories live

| Location | What |
|---|---|
| `components/ui/*.stories.tsx` | Hand-authored stories for ~12 core components — controls (args), variant matrices, and `play` interaction tests |
| `components/demos/*-demo.stories.tsx` | Auto-generated from the existing `*-demo.tsx` showcases (broad coverage) |

Sidebar groups: **Forms · Overlays · Feedback · Data Display**.

Regenerate the demo-based stories after adding a new demo:

```bash
node scripts/gen-stories.mjs
```

## Writing a story

```tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"
import { Button } from "./button"

const meta = {
  title: "Forms/Button",
  component: Button,
  tags: ["autodocs"],          // generates the Docs page
  args: { children: "Button" },
} satisfies Meta<typeof Button>
export default meta

type Story = StoryObj<typeof meta>
export const Default: Story = {}

// QA interaction test — also runs in `npm run test-storybook` / CI
export const Clickable: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button"))
  },
}
```

## QA notes

- **Interaction tests** (`play`) run in the browser and in CI — use them to lock
  component behaviour (open/close, toggle, type, select).
- **a11y** is in `test: 'todo'` mode (`.storybook/preview.tsx`): violations show in the
  panel but do **not** fail CI. One known issue is intentional — `muted-foreground` on
  `muted` surfaces is 4.35:1 (below WCAG AA 4.5) but kept to honour the Figma tokens.
  Flip to `'error'` once that's resolved with design to make a11y a hard CI gate.
- CI runs build + tests on every push/PR via `.github/workflows/storybook.yml`.
