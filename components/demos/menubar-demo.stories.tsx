import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { MenubarDemo } from "./menubar-demo"

const meta = {
  title: "Overlays/Menubar",
  component: MenubarDemo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof MenubarDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
