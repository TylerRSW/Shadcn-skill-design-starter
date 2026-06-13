import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { CollapsibleDemo } from "./collapsible-demo"

const meta = {
  title: "Data Display/Collapsible",
  component: CollapsibleDemo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof CollapsibleDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
