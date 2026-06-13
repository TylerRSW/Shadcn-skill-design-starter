import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { DatePickerDemo } from "./date-picker-demo"

const meta = {
  title: "Forms/Date Picker",
  component: DatePickerDemo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof DatePickerDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
