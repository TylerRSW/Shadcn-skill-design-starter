import { BadgeCheck, Clock } from "lucide-react"

import { Badge } from "@/components/ui/badge"

export function BadgeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="secondary">
        <BadgeCheck />
        Verified
      </Badge>
      <Badge variant="outline">
        <Clock />
        Pending
      </Badge>
    </div>
  )
}
