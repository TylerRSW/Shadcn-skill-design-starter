import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function InputDemo() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="you@example.com" />
      </div>
      <Input type="search" placeholder="Search projects..." aria-label="Search projects" />
      <Input type="file" aria-label="Upload file" />
      <Input placeholder="Disabled" aria-label="Disabled input" disabled />
    </div>
  )
}
