import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { TabsDemo } from "./tabs-demo"

const meta = {
  title: "Data Display/Tabs",
  component: TabsDemo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof TabsDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
