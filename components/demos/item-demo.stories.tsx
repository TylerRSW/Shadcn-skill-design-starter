import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ItemDemo } from "./item-demo"

const meta = {
  title: "Data Display/Item",
  component: ItemDemo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof ItemDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
