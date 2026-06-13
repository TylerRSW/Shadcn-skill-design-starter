"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

import type { ColorToken } from "@/lib/tokens"
import { cn } from "@/lib/utils"

export function ColorSwatch({ token }: { token: ColorToken }) {
  const [copied, setCopied] = useState(false)

  function copy() {
    navigator.clipboard.writeText(token.hex)
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="group flex flex-col gap-2 text-left"
      aria-label={`Copy ${token.hex} for ${token.name}`}
    >
      <div
        className={cn(
          "relative flex h-16 w-full items-center justify-end rounded-lg border border-border p-2",
          token.className
        )}
      >
        <span className="rounded-md bg-background/80 p-1 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
          {copied ? (
            <Check className="size-3.5" />
          ) : (
            <Copy className="size-3.5" />
          )}
        </span>
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-medium">{token.name}</span>
        <span className="font-mono text-xs text-muted-foreground">
          {token.hex}
        </span>
        {token.note ? (
          <span className="text-xs text-muted-foreground">{token.note}</span>
        ) : null}
      </div>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? `Copied ${token.hex}` : ""}
      </span>
    </button>
  )
}
