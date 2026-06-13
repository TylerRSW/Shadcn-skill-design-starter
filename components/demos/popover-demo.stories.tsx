import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { PopoverDemo } from "./popover-demo"

const meta = {
  title: "Overlays/Popover",
  component: PopoverDemo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof PopoverDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
