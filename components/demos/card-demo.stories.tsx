import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { CardDemo } from "./card-demo"

const meta = {
  title: "Data Display/Card",
  component: CardDemo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof CardDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
