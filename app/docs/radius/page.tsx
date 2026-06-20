import { radiusTokens } from "@/lib/tokens"
import { DocHeader } from "@/components/doc-header"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

export const metadata = { title: "Radius — Design Tokens" }

export default function RadiusPage() {
  return (
    <article className="flex flex-col gap-8">
      <DocHeader
        eyebrow="Design Tokens"
        title="Radius"
        description={
          <>
            The corner-radius scale. Apply with the{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              rounded-*
            </code>{" "}
            utilities.
          </>
        }
      />

      <Separator />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {radiusTokens.map((r) => (
          <div key={r.name} className="flex flex-col gap-2">
            <div
              className={cn(
                "h-20 w-full border border-border bg-muted",
                r.className
              )}
            />
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium">{r.className}</span>
              <span className="font-mono text-xs text-muted-foreground">
                {r.value}
              </span>
              <span className="text-xs text-muted-foreground">{r.use}</span>
            </div>
          </div>
        ))}
      </div>
    </article>
  )
}
