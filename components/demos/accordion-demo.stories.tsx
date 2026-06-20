import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { AccordionDemo } from "./accordion-demo"

const meta = {
  title: "Data Display/Accordion",
  component: AccordionDemo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof AccordionDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
