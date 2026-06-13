import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { TextareaDemo } from "./textarea-demo"

const meta = {
  title: "Forms/Textarea",
  component: TextareaDemo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof TextareaDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
