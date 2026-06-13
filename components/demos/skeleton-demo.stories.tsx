import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { SkeletonDemo } from "./skeleton-demo"

const meta = {
  title: "Feedback/Skeleton",
  component: SkeletonDemo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof SkeletonDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
