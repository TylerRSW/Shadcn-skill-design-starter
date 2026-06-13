import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { LabelDemo } from "./label-demo"

const meta = {
  title: "Forms/Label",
  component: LabelDemo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof LabelDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
