import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { DialogDemo } from "./dialog-demo"

const meta = {
  title: "Overlays/Dialog",
  component: DialogDemo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof DialogDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
