import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { SpinnerDemo } from "./spinner-demo"

const meta = {
  title: "Feedback/Spinner",
  component: SpinnerDemo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof SpinnerDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
