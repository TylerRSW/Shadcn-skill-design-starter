// Design tokens mirrored from app/globals.css + references/DESIGN.md.
// `className` fields hold FULL Tailwind class literals so the v4 scanner
// generates each utility — never build these by string interpolation.

/* ─────────────────────────── Colors ─────────────────────────── */

export type ColorToken = {
  name: string
  variable: string
  hex: string
  className: string
  note?: string
}

export type ColorGroup = {
  title: string
  description: string
  tokens: ColorToken[]
}

export const colorGroups: ColorGroup[] = [
  {
    title: "Base",
    description: "Page surface, text, and the structural lines used everywhere.",
    tokens: [
      { name: "background", variable: "--background", hex: "#ffffff", className: "bg-background", note: "white" },
      { name: "foreground", variable: "--foreground", hex: "#0a0a0a", className: "bg-foreground", note: "neutral/950" },
      { name: "border", variable: "--border", hex: "#e5e5e5", className: "bg-border", note: "neutral/200" },
      { name: "input", variable: "--input", hex: "#e5e5e5", className: "bg-input", note: "neutral/200" },
      { name: "ring", variable: "--ring", hex: "#737373", className: "bg-ring", note: "neutral/500" },
    ],
  },
  {
    title: "Surfaces",
    description: "Cards, popovers, and the text that sits on them.",
    tokens: [
      { name: "card", variable: "--card", hex: "#ffffff", className: "bg-card" },
      { name: "card-foreground", variable: "--card-foreground", hex: "#0a0a0a", className: "bg-card-foreground" },
      { name: "popover", variable: "--popover", hex: "#ffffff", className: "bg-popover" },
      { name: "popover-foreground", variable: "--popover-foreground", hex: "#0a0a0a", className: "bg-popover-foreground" },
    ],
  },
  {
    title: "Semantic",
    description: "Intent colors and their paired foregrounds.",
    tokens: [
      { name: "primary", variable: "--primary", hex: "#171717", className: "bg-primary", note: "neutral/900" },
      { name: "primary-foreground", variable: "--primary-foreground", hex: "#fafafa", className: "bg-primary-foreground", note: "neutral/50" },
      { name: "secondary", variable: "--secondary", hex: "#f5f5f5", className: "bg-secondary", note: "neutral/100" },
      { name: "secondary-foreground", variable: "--secondary-foreground", hex: "#0a0a0a", className: "bg-secondary-foreground" },
      { name: "muted", variable: "--muted", hex: "#f5f5f5", className: "bg-muted", note: "neutral/100" },
      { name: "muted-foreground", variable: "--muted-foreground", hex: "#737373", className: "bg-muted-foreground", note: "neutral/500" },
      { name: "accent", variable: "--accent", hex: "#f5f5f5", className: "bg-accent", note: "neutral/100" },
      { name: "accent-foreground", variable: "--accent-foreground", hex: "#171717", className: "bg-accent-foreground", note: "neutral/900" },
      { name: "destructive", variable: "--destructive", hex: "#dc2626", className: "bg-destructive", note: "red/600" },
    ],
  },
  {
    title: "Sidebar",
    description: "A dedicated palette for navigation shells.",
    tokens: [
      { name: "sidebar", variable: "--sidebar", hex: "#fafafa", className: "bg-sidebar", note: "neutral/50" },
      { name: "sidebar-foreground", variable: "--sidebar-foreground", hex: "#0a0a0a", className: "bg-sidebar-foreground" },
      { name: "sidebar-primary", variable: "--sidebar-primary", hex: "#171717", className: "bg-sidebar-primary" },
      { name: "sidebar-primary-foreground", variable: "--sidebar-primary-foreground", hex: "#fafafa", className: "bg-sidebar-primary-foreground" },
      { name: "sidebar-accent", variable: "--sidebar-accent", hex: "#f5f5f5", className: "bg-sidebar-accent" },
      { name: "sidebar-accent-foreground", variable: "--sidebar-accent-foreground", hex: "#171717", className: "bg-sidebar-accent-foreground" },
      { name: "sidebar-border", variable: "--sidebar-border", hex: "#e5e5e5", className: "bg-sidebar-border" },
      { name: "sidebar-ring", variable: "--sidebar-ring", hex: "#737373", className: "bg-sidebar-ring" },
    ],
  },
  {
    title: "Chart",
    description: "Sequential data-viz scale (Radix blue 8–12).",
    tokens: [
      { name: "chart-1", variable: "--chart-1", hex: "#5eb1ef", className: "bg-chart-1", note: "blue/8" },
      { name: "chart-2", variable: "--chart-2", hex: "#0090ff", className: "bg-chart-2", note: "blue/9" },
      { name: "chart-3", variable: "--chart-3", hex: "#0588f0", className: "bg-chart-3", note: "blue/10" },
      { name: "chart-4", variable: "--chart-4", hex: "#0d74ce", className: "bg-chart-4", note: "blue/11" },
      { name: "chart-5", variable: "--chart-5", hex: "#113264", className: "bg-chart-5", note: "blue/12" },
    ],
  },
]

