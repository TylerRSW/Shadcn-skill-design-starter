import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { SheetDemo } from "./sheet-demo"

const meta = {
  title: "Overlays/Sheet",
  component: SheetDemo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof SheetDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
