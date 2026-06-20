import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { DropdownMenuDemo } from "./dropdown-menu-demo"

const meta = {
  title: "Overlays/Dropdown Menu",
  component: DropdownMenuDemo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof DropdownMenuDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
