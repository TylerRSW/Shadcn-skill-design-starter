import {
  fontFamilies,
  fontSizes,
  fontWeights,
  leadings,
  trackings,
} from "@/lib/tokens"
import { DocHeader } from "@/components/doc-header"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

export const metadata = { title: "Typography — Design Tokens" }

function Meta({ children }: { children: React.ReactNode }) {
  return (
    <span className="shrink-0 font-mono text-xs text-muted-foreground">
      {children}
    </span>
  )
}

export default function TypographyPage() {
  return (
    <article className="flex flex-col gap-8">
      <DocHeader
        eyebrow="Design Tokens"
        title="Typography"
        description="Font families, sizes, weights, line height, and letter spacing — the full type scale from the Figma export."
      />

      <Separator />

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Font family</h2>
        <div className="flex flex-col divide-y divide-border rounded-xl border border-border">
          {fontFamilies.map((f) => (
            <div
              key={f.name}
              className="flex items-baseline justify-between gap-4 p-4"
            >
              <span className={cn("text-2xl", f.className)}>
                The quick brown fox
              </span>
              <div className="flex shrink-0 flex-col items-end">
                <Meta>{f.className}</Meta>
                <Meta>{f.value}</Meta>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Font size</h2>
        <div className="flex flex-col divide-y divide-border rounded-xl border border-border">
          {fontSizes.map((s) => (
            <div
              key={s.name}
              className="flex items-center justify-between gap-4 overflow-hidden p-4"
            >
              <span className={cn("truncate leading-none", s.className)}>
                Ag
              </span>
              <div className="flex shrink-0 flex-col items-end">
                <Meta>{s.className}</Meta>
                <Meta>{s.px}px</Meta>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Font weight</h2>
        <div className="flex flex-col divide-y divide-border rounded-xl border border-border">
          {fontWeights.map((w) => (
            <div
              key={w.name}
              className="flex items-baseline justify-between gap-4 p-4"
            >
              <span className={cn("text-xl", w.className)}>
                The quick brown fox
              </span>
              <div className="flex shrink-0 flex-col items-end">
                <Meta>font-{w.name}</Meta>
                <Meta>{w.value}</Meta>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Line height</h2>
        <div className="flex flex-col divide-y divide-border rounded-xl border border-border">
          {leadings.map((l) => (
            <div
              key={l.name}
              className="flex items-start justify-between gap-4 p-4"
            >
              <p className={cn("max-w-md text-sm", l.className)}>
                The quick brown fox jumps over the lazy dog. The quick brown fox
                jumps over the lazy dog.
              </p>
              <div className="flex shrink-0 flex-col items-end">
                <Meta>{l.name}</Meta>
                <Meta>{l.px}px</Meta>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Letter spacing</h2>
        <div className="flex flex-col divide-y divide-border rounded-xl border border-border">
          {trackings.map((t) => (
            <div
              key={t.name}
              className="flex items-baseline justify-between gap-4 p-4"
            >
              <span className={cn("text-lg", t.className)}>
                The quick brown fox
              </span>
              <div className="flex shrink-0 flex-col items-end">
                <Meta>tracking-{t.name}</Meta>
                <Meta>{t.value}</Meta>
              </div>
            </div>
          ))}
        </div>
      </section>
    </article>
  )
}
