import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ButtonGroupDemo } from "./button-group-demo"

const meta = {
  title: "Forms/Button Group",
  component: ButtonGroupDemo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof ButtonGroupDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
