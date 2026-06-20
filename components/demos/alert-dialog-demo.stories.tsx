import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { AlertDialogDemo } from "./alert-dialog-demo"

const meta = {
  title: "Overlays/Alert Dialog",
  component: AlertDialogDemo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof AlertDialogDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
