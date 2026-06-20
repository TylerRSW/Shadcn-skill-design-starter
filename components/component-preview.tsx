import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ComponentPreview({
  children,
  code,
}: {
  children: React.ReactNode
  code: string
}) {
  return (
    <Tabs defaultValue="preview" className="w-full gap-4">
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="preview">
        <div className="flex min-h-[350px] w-full items-center justify-center rounded-xl border border-border p-10">
          {children}
        </div>
      </TabsContent>
      <TabsContent value="code">
        <div className="overflow-x-auto rounded-xl border border-border bg-muted/50">
          <pre className="p-4 text-sm leading-6">
            <code className="font-mono">{code}</code>
          </pre>
        </div>
      </TabsContent>
    </Tabs>
  )
}

export function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-muted/50">
      <pre className="p-4 text-sm leading-6">
        <code className="font-mono">{children}</code>
      </pre>
    </div>
  )
}
