"use client"

import { ThemeProvider } from "next-themes"

/**
 * Client-side provider tree. Wrap {children} in app/layout.tsx.
 * Add additional context providers (query client, etc.) inside here.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
}
