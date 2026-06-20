import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Badge } from "./badge"

const meta = {
  title: "Feedback/Badge",
  component: Badge,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline"],
      description: "Visual style / emphasis.",
      table: { defaultValue: { summary: "default" } },
    },
    asChild: {
      control: "boolean",
      description: "Render as the child element (e.g. an <a>) while keeping badge styles.",
    },
    children: { control: "text", description: "Badge label." },
  },
  args: { children: "Badge" },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge {...args} variant="default">Default</Badge>
      <Badge {...args} variant="secondary">Secondary</Badge>
      <Badge {...args} variant="destructive">Destructive</Badge>
      <Badge {...args} variant="outline">Outline</Badge>
    </div>
  ),
}