/* ────────────────────────── Spacing ─────────────────────────── */

export type SpacingStep = { step: string; px: number; className: string }

// 1 step = 4px. `className` is the matching width utility (w-* === spacing scale).
export const spacingSteps: SpacingStep[] = [
  { step: "0.5", px: 2, className: "w-0.5" },
  { step: "1", px: 4, className: "w-1" },
  { step: "1.5", px: 6, className: "w-1.5" },
  { step: "2", px: 8, className: "w-2" },
  { step: "2.5", px: 10, className: "w-2.5" },
  { step: "3", px: 12, className: "w-3" },
  { step: "4", px: 16, className: "w-4" },
  { step: "5", px: 20, className: "w-5" },
  { step: "6", px: 24, className: "w-6" },
  { step: "7", px: 28, className: "w-7" },
  { step: "8", px: 32, className: "w-8" },
  { step: "10", px: 40, className: "w-10" },
  { step: "12", px: 48, className: "w-12" },
  { step: "14", px: 56, className: "w-14" },
  { step: "16", px: 64, className: "w-16" },
  { step: "20", px: 80, className: "w-20" },
  { step: "24", px: 96, className: "w-24" },
  { step: "32", px: 128, className: "w-32" },
  { step: "48", px: 192, className: "w-48" },
  { step: "64", px: 256, className: "w-64" },
]

/* ───────────────────────── Typography ───────────────────────── */

export type FontFamily = { name: string; value: string; className: string }
export const fontFamilies: FontFamily[] = [
  { name: "sans", value: "Inter", className: "font-sans" },
  { name: "mono", value: "monospace", className: "font-mono" },
]

export type FontSize = { name: string; px: number; className: string }
export const fontSizes: FontSize[] = [
  { name: "xs", px: 12, className: "text-xs" },
  { name: "sm", px: 14, className: "text-sm" },
  { name: "base", px: 16, className: "text-base" },
  { name: "lg", px: 18, className: "text-lg" },
  { name: "xl", px: 20, className: "text-xl" },
  { name: "2xl", px: 24, className: "text-2xl" },
  { name: "3xl", px: 30, className: "text-3xl" },
  { name: "4xl", px: 36, className: "text-4xl" },
  { name: "5xl", px: 48, className: "text-5xl" },
  { name: "6xl", px: 60, className: "text-6xl" },
  { name: "7xl", px: 72, className: "text-7xl" },
  { name: "8xl", px: 96, className: "text-8xl" },
  { name: "9xl", px: 128, className: "text-9xl" },
]

export type FontWeight = { name: string; value: number; className: string }
export const fontWeights: FontWeight[] = [
  { name: "thin", value: 100, className: "font-thin" },
  { name: "extralight", value: 200, className: "font-extralight" },
  { name: "light", value: 300, className: "font-light" },
  { name: "normal", value: 400, className: "font-normal" },
  { name: "medium", value: 500, className: "font-medium" },
  { name: "semibold", value: 600, className: "font-semibold" },
  { name: "bold", value: 700, className: "font-bold" },
  { name: "extrabold", value: 800, className: "font-extrabold" },
  { name: "black", value: 900, className: "font-black" },
]

