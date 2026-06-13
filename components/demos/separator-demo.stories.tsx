import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { SeparatorDemo } from "./separator-demo"

const meta = {
  title: "Data Display/Separator",
  component: SeparatorDemo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof SeparatorDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
