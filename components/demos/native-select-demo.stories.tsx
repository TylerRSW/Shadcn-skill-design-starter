import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { NativeSelectDemo } from "./native-select-demo"

const meta = {
  title: "Forms/Native Select",
  component: NativeSelectDemo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof NativeSelectDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
