import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { DataTableDemo } from "./data-table-demo"

const meta = {
  title: "Data Display/Data Table",
  component: DataTableDemo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof DataTableDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
