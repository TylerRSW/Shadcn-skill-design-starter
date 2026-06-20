import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { SwitchDemo } from "./switch-demo"

const meta = {
  title: "Forms/Switch",
  component: SwitchDemo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof SwitchDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
