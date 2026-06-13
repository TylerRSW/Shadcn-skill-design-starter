import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { SonnerDemo } from "./sonner-demo"

const meta = {
  title: "Feedback/Sonner",
  component: SonnerDemo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof SonnerDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
