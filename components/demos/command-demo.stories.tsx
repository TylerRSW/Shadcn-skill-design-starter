import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { CommandDemo } from "./command-demo"

const meta = {
  title: "Overlays/Command",
  component: CommandDemo,
  parameters: {
    layout: "centered",
    // Documented a11y exception(s) — see scripts/gen-stories.mjs A11Y_OFF.
    a11y: {
      config: {
        rules: [
        // cmdk-internal listbox structure; not fixable from demo without editing components/ui
        { id: "aria-required-children", enabled: false },
        ],
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CommandDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
