import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { TableDemo } from "./table-demo"

const meta = {
  title: "Data Display/Table",
  component: TableDemo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof TableDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
