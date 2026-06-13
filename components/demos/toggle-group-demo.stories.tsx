import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ToggleGroupDemo } from "./toggle-group-demo"

const meta = {
  title: "Forms/Toggle Group",
  component: ToggleGroupDemo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof ToggleGroupDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
