import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { SelectDemo } from "./select-demo"

const meta = {
  title: "Forms/Select",
  component: SelectDemo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof SelectDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
