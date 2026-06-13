import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { CalendarDemo } from "./calendar-demo"

const meta = {
  title: "Forms/Calendar",
  component: CalendarDemo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof CalendarDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
