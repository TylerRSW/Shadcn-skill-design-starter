import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { BreadcrumbDemo } from "./breadcrumb-demo"

const meta = {
  title: "Data Display/Breadcrumb",
  component: BreadcrumbDemo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof BreadcrumbDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
