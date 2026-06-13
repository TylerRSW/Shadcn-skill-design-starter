import { ArrowLeft, ArrowRight, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group"

export function ButtonGroupDemo() {
  return (
    <div className="flex flex-col gap-4">
      <ButtonGroup>
        <Button variant="outline">
          <ArrowLeft />
          Previous
        </Button>
        <Button variant="outline">
          Next
          <ArrowRight />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <ButtonGroupText>https://</ButtonGroupText>
        <ButtonGroupSeparator />
        <Button variant="outline">
          <Plus />
          Add
        </Button>
      </ButtonGroup>
    </div>
  )
}
