import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import { Checkbox } from "./checkbox"
import { Label } from "./label"

const meta = {
  title: "Forms/Checkbox",
  component: Checkbox,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    defaultChecked: {
      control: "boolean",
      description: "Uncontrolled initial checked state.",
    },
    disabled: {
      control: "boolean",
      description: "Disables the checkbox (not focusable, reduced opacity).",
      table: { defaultValue: { summary: "false" } },
    },
    required: {
      control: "boolean",
      description: "Marks the checkbox as required in a form.",
    },
  },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" {...args} />
      <Label htmlFor="terms">Accept terms</Label>
    </div>
  ),
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
export const Checked: Story = { args: { defaultChecked: true } }
export const Disabled: Story = { args: { disabled: true } }

export const Toggle: Story = {
  play: async ({ canvas, userEvent }) => {
    const box = canvas.getByRole("checkbox")
    await expect(box).not.toBeChecked()
    await userEvent.click(box)
    await expect(box).toBeChecked()
  },
}
