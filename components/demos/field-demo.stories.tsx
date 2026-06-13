import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { FieldDemo } from "./field-demo"

const meta = {
  title: "Forms/Field",
  component: FieldDemo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof FieldDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
