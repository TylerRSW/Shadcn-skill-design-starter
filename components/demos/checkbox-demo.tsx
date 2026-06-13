import { Checkbox } from "@/components/ui/checkbox"

export function CheckboxDemo() {
  return (
    <div className="flex max-w-sm flex-col gap-4">
      <div className="flex items-center gap-3">
        <Checkbox id="terms" />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Accept terms and conditions
        </label>
      </div>
      <div className="flex items-start gap-3">
        <Checkbox id="newsletter" defaultChecked />
        <div className="grid gap-1.5">
          <label
            htmlFor="newsletter"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Subscribe to newsletter
          </label>
          <p className="text-sm text-muted-foreground">
            Get product updates and announcements in your inbox.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Checkbox id="disabled" disabled />
        <label
          htmlFor="disabled"
          className="text-sm font-medium leading-none opacity-70"
        >
          Enable notifications
        </label>
      </div>
    </div>
  )
}
