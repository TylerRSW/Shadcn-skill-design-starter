import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ItemDemo } from "./item-demo"

const meta = {
  title: "Data Display/Item",
  component: ItemDemo,
  parameters: {
    layout: "centered",
    // Documented a11y exception(s) — see scripts/gen-stories.mjs A11Y_OFF.
    a11y: {
      config: {
        rules: [
        // shadcn Item-internal structure; not fixable from demo without editing components/ui
        { id: "aria-required-children", enabled: false },
        ],
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ItemDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
