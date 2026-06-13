import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import { Input } from "./input"
import { Label } from "./label"

const meta = {
  title: "Forms/Input",
  component: Input,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    type: { control: "select", options: ["text", "email", "password", "number"] },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
  },
  args: { placeholder: "Email", type: "email" },
  render: (args) => <Input {...args} className="w-64" />,
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Disabled: Story = { args: { disabled: true, value: "disabled" } }

export const WithLabel: Story = {
  render: (args) => (
    <div className="flex w-64 flex-col gap-2">
      <Label htmlFor="email">Email</Label>
      <Input {...args} id="email" />
    </div>
  ),
}

export const Typing: Story = {
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole("textbox")
    await userEvent.type(input, "hello@team.dev")
    await expect(input).toHaveValue("hello@team.dev")
  },
}
