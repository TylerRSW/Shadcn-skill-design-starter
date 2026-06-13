import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { PaginationDemo } from "./pagination-demo"

const meta = {
  title: "Data Display/Pagination",
  component: PaginationDemo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof PaginationDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
