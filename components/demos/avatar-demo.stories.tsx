import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { AvatarDemo } from "./avatar-demo"

const meta = {
  title: "Data Display/Avatar",
  component: AvatarDemo,
  parameters: {
    layout: "centered",
    // Documented a11y exception(s) — see scripts/gen-stories.mjs A11Y_OFF.
    a11y: {
      config: {
        rules: [
        // Figma --muted-foreground fallback text on muted; kept for 1:1 fidelity
        { id: "color-contrast", enabled: false },
        ],
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AvatarDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
