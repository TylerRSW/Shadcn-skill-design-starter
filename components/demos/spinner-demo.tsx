import { Spinner } from "@/components/ui/spinner"

export function SpinnerDemo() {
  return (
    <div className="flex items-center gap-6">
      <Spinner />
      <Spinner className="size-6 text-muted-foreground" />
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Spinner />
        Loading...
      </div>
    </div>
  )
}
