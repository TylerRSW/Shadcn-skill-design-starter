import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ScrollAreaDemo } from "./scroll-area-demo"

const meta = {
  title: "Data Display/Scroll Area",
  component: ScrollAreaDemo,
  parameters: {
    layout: "centered",
    // Documented a11y exception(s) — see scripts/gen-stories.mjs A11Y_OFF.
    a11y: {
      config: {
        rules: [
        // shadcn ScrollArea viewport is not tabbable; not fixable from demo without editing components/ui
        { id: "scrollable-region-focusable", enabled: false },
        ],
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ScrollAreaDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
