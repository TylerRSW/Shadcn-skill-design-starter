import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { KbdDemo } from "./kbd-demo"

const meta = {
  title: "Data Display/Kbd",
  component: KbdDemo,
  parameters: {
    layout: "centered",
    // Documented a11y exception(s) — see scripts/gen-stories.mjs A11Y_OFF.
    a11y: {
      config: {
        rules: [
        // Figma --muted-foreground kbd keys on muted; kept for 1:1 fidelity
        { id: "color-contrast", enabled: false },
        ],
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof KbdDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
