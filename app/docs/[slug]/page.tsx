import fs from "node:fs"
import path from "node:path"

import { notFound } from "next/navigation"

import { componentDocs } from "@/lib/component-docs"
import { componentDetails } from "@/lib/component-details"
import { ComponentPreview, CodeBlock } from "@/components/component-preview"
import { ComponentDocsSections } from "@/components/component-docs-sections"
import { DocHeader } from "@/components/doc-header"
import { Separator } from "@/components/ui/separator"

export function generateStaticParams() {
  return Object.keys(componentDocs).map((slug) => ({ slug }))
}

// Read the demo's real source so the Code tab always matches what renders.
function readDemoSource(slug: string) {
  try {
    const file = path.join(
      process.cwd(),
      "components",
      "demos",
      `${slug}-demo.tsx`
    )
    return fs.readFileSync(file, "utf8").replace(/^"use client"\s*\n+/, "")
  } catch {
    return ""
  }
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const doc = componentDocs[slug]

  if (!doc) {
    notFound()
  }

  const { title, description, install, Demo } = doc
  const detail = componentDetails[slug]
  const code = readDemoSource(slug)

  return (
    <article className="flex flex-col gap-8">
      <DocHeader eyebrow="Components" title={title} description={description} />

      <Separator />

      <ComponentPreview code={code}>
        <Demo />
      </ComponentPreview>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Installation</h2>
        <CodeBlock>{install}</CodeBlock>
      </section>

      {detail ? (
        <>
          <Separator />
          <ComponentDocsSections detail={detail} />
        </>
      ) : null}
    </article>
  )
}
