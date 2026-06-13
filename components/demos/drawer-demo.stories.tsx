import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { DrawerDemo } from "./drawer-demo"

const meta = {
  title: "Overlays/Drawer",
  component: DrawerDemo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof DrawerDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
