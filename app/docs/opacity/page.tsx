import { opacities } from "@/lib/tokens"
import { DocHeader } from "@/components/doc-header"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

export const metadata = { title: "Opacity — Design Tokens" }

export default function OpacityPage() {
  return (
    <article className="flex flex-col gap-8">
      <DocHeader
        eyebrow="Design Tokens"
        title="Opacity"
        description="Steps 0–100 in increments of 5. Combine with any utility, e.g. bg-primary/50 or opacity-50."
      />

      <Separator />

      <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-7">
        {opacities.map((o) => (
          <div key={o.value} className="flex flex-col gap-2">
            <div className="h-16 w-full overflow-hidden rounded-lg border border-border bg-background">
              <div className={cn("size-full bg-primary", o.className)} />
            </div>
            <span className="font-mono text-xs text-muted-foreground">
              {o.className}
            </span>
          </div>
        ))}
      </div>
    </article>
  )
}
