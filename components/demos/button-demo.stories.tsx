import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ButtonDemo } from "./button-demo"

const meta = {
  title: "Forms/Button",
  component: ButtonDemo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof ButtonDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
