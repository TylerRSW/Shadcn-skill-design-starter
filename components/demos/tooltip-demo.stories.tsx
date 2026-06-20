import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { TooltipDemo } from "./tooltip-demo"

const meta = {
  title: "Overlays/Tooltip",
  component: TooltipDemo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof TooltipDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
