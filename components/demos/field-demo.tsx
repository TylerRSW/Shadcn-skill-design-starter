import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function FieldDemo() {
  return (
    <FieldGroup className="w-full max-w-sm">
      <Field>
        <FieldLabel htmlFor="field-demo-name">Name</FieldLabel>
        <Input id="field-demo-name" placeholder="Ada Lovelace" />
        <FieldDescription>This will appear on your profile.</FieldDescription>
      </Field>
      <Field>
        <FieldLabel htmlFor="field-demo-plan">Plan</FieldLabel>
        <Select defaultValue="pro">
          <SelectTrigger id="field-demo-plan">
            <SelectValue placeholder="Select a plan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="free">Free</SelectItem>
            <SelectItem value="pro">Pro</SelectItem>
            <SelectItem value="team">Team</SelectItem>
          </SelectContent>
        </Select>
        <FieldDescription>Upgrade or downgrade anytime.</FieldDescription>
      </Field>
    </FieldGroup>
  )
}
