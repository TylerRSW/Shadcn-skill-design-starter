import { Send } from "lucide-react"

import { Button } from "@/components/ui/button"

export function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button>
        <Send /> Send
      </Button>
      <Button variant="outline" size="icon" aria-label="Send">
        <Send />
      </Button>
      <Button disabled>Disabled</Button>
    </div>
  )
}
