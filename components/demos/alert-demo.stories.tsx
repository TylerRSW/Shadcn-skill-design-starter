import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { AlertDemo } from "./alert-demo"

const meta = {
  title: "Feedback/Alert",
  component: AlertDemo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof AlertDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
