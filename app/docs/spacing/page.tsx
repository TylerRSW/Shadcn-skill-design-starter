import { spacingSteps } from "@/lib/tokens"
import { DocHeader } from "@/components/doc-header"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

export const metadata = { title: "Spacing — Design Tokens" }

export default function SpacingPage() {
  return (
    <article className="flex flex-col gap-8">
      <DocHeader
        eyebrow="Design Tokens"
        title="Spacing"
        description={
          <>
            The 4px base scale. One step = 4px. Drives{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              gap-*
            </code>
            ,{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              p-*
            </code>
            ,{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              m-*
            </code>
            , and sizing utilities.
          </>
        }
      />

      <Separator />

      <div className="flex flex-col gap-3">
        {spacingSteps.map((s) => (
          <div key={s.step} className="flex items-center gap-4">
            <span className="w-10 shrink-0 font-mono text-xs text-muted-foreground">
              {s.step}
            </span>
            <div className={cn("h-4 shrink-0 rounded-sm bg-primary", s.className)} />
            <span className="font-mono text-xs text-muted-foreground">
              {s.px}px
            </span>
          </div>
        ))}
      </div>
    </article>
  )
}
