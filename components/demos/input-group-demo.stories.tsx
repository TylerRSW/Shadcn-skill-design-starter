import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { InputGroupDemo } from "./input-group-demo"

const meta = {
  title: "Forms/Input Group",
  component: InputGroupDemo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof InputGroupDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
