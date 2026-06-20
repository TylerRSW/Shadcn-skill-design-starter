/**
 * Full component documentation (assignment deliverable 2).
 *
 * One entry per component slug, holding the structured docs that the base
 * registry in `component-docs.tsx` does not carry: anatomy, props/API, variants,
 * states, usage do/don't, accessibility notes, and design-token mapping.
 *
 * Single source of truth — rendered by <ComponentDocsSections> in BOTH the
 * Next.js docs site (app/docs/[slug]) and Storybook autodocs (.storybook
 * global docs page). Add components batch by batch (Forms → Overlays →
 * Feedback → Data Display); undocumented slugs simply fall back to plain
 * autodocs until filled in.
 *
 * Token mappings are read from the real component className strings in
 * components/ui/* — never invented.
 */

export type PropDoc = {
  name: string
  type: string
  default?: string
  description: string
}

export type StateDoc = {
  name: string
  description: string
}

export type TokenMap = {
  token: string
  role: string
}

export type ComponentDetail = {
  /** Short framing sentence shown above the sections. */
  overview?: string
  /** Structural parts, outermost → innermost. */
  anatomy: string[]
  /** Public API. List meaningful props; native passthrough noted in description. */
  props: PropDoc[]
  /** Human-readable variant axes, e.g. "variant: default · outline". */
  variants?: string[]
  /** Which of the 8 states the component actually exposes, each described. */
  states: StateDoc[]
  usage: { do: string[]; dont: string[] }
  /** Accessibility behaviour and author responsibilities. */
  a11y: string[]
  /** Semantic design tokens the component consumes (from its className). */
  tokens: TokenMap[]
}

const nativeButton: PropDoc = {
  name: "...props",
  type: "React.ComponentProps<\"button\">",
  description: "All native <button> attributes (type, onClick, name, form, …) are forwarded to the root.",
}

