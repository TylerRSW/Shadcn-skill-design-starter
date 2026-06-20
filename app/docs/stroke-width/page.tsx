import { Square } from "lucide-react"

import { strokeWidths } from "@/lib/tokens"
import { DocHeader } from "@/components/doc-header"
import { Separator } from "@/components/ui/separator"

export const metadata = { title: "Stroke Width — Design Tokens" }

export default function StrokeWidthPage() {
  return (
    <article className="flex flex-col gap-8">
      <DocHeader
        eyebrow="Design Tokens"
        title="Stroke Width"
        description="Icon stroke weights. lucide-react icons accept a strokeWidth prop; the default is 2."
      />

      <Separator />

      <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-6">
        {strokeWidths.map((s) => (
          <div
            key={s.label}
            className="flex flex-col items-center gap-2 rounded-xl border border-border p-4"
          >
            <Square className="size-10" strokeWidth={s.value} />
            <span className="font-mono text-xs text-muted-foreground">
              stroke-{s.label}
            </span>
          </div>
        ))}
      </div>
    </article>
  )
}
