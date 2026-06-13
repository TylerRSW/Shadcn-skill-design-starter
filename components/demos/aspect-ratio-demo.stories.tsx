import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { AspectRatioDemo } from "./aspect-ratio-demo"

const meta = {
  title: "Data Display/Aspect Ratio",
  component: AspectRatioDemo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof AspectRatioDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
