import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { SliderDemo } from "./slider-demo"

const meta = {
  title: "Forms/Slider",
  component: SliderDemo,
  parameters: {
    layout: "centered",
    // Documented a11y exception(s) — see scripts/gen-stories.mjs A11Y_OFF.
    a11y: {
      config: {
        rules: [
        // shadcn Slider does not forward aria-label to the thumb; not fixable from demo without editing components/ui
        { id: "aria-input-field-name", enabled: false },
        ],
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SliderDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
