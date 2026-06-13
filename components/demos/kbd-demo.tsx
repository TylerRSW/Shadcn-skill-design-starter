import { Kbd, KbdGroup } from "@/components/ui/kbd"

export function KbdDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <span className="text-muted-foreground text-sm">+</span>
        <Kbd>B</Kbd>
      </KbdGroup>
      <p className="text-muted-foreground text-sm">
        Press <Kbd>⇧</Kbd> <Kbd>⌘</Kbd> <Kbd>P</Kbd> to open the command palette.
      </p>
    </div>
  )
}
