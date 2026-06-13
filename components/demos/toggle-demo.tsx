import { Bold, Italic, Underline } from "lucide-react"

import { Toggle } from "@/components/ui/toggle"

export function ToggleDemo() {
  return (
    <div className="flex items-center gap-2">
      <Toggle aria-label="Toggle bold">
        <Bold />
      </Toggle>
      <Toggle variant="outline" aria-label="Toggle italic">
        <Italic />
      </Toggle>
      <Toggle aria-label="Toggle underline">
        <Underline />
        Underline
      </Toggle>
      <Toggle aria-label="Toggle disabled" disabled>
        <Bold />
      </Toggle>
    </div>
  )
}
