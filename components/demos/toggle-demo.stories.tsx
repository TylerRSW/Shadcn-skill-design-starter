import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ToggleDemo } from "./toggle-demo"

const meta = {
  title: "Forms/Toggle",
  component: ToggleDemo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof ToggleDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
