import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { RadioGroupDemo } from "./radio-group-demo"

const meta = {
  title: "Forms/Radio Group",
  component: RadioGroupDemo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof RadioGroupDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
