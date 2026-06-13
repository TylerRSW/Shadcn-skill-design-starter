import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ChartDemo } from "./chart-demo"

const meta = {
  title: "Data Display/Chart",
  component: ChartDemo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof ChartDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
