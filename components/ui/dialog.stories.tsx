import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, screen } from "storybook/test"

import { Button } from "./button"
import {
  Dialog, DialogContent, DialogDescription,
  DialogHeader, DialogTitle, DialogTrigger,
} from "./dialog"

const meta = {
  title: "Overlays/Dialog",
  component: Dialog,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    defaultOpen: {
      control: "boolean",
      description: "Open the dialog by default (uncontrolled).",
    },
    modal: {
      control: "boolean",
      description: "Block interaction with content outside the dialog.",
      table: { defaultValue: { summary: "true" } },
    },
  },
  render: (args) => (
    <Dialog defaultOpen={args.defaultOpen} modal={args.modal}>
      <DialogTrigger asChild>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Make changes to your profile here.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  ),
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Opens: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Open dialog" }))
    // findByRole waits for the portal to mount → proves it opened on click.
    await expect(await screen.findByRole("dialog")).toBeInTheDocument()
    await expect(screen.getByText("Edit profile")).toBeInTheDocument()
  },
}
