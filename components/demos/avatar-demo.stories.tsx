import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { AvatarDemo } from "./avatar-demo"

const meta = {
  title: "Data Display/Avatar",
  component: AvatarDemo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof AvatarDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
