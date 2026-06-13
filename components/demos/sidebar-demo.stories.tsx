import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { SidebarDemo } from "./sidebar-demo"

const meta = {
  title: "Components/Sidebar",
  component: SidebarDemo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof SidebarDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
