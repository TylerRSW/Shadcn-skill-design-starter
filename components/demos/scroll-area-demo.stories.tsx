import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ScrollAreaDemo } from "./scroll-area-demo"

const meta = {
  title: "Data Display/Scroll Area",
  component: ScrollAreaDemo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof ScrollAreaDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
