import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { CommandDemo } from "./command-demo"

const meta = {
  title: "Overlays/Command",
  component: CommandDemo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof CommandDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
