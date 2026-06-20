import { colorGroups } from "@/lib/tokens"
import { ColorSwatch } from "@/components/color-swatch"
import { DocHeader } from "@/components/doc-header"
import { Separator } from "@/components/ui/separator"

export const metadata = {
  title: "Colors — Design Tokens",
}

export default function ColorsPage() {
  return (
    <article className="flex flex-col gap-8">
      <DocHeader
        eyebrow="Design Tokens"
        title="Colors"
        description={
          <>
            Every semantic color token in the system, sourced from{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              app/globals.css
            </code>
            . Use the Tailwind class — never a raw hex. Click a swatch to copy
            its value.
          </>
        }
      />

      <Separator />

      {colorGroups.map((group) => (
        <section key={group.title} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold tracking-tight">
              {group.title}
            </h2>
            <p className="text-sm text-muted-foreground">{group.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {group.tokens.map((token) => (
              <ColorSwatch key={token.variable} token={token} />
            ))}
          </div>
        </section>
      ))}
    </article>
  )
}
