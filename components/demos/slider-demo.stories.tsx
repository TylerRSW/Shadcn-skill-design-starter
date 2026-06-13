import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { SliderDemo } from "./slider-demo"

const meta = {
  title: "Forms/Slider",
  component: SliderDemo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof SliderDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
