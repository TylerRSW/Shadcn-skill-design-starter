import { borderWidths } from "@/lib/tokens"
import { DocHeader } from "@/components/doc-header"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

export const metadata = { title: "Border Width — Design Tokens" }

export default function BorderWidthPage() {
  return (
    <article className="flex flex-col gap-8">
      <DocHeader
        eyebrow="Design Tokens"
        title="Border Width"
        description="The border-width scale. Each value also has directional variants (border-x, border-t, border-s, …)."
      />

      <Separator />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {borderWidths.map((b) => (
          <div key={b.name} className="flex flex-col gap-2">
            <div
              className={cn(
                "h-20 w-full rounded-lg border-border bg-muted",
                b.className
              )}
            />
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium">{b.name}</span>
              <span className="font-mono text-xs text-muted-foreground">
                {b.px}px
              </span>
            </div>
          </div>
        ))}
      </div>
    </article>
  )
}
