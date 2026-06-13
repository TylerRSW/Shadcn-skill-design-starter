import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function AlertDemo() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <Alert>
        <CheckCircle2Icon />
        <AlertTitle>Changes saved</AlertTitle>
        <AlertDescription>
          Your profile has been updated successfully.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>Unable to process payment</AlertTitle>
        <AlertDescription>
          Please verify your billing information and try again.
        </AlertDescription>
      </Alert>
    </div>
  )
}
