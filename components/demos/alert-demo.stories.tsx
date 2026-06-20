import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { AlertDemo } from "./alert-demo"

const meta = {
  title: "Feedback/Alert",
  component: AlertDemo,
  parameters: {
    layout: "centered",
    // Documented a11y exception(s) — see scripts/gen-stories.mjs A11Y_OFF.
    a11y: {
      config: {
        rules: [
        // Figma --muted-foreground (#737373) on muted = 4.35:1; kept for 1:1 fidelity
        { id: "color-contrast", enabled: false },
        ],
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AlertDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
