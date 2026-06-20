import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { CheckboxDemo } from "./checkbox-demo"

const meta = {
  title: "Forms/Checkbox",
  component: CheckboxDemo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof CheckboxDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
