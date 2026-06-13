import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { EmptyDemo } from "./empty-demo"

const meta = {
  title: "Feedback/Empty",
  component: EmptyDemo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof EmptyDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
