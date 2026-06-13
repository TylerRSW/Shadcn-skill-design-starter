import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { HoverCardDemo } from "./hover-card-demo"

const meta = {
  title: "Overlays/Hover Card",
  component: HoverCardDemo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof HoverCardDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
