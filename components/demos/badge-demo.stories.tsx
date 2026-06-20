import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { BadgeDemo } from "./badge-demo"

const meta = {
  title: "Feedback/Badge",
  component: BadgeDemo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof BadgeDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