export const componentDetails: Record<string, ComponentDetail> = {
  // ── Forms ────────────────────────────────────────────────────────────────
  button: {
    overview:
      "The primary action trigger. Use it for in-page actions; for navigation, render an anchor via asChild so the correct element semantics are preserved.",
    anatomy: [
      "Root — a <button>, or any element passed through Slot when asChild is set.",
      "Optional leading/trailing icon — any <svg> is auto-sized to size-4 and given pointer-events-none.",
      "Label — the button's text content.",
    ],
    props: [
      { name: "variant", type: '"default" | "secondary" | "destructive" | "outline" | "ghost" | "link"', default: '"default"', description: "Visual emphasis of the button." },
      { name: "size", type: '"default" | "xs" | "sm" | "lg" | "icon"', default: '"default"', description: "Height and padding. Use icon for square icon-only buttons." },
      { name: "asChild", type: "boolean", default: "false", description: "Render the child element instead of a <button> (e.g. an <a> or Next <Link>), keeping all button styles." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables interaction; applies reduced opacity and removes pointer events." },
      nativeButton,
    ],
    variants: [
      "variant: default · secondary · destructive · outline · ghost · link",
      "size: default · xs · sm · lg · icon",
    ],
    states: [
      { name: "default", description: "Resting appearance per variant." },
      { name: "hover", description: "Background/opacity shift (e.g. bg-primary/90, bg-accent for ghost/outline)." },
      { name: "focus-visible", description: "3px ring (ring-ring/50) and ring-border for keyboard focus only." },
      { name: "active", description: "Inherits the pressed visual from the underlying element." },
      { name: "disabled", description: "opacity-50 and pointer-events-none." },
    ],
    usage: {
      do: [
        "Use one clear primary (default) action per view; pair it with secondary/outline for lesser actions.",
        "Use asChild to wrap links so they stay keyboard- and screen-reader-correct.",
        "Give icon-only buttons an aria-label.",
      ],
      dont: [
        "Don't stack multiple destructive buttons together.",
        "Don't use a button for plain navigation — use a link (via asChild).",
        "Don't remove the focus ring.",
      ],
    },
    a11y: [
      "Renders a real <button>, so Enter/Space activation and focus come for free.",
      "focus-visible ring meets WCAG 2.4.7; the ring is not removed on mouse focus only.",
      "Icon-only buttons (size=icon) have no text — add aria-label.",
      "Disabled buttons are not focusable; use aria-disabled + handler if focus must be retained.",
    ],
    tokens: [
      { token: "bg-primary / text-primary-foreground", role: "default variant surface + label" },
      { token: "bg-secondary / text-secondary-foreground", role: "secondary variant" },
      { token: "bg-destructive", role: "destructive variant surface" },
      { token: "border-input / bg-background", role: "outline variant border + surface" },
      { token: "bg-accent / text-accent-foreground", role: "ghost & outline hover" },
      { token: "text-primary", role: "link variant" },
      { token: "ring-ring/50 · border-ring", role: "focus-visible ring" },
      { token: "ring-destructive/20 dark:ring-destructive/40", role: "invalid/destructive focus ring" },
    ],
  },

  input: {
    overview:
      "A single-line text field. Pair every Input with a <Label htmlFor> (or an aria-label) — the component renders a bare control with no built-in label.",
    anatomy: [
      "Root — a native <input> styled with data-slot=\"input\".",
      "Supports any input type (text, email, search, file, password, number, …).",
    ],
    props: [
      { name: "type", type: "string", default: '"text"', description: "Native input type. file gets dedicated file-control styling." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the field (opacity + not-allowed cursor)." },
      { name: "aria-invalid", type: "boolean", description: "When true, applies the destructive border + ring for error state." },
      { name: "...props", type: 'React.ComponentProps<"input">', description: "All native input attributes (value, placeholder, onChange, required, name, …)." },
    ],
    states: [
      { name: "default", description: "border-input with subtle bg-input/30 (dark)." },
      { name: "focus-visible", description: "border-ring + 3px ring-ring/50." },
      { name: "disabled", description: "opacity-50, cursor-not-allowed, pointer-events-none." },
      { name: "error", description: "Set aria-invalid — border-destructive and ring-destructive/20 (dark:/40)." },
    ],
    usage: {
      do: [
        "Always associate a label (Label htmlFor / aria-label / aria-labelledby).",
        "Use aria-invalid + an error message (Field) to express validation errors.",
        "Use type appropriate to the data (email, search, number) for the right keyboard.",
      ],
      dont: [
        "Don't rely on placeholder as the only label.",
        "Don't convey errors by color alone — include text.",
      ],
    },
    a11y: [
      "No implicit label — must be labelled by the author.",
      "aria-invalid drives the visible error styling and is announced by screen readers.",
      "Focus ring satisfies WCAG 2.4.7; 3:1 non-text contrast on the border state.",
    ],
    tokens: [
      { token: "border-input", role: "resting border" },
      { token: "bg-input/30", role: "field surface (dark)" },
      { token: "text-foreground / text-muted-foreground", role: "value text / placeholder" },
      { token: "border-ring · ring-ring/50", role: "focus ring" },
      { token: "border-destructive · ring-destructive/20", role: "error (aria-invalid) state" },
    ],
  },

  label: {
    overview:
      "An accessible caption for a form control, built on Radix Label. Connect it to a control with htmlFor, or wrap the control as a child.",
    anatomy: [
      "Root — a <label> (data-slot=\"label\") that activates its associated control on click.",
    ],
    props: [
      { name: "htmlFor", type: "string", description: "id of the control this label describes (preferred association)." },
      { name: "...props", type: "React.ComponentProps<typeof LabelPrimitive.Root>", description: "All native label attributes." },
    ],
    states: [
      { name: "default", description: "text-sm font-medium, inherits foreground." },
      { name: "disabled", description: "When its peer/group is disabled, dims via group-data-[disabled] / peer-disabled (opacity-50)." },
    ],
    usage: {
      do: [
        "Give every input, checkbox, switch, and radio a Label.",
        "Use htmlFor matching the control id for a robust association.",
      ],
      dont: [
        "Don't use a Label purely as decorative text with no control.",
      ],
    },
    a11y: [
      "Clicking the label focuses/toggles the associated control.",
      "Provides the accessible name for the linked field.",
    ],
    tokens: [
      { token: "text-sm / font-medium", role: "typography" },
      { token: "(peer/group)-disabled:opacity-50", role: "disabled affinity with its control" },
    ],
  },

  checkbox: {
    overview:
      "A binary (or indeterminate) toggle for selecting one independent option. Built on Radix Checkbox.",
    anatomy: [
      "Root — the clickable box (button[role=checkbox], data-slot=\"checkbox\").",
      "Indicator — the check / minus icon shown when checked or indeterminate.",
    ],
    props: [
      { name: "checked", type: 'boolean | "indeterminate"', description: "Controlled state. Use indeterminate for partial selection." },
      { name: "defaultChecked", type: "boolean", description: "Uncontrolled initial state." },
      { name: "onCheckedChange", type: "(checked) => void", description: "Fires when the state changes." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the checkbox." },
      { name: "required", type: "boolean", description: "Marks the field required in a form." },
    ],
    states: [
      { name: "default", description: "Unchecked — border-input, bg-input/30 (dark)." },
      { name: "checked", description: "bg-primary + primary-foreground check icon." },
      { name: "focus-visible", description: "border-ring + ring-ring/50." },
      { name: "disabled", description: "opacity-50, not-allowed." },
      { name: "error", description: "aria-invalid → destructive border + ring." },
    ],
    usage: {
      do: [
        "Use for independent on/off options or multi-select lists.",
        "Pair with a Label (htmlFor) so the whole label is clickable.",
        "Use indeterminate for a parent controlling a group of children.",
      ],
      dont: [
        "Don't use a checkbox for mutually exclusive choices — use RadioGroup.",
        "Don't use it for an immediate-effect setting — use Switch.",
      ],
    },
    a11y: [
      "Exposes role=checkbox with aria-checked (including mixed for indeterminate).",
      "Keyboard: Space toggles; focus ring is visible.",
      "Must be labelled.",
    ],
    tokens: [
      { token: "border-input / bg-input/30", role: "unchecked box" },
      { token: "bg-primary / text-primary-foreground", role: "checked box + icon" },
      { token: "border-ring · ring-ring/50", role: "focus ring" },
      { token: "border-destructive · ring-destructive/20", role: "error state" },
    ],
  },

  switch: {
    overview:
      "An on/off control for settings that take effect immediately. Built on Radix Switch.",
    anatomy: [
      "Root — the track (button[role=switch], data-slot=\"switch\").",
      "Thumb — the sliding circle that moves between unchecked/checked positions.",
    ],
    props: [
      { name: "checked", type: "boolean", description: "Controlled on/off state." },
      { name: "defaultChecked", type: "boolean", description: "Uncontrolled initial state." },
      { name: "onCheckedChange", type: "(checked) => void", description: "Fires on toggle." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the switch." },
    ],
    states: [
      { name: "default (off)", description: "Track bg-input (bg-input/80 dark)." },
      { name: "checked (on)", description: "Track bg-primary; thumb slides right." },
      { name: "focus-visible", description: "border-ring + ring-ring/50." },
      { name: "disabled", description: "opacity-50, not-allowed." },
    ],
    usage: {
      do: [
        "Use for instant-apply binary settings (e.g. dark mode).",
        "Keep the Label static — don't change it between on/off.",
      ],
      dont: [
        "Don't use a Switch where a Save/submit confirms the change — use a Checkbox.",
        "Don't use it for multi-option selection.",
      ],
    },
    a11y: [
      "Exposes role=switch with aria-checked.",
      "Keyboard: Space/Enter toggles; visible focus ring.",
      "Needs an associated label.",
    ],
    tokens: [
      { token: "bg-input / bg-input/80", role: "off track" },
      { token: "bg-primary", role: "on track" },
      { token: "bg-background / bg-foreground / bg-primary-foreground", role: "thumb" },
      { token: "border-ring · ring-ring/50", role: "focus ring" },
    ],
  },

  textarea: {
    overview:
      "A multi-line text field for longer free-form input. Like Input, it ships unlabelled — associate a Label.",
    anatomy: [
      "Root — a native <textarea> (data-slot=\"textarea\"), min-height of ~16 (field-sizing-content aware).",
    ],
    props: [
      { name: "disabled", type: "boolean", default: "false", description: "Disables the field." },
      { name: "aria-invalid", type: "boolean", description: "Applies the destructive error styling." },
      { name: "...props", type: 'React.ComponentProps<"textarea">', description: "All native textarea attributes (rows, value, placeholder, onChange, …)." },
    ],
    states: [
      { name: "default", description: "border-input, bg-input/30 (dark)." },
      { name: "focus-visible", description: "border-ring + ring-ring/50." },
      { name: "disabled", description: "opacity-50, not-allowed." },
      { name: "error", description: "aria-invalid → destructive border + ring." },
    ],
    usage: {
      do: [
        "Use for comments, descriptions, messages — input longer than one line.",
        "Associate a Label and, for limits, a helper/description.",
      ],
      dont: [
        "Don't use for single short values — use Input.",
      ],
    },
    a11y: [
      "No implicit label — must be labelled.",
      "aria-invalid is announced and drives the visible error state.",
    ],
    tokens: [
      { token: "border-input / bg-input/30", role: "resting field" },
      { token: "text-muted-foreground", role: "placeholder" },
      { token: "border-ring · ring-ring/50", role: "focus ring" },
      { token: "border-destructive · ring-destructive/20", role: "error state" },
    ],
  },

  "radio-group": {
    overview:
      "A set of mutually exclusive options where exactly one can be selected. Built on Radix RadioGroup.",
    anatomy: [
      "RadioGroup — the role=radiogroup container managing selection and roving focus.",
      "RadioGroupItem — each selectable circle (button[role=radio], data-slot=\"radio-group-item\").",
      "Indicator — the filled dot shown on the selected item.",
    ],
    props: [
      { name: "value", type: "string", description: "Controlled selected value (on RadioGroup)." },
      { name: "defaultValue", type: "string", description: "Uncontrolled initial selection." },
      { name: "onValueChange", type: "(value) => void", description: "Fires when the selection changes." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the whole group." },
      { name: "value (item)", type: "string", description: "Required on each RadioGroupItem — the value it represents." },
    ],
    states: [
      { name: "default", description: "Unselected — border-input." },
      { name: "checked", description: "Selected — fill-primary dot, border-primary." },
      { name: "focus-visible", description: "border-ring + ring-ring/50." },
      { name: "disabled", description: "opacity-50, not-allowed." },
      { name: "error", description: "aria-invalid → destructive border + ring." },
    ],
    usage: {
      do: [
        "Use when there are 2–6 mutually exclusive options all worth showing.",
        "Give each item a Label tied by id.",
        "Pre-select a sensible default when possible.",
      ],
      dont: [
        "Don't use for multi-select — use Checkboxes.",
        "Don't use for long option lists — use a Select.",
      ],
    },
    a11y: [
      "Arrow keys move selection within the group (roving tabindex); Tab enters/leaves the group.",
      "Exposes role=radiogroup / role=radio with aria-checked.",
      "Each item needs a label.",
    ],
    tokens: [
      { token: "border-input", role: "unselected item" },
      { token: "fill-primary / text-primary / border-primary", role: "selected indicator" },
      { token: "border-ring · ring-ring/50", role: "focus ring" },
      { token: "border-destructive · ring-destructive/20", role: "error state" },
    ],
  },

  select: {
    overview:
      "A trigger-and-popover control for picking one option from a list. Built on Radix Select. For free-text filtering use Combobox; for native mobile behaviour use Native Select.",
    anatomy: [
      "Select — the stateful root.",
      "SelectTrigger — the button[role=combobox] that opens the list; holds the SelectValue.",
      "SelectValue — shows the current value or a placeholder.",
      "SelectContent — the popover listbox (bg-popover), with optional scroll buttons.",
      "SelectGroup / SelectLabel — group items under a heading.",
      "SelectItem — a selectable option with a check indicator when selected.",
    ],
    props: [
      { name: "value", type: "string", description: "Controlled selected value (on Select)." },
      { name: "defaultValue", type: "string", description: "Uncontrolled initial value." },
      { name: "onValueChange", type: "(value) => void", description: "Fires on selection." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the control." },
      { name: "size (trigger)", type: '"default" | "sm"', default: '"default"', description: "Trigger height." },
    ],
    states: [
      { name: "default", description: "Trigger border-input, bg-input/30 (dark)." },
      { name: "focus-visible", description: "border-ring + ring-ring/50." },
      { name: "open", description: "Content animates in; items show hover/highlight bg-accent." },
      { name: "disabled", description: "opacity-50, not-allowed." },
      { name: "error", description: "aria-invalid → destructive border + ring." },
    ],
    usage: {
      do: [
        "Give SelectTrigger an accessible name (aria-label or an associated Label).",
        "Group long lists with SelectGroup + SelectLabel.",
        "Use a clear SelectValue placeholder.",
      ],
      dont: [
        "Don't use for very long lists that need search — use Combobox.",
        "Don't use for multi-select.",
      ],
    },
    a11y: [
      "Full keyboard support (typeahead, arrows, Home/End, Esc) from Radix.",
      "Trigger exposes role=combobox + aria-expanded; needs an accessible name.",
      "Selected item is marked; focus returns to the trigger on close.",
    ],
    tokens: [
      { token: "border-input / bg-input/30", role: "trigger surface" },
      { token: "bg-popover / text-popover-foreground", role: "dropdown panel" },
      { token: "bg-accent / text-accent-foreground", role: "highlighted item" },
      { token: "text-muted-foreground", role: "placeholder / icons" },
      { token: "border-ring · ring-ring/50", role: "focus ring" },
      { token: "border-destructive · ring-destructive/20", role: "error state" },
    ],
  },

  slider: {
    overview:
      "A control for choosing a numeric value (or range) from a continuous track. Built on Radix Slider.",
    anatomy: [
      "Root — the slider container (data-slot=\"slider\"), horizontal or vertical.",
      "Track — the rail (bg-muted).",
      "Range — the filled portion (bg-primary).",
      "Thumb — one draggable handle per value (role=slider).",
    ],
    props: [
      { name: "defaultValue", type: "number[]", description: "Uncontrolled value(s); length sets the number of thumbs." },
      { name: "value", type: "number[]", description: "Controlled value(s)." },
      { name: "onValueChange", type: "(value: number[]) => void", description: "Fires while dragging." },
      { name: "min", type: "number", default: "0", description: "Lower bound." },
      { name: "max", type: "number", default: "100", description: "Upper bound." },
      { name: "step", type: "number", default: "1", description: "Increment." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the slider." },
      { name: "aria-label", type: "string", description: "Name for the thumb — required, as the root label does not propagate to the thumb." },
    ],
    states: [
      { name: "default", description: "Track bg-muted, filled range bg-primary." },
      { name: "focus-visible", description: "Thumb shows ring-ring/50 (ring-4)." },
      { name: "hover", description: "Thumb ring-4 on hover." },
      { name: "disabled", description: "opacity-50." },
    ],
    usage: {
      do: [
        "Provide an aria-label (or aria-labelledby) — the thumb has no implicit name.",
        "Show the current value nearby for precision.",
        "Pick a step that matches the data's meaningful granularity.",
      ],
      dont: [
        "Don't use a slider where an exact value matters and is hard to hit — use a number Input.",
      ],
    },
    a11y: [
      "Thumb exposes role=slider with aria-valuemin/max/now.",
      "Keyboard: arrows step; Home/End jump to bounds.",
      "Author must label the thumb (aria-label) — a known shadcn limitation flagged in Storybook a11y.",
    ],
    tokens: [
      { token: "bg-muted", role: "track" },
      { token: "bg-primary / border-primary", role: "filled range + thumb border" },
      { token: "ring-ring/50", role: "thumb focus/hover ring" },
    ],
  },
}
