import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, screen } from "storybook/test"

import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "./select"

const meta = {
  title: "Forms/Select",
  component: Select,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  render: () => (
    <Select>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Pick a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="cherry">Cherry</SelectItem>
      </SelectContent>
    </Select>
  ),
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const SelectOption: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("combobox"))
    const option = await screen.findByRole("option", { name: "Banana" })
    await userEvent.click(option)
    await expect(canvas.getByRole("combobox")).toHaveTextContent("Banana")
  },
}
