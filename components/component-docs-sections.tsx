import type { ComponentDetail } from "@/lib/component-details"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

/**
 * Renders the full component documentation (deliverable 2) from a structured
 * ComponentDetail: Anatomy, Props/API, Variants, States, Usage do/don't,
 * Accessibility, and Token mapping.
 *
 * Pure React + semantic-token styling — no Next- or Storybook-specific imports,
 * so the same component renders in the docs site and in Storybook autodocs.
 */

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl font-semibold tracking-tight">{children}</h2>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-4">
      <SectionHeading>{title}</SectionHeading>
      {children}
    </section>
  )
}

export function ComponentDocsSections({ detail }: { detail: ComponentDetail }) {
  return (
    <div className="flex flex-col gap-10">
      {detail.overview ? (
        <p className="text-muted-foreground text-base leading-7">
          {detail.overview}
        </p>
      ) : null}

      <Section title="Anatomy">
        <ul className="flex flex-col gap-2">
          {detail.anatomy.map((part) => (
            <li key={part} className="flex gap-2 text-sm leading-6">
              <span className="text-muted-foreground select-none">—</span>
              <span>{part}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Props / API">
        <div className="overflow-x-auto rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[22%]">Prop</TableHead>
                <TableHead className="w-[34%]">Type</TableHead>
                <TableHead className="w-[12%]">Default</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {detail.props.map((prop) => (
                <TableRow key={prop.name}>
                  <TableCell className="font-mono text-xs font-medium">
                    {prop.name}
                  </TableCell>
                  <TableCell className="text-muted-foreground font-mono text-xs">
                    {prop.type}
                  </TableCell>
                  <TableCell className="text-muted-foreground font-mono text-xs">
                    {prop.default ?? "—"}
                  </TableCell>
                  <TableCell className="text-sm">{prop.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Section>

      {detail.variants?.length ? (
        <Section title="Variants">
          <ul className="flex flex-col gap-2">
            {detail.variants.map((variant) => (
              <li
                key={variant}
                className="text-muted-foreground font-mono text-sm leading-6"
              >
                {variant}
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <Section title="States">
        <div className="overflow-x-auto rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[28%]">State</TableHead>
                <TableHead>Behaviour</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {detail.states.map((state) => (
                <TableRow key={state.name}>
                  <TableCell className="font-mono text-xs font-medium">
                    {state.name}
                  </TableCell>
                  <TableCell className="text-sm">{state.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Section>

      <Section title="Usage">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-3 rounded-lg border border-border p-4">
            <h3 className="text-sm font-semibold text-primary">Do</h3>
            <ul className="flex flex-col gap-2">
              {detail.usage.do.map((item) => (
                <li key={item} className="flex gap-2 text-sm leading-6">
                  <span aria-hidden className="select-none text-primary">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-3 rounded-lg border border-border p-4">
            <h3 className="text-sm font-semibold text-destructive">Don&apos;t</h3>
            <ul className="flex flex-col gap-2">
              {detail.usage.dont.map((item) => (
                <li key={item} className="flex gap-2 text-sm leading-6">
                  <span aria-hidden className="select-none text-destructive">
                    ✗
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Accessibility">
        <ul className="flex flex-col gap-2">
          {detail.a11y.map((note) => (
            <li key={note} className="flex gap-2 text-sm leading-6">
              <span className="text-muted-foreground select-none">—</span>
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Token mapping">
        <div className="overflow-x-auto rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[45%]">Token</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {detail.tokens.map((token) => (
                <TableRow key={token.token}>
                  <TableCell className="font-mono text-xs font-medium">
                    {token.token}
                  </TableCell>
                  <TableCell className="text-sm">{token.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Section>
    </div>
  )
}
