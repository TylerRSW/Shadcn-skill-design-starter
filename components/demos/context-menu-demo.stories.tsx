import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ContextMenuDemo } from "./context-menu-demo"

const meta = {
  title: "Overlays/Context Menu",
  component: ContextMenuDemo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof ContextMenuDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
