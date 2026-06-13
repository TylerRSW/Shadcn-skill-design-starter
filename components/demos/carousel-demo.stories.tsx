import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { CarouselDemo } from "./carousel-demo"

const meta = {
  title: "Data Display/Carousel",
  component: CarouselDemo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof CarouselDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
