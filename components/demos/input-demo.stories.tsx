import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { InputDemo } from "./input-demo"

const meta = {
  title: "Forms/Input",
  component: InputDemo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof InputDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
