import Link from "next/link"

import { docsNav } from "@/lib/registry"
import { Separator } from "@/components/ui/separator"

export default function DocsIntroPage() {
  const components = docsNav.find((g) => g.title === "Components")?.items ?? []

  return (
    <article className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted-foreground">
          Getting Started
        </p>
        <h1 className="text-3xl font-bold tracking-tight">Introduction</h1>
        <p className="text-lg text-muted-foreground">
          A component documentation site built with Next.js, shadcn/ui, and
          Tailwind CSS v4 — driven by Figma-exported design tokens.
        </p>
      </div>

      <Separator />

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Design Tokens</h2>
        <p className="text-muted-foreground">
          Start with the{" "}
          <Link href="/docs/colors" className="font-medium underline underline-offset-4">
            color tokens
          </Link>{" "}
          — the source of truth for every color in the system.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Components</h2>
        <p className="text-muted-foreground">
          Browse the documented components. Each page shows a live preview, the
          source, and the install command.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {components.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl border border-border p-4 transition-colors hover:bg-accent"
            >
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-sm text-muted-foreground">
                View the {item.title} documentation
              </p>
            </Link>
          ))}
        </div>
      </section>
    </article>
  )
}
