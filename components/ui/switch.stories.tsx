import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import { Switch } from "./switch"
import { Label } from "./label"

const meta = {
  title: "Forms/Switch",
  component: Switch,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    defaultChecked: {
      control: "boolean",
      description: "Uncontrolled initial on/off state.",
    },
    disabled: {
      control: "boolean",
      description: "Disables the switch.",
      table: { defaultValue: { summary: "false" } },
    },
  },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Switch id="airplane" {...args} />
      <Label htmlFor="airplane">Airplane mode</Label>
    </div>
  ),
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
export const On: Story = { args: { defaultChecked: true } }
export const Disabled: Story = { args: { disabled: true } }

export const Toggle: Story = {
  play: async ({ canvas, userEvent }) => {
    const sw = canvas.getByRole("switch")
    await expect(sw).not.toBeChecked()
    await userEvent.click(sw)
    await expect(sw).toBeChecked()
  },
}
