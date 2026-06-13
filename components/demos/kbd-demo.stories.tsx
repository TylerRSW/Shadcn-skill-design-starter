import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { KbdDemo } from "./kbd-demo"

const meta = {
  title: "Data Display/Kbd",
  component: KbdDemo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof KbdDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