export type Leading = { name: string; px: number; className: string }
export const leadings: Leading[] = [
  { name: "leading-3", px: 12, className: "leading-3" },
  { name: "leading-4", px: 16, className: "leading-4" },
  { name: "leading-5", px: 20, className: "leading-5" },
  { name: "leading-6", px: 24, className: "leading-6" },
  { name: "leading-7", px: 28, className: "leading-7" },
  { name: "leading-8", px: 32, className: "leading-8" },
  { name: "leading-9", px: 36, className: "leading-9" },
  { name: "leading-10", px: 40, className: "leading-10" },
]

export type Tracking = { name: string; value: string; className: string }
export const trackings: Tracking[] = [
  { name: "tighter", value: "-0.8px", className: "tracking-tighter" },
  { name: "tight", value: "-0.4px", className: "tracking-tight" },
  { name: "normal", value: "0", className: "tracking-normal" },
  { name: "wide", value: "+0.4px", className: "tracking-wide" },
  { name: "wider", value: "+0.8px", className: "tracking-wider" },
  { name: "widest", value: "+1.6px", className: "tracking-widest" },
]

/* ────────────────────── Radius & Border ─────────────────────── */

export type RadiusToken = { name: string; value: string; className: string; use: string }
export const radiusTokens: RadiusToken[] = [
  { name: "none", value: "0", className: "rounded-none", use: "Flush" },
  { name: "xs", value: "2px", className: "rounded-xs", use: "Tags, chips" },
  { name: "sm", value: "4px", className: "rounded-sm", use: "Small badges" },
  { name: "md", value: "6px", className: "rounded-md", use: "Inputs, buttons" },
  { name: "lg", value: "8px", className: "rounded-lg", use: "Cards, dropdowns" },
  { name: "xl", value: "12px", className: "rounded-xl", use: "Large cards" },
  { name: "2xl", value: "16px", className: "rounded-2xl", use: "Modals, sheets" },
  { name: "3xl", value: "24px", className: "rounded-3xl", use: "Large modals" },
  { name: "4xl", value: "32px", className: "rounded-4xl", use: "Hero sections" },
  { name: "full", value: "9999px", className: "rounded-full", use: "Avatars, pills" },
]

export type BorderWidth = { name: string; px: number; className: string }
export const borderWidths: BorderWidth[] = [
  { name: "border-0", px: 0, className: "border-0" },
  { name: "border", px: 1, className: "border" },
  { name: "border-2", px: 2, className: "border-2" },
  { name: "border-4", px: 4, className: "border-4" },
  { name: "border-8", px: 8, className: "border-8" },
]

/* ───────────────────── Opacity & Stroke ─────────────────────── */

export type OpacityToken = { value: number; className: string }
export const opacities: OpacityToken[] = [
  { value: 0, className: "opacity-0" },
  { value: 5, className: "opacity-5" },
  { value: 10, className: "opacity-10" },
  { value: 15, className: "opacity-15" },
  { value: 20, className: "opacity-20" },
  { value: 25, className: "opacity-25" },
  { value: 30, className: "opacity-30" },
  { value: 35, className: "opacity-35" },
  { value: 40, className: "opacity-40" },
  { value: 45, className: "opacity-45" },
  { value: 50, className: "opacity-50" },
  { value: 55, className: "opacity-55" },
  { value: 60, className: "opacity-60" },
  { value: 65, className: "opacity-65" },
  { value: 70, className: "opacity-70" },
  { value: 75, className: "opacity-75" },
  { value: 80, className: "opacity-80" },
  { value: 85, className: "opacity-85" },
  { value: 90, className: "opacity-90" },
  { value: 95, className: "opacity-95" },
  { value: 100, className: "opacity-100" },
]

export type StrokeWidth = { label: string; value: number }
export const strokeWidths: StrokeWidth[] = [
  { label: "0.5", value: 0.5 },
  { label: "0.75", value: 0.75 },
  { label: "1", value: 1 },
  { label: "1.25", value: 1.25 },
  { label: "1.5", value: 1.5 },
  { label: "1.75", value: 1.75 },
  { label: "2", value: 2 },
  { label: "2.25", value: 2.25 },
  { label: "2.5", value: 2.5 },
  { label: "2.75", value: 2.75 },
  { label: "3", value: 3 },
]
