export default function Home() {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-16">
      <div className="flex flex-col gap-3">
        <span className="text-sm font-medium text-muted-foreground">
          Next.js · shadcn/ui · Tailwind CSS v4 · Figma
        </span>
        <h1 className="text-4xl font-bold tracking-tight">
          Create Skill Design
        </h1>
        <p className="max-w-2xl text-base leading-6 text-muted-foreground">
          Design-token-driven UI system. Tokens live in{" "}
          <code className="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-sm">
            .claude/skills/shadcn-ui-design/references/DESIGN.md
          </code>{" "}
          and are wired into{" "}
          <code className="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-sm">
            app/globals.css
          </code>
          . Install components with{" "}
          <code className="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-sm">
            npx shadcn@latest add &lt;name&gt;
          </code>
          .
        </p>
      </div>

      {/* Semantic token swatches — proves the token pipeline renders */}
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {[
          { label: "primary", className: "bg-primary text-primary-foreground" },
          { label: "secondary", className: "bg-secondary text-secondary-foreground" },
          { label: "muted", className: "bg-muted text-muted-foreground" },
          { label: "accent", className: "bg-accent text-accent-foreground" },
          { label: "destructive", className: "bg-destructive text-white" },
          { label: "card", className: "bg-card text-card-foreground border border-border" },
          { label: "sidebar", className: "bg-sidebar text-sidebar-foreground border border-sidebar-border" },
          { label: "chart-2", className: "bg-chart-2 text-white" },
        ].map((s) => (
          <div
            key={s.label}
            className={`flex h-20 items-end rounded-lg p-3 text-sm font-medium ${s.className}`}
          >
            {s.label}
          </div>
        ))}
      </div>
    </main>
  )
}
