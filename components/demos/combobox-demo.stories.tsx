import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ComboboxDemo } from "./combobox-demo"

const meta = {
  title: "Forms/Combobox",
  component: ComboboxDemo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof ComboboxDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
