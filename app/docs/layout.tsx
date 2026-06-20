import { DocsSidebar } from "@/components/docs-sidebar"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col gap-10 md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-12">
        <aside className="border-b border-border py-6 md:sticky md:top-14 md:h-[calc(100vh-3.5rem)] md:overflow-y-auto md:border-b-0 md:border-r md:py-8 md:pr-4">
          <DocsSidebar />
        </aside>
        <main className="min-w-0 py-8 md:py-10">
          <div className="mx-auto max-w-3xl">{children}</div>
        </main>
      </div>
    </div>
  )
}
