import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { InputOtpDemo } from "./input-otp-demo"

const meta = {
  title: "Forms/Input Otp",
  component: InputOtpDemo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof InputOtpDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
