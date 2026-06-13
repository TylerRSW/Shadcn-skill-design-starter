import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { NavigationMenuDemo } from "./navigation-menu-demo"

const meta = {
  title: "Overlays/Navigation Menu",
  component: NavigationMenuDemo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof NavigationMenuDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
