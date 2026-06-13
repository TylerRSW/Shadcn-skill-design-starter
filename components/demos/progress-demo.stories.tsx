import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ProgressDemo } from "./progress-demo"

const meta = {
  title: "Feedback/Progress",
  component: ProgressDemo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof ProgressDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
