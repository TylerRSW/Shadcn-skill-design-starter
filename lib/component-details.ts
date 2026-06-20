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

  "button-group": {
    overview:
      "Connects related buttons (and text/separators) into a single control with shared borders and rounded outer edges. A layout wrapper — each child Button keeps its own behaviour.",
    anatomy: [
      "ButtonGroup — the role=group flex container (data-slot=\"button-group\"), horizontal or vertical.",
      "Button — the action buttons placed inside; outer corners are rounded, inner edges squared.",
      "ButtonGroupText — non-interactive inline text/label segment.",
      "ButtonGroupSeparator — a divider between segments.",
    ],
    props: [
      { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Lays the group out in a row or a column." },
      { name: "...props", type: 'React.ComponentProps<"div">', description: "All native div attributes; add aria-label to name the group." },
    ],
    variants: ["orientation: horizontal · vertical"],
    states: [
      { name: "default", description: "Each child renders its own Button variant/state." },
      { name: "(per button)", description: "hover / focus-visible / disabled come from the child Buttons, not the group." },
    ],
    usage: {
      do: [
        "Group buttons that act on the same object or form a set of related choices.",
        "Give the group an aria-label describing its purpose.",
        "Mix in ButtonGroupText / ButtonGroupSeparator for split or labelled controls.",
      ],
      dont: [
        "Don't group unrelated actions just to save space.",
        "Don't mix wildly different button variants in one group.",
      ],
    },
    a11y: [
      "Exposes role=group — give it an accessible name (aria-label / aria-labelledby).",
      "Each child Button keeps its own semantics, focus order, and labelling.",
    ],
    tokens: [
      { token: "bg-input", role: "vertical separator hairline" },
      { token: "bg-muted", role: "ButtonGroupText surface" },
    ],
  },

  "input-group": {
    overview:
      "Wraps an input (or textarea) with leading/trailing addons — icons, buttons, or text — inside one bordered control that shares a single focus ring.",
    anatomy: [
      "InputGroup — the bordered container that owns the focus-within ring.",
      "InputGroupInput / InputGroupTextarea — the borderless control inside.",
      "InputGroupAddon — a slot aligned inline-start, inline-end, or block-end.",
      "InputGroupButton — a compact button addon (e.g. submit, clear, reveal).",
      "InputGroupText — static text/icon addon (e.g. a prefix or unit).",
    ],
    props: [
      { name: "align (addon)", type: '"inline-start" | "inline-end" | "block-start" | "block-end"', default: '"inline-start"', description: "Where the addon sits within the group." },
      { name: "size (button)", type: '"xs" | "sm" | "icon-xs" | "icon-sm"', description: "Compact sizing for InputGroupButton." },
      { name: "...props", type: 'React.ComponentProps<"div">', description: "Native attributes on the wrapper; control attributes pass to the inner input." },
    ],
    states: [
      { name: "default", description: "border-input around the group, bg-input/30 (dark)." },
      { name: "focus-within", description: "border-ring + ring-ring/50 on the whole group when the input is focused." },
      { name: "disabled", description: "Dimmed when the inner control is disabled." },
      { name: "error", description: "aria-invalid on the input → destructive border + ring." },
    ],
    usage: {
      do: [
        "Use for search fields, prefixes/suffixes (https://, .com, $, units), or inline submit/clear buttons.",
        "Still label the inner input (Label / aria-label).",
        "Mark purely decorative addon icons aria-hidden.",
      ],
      dont: [
        "Don't pack more than one or two addons per side.",
        "Don't put critical actions only in an addon without an accessible name.",
      ],
    },
    a11y: [
      "The inner input still needs a programmatic label.",
      "Focus ring is on the group via focus-within and meets WCAG 2.4.7.",
      "Icon-only InputGroupButtons need an aria-label.",
    ],
    tokens: [
      { token: "border-input / bg-input/30", role: "group surface" },
      { token: "border-ring · ring-ring/50", role: "focus-within ring" },
      { token: "text-muted-foreground", role: "addon icons / text" },
      { token: "border-destructive · ring-destructive/20", role: "error state" },
    ],
  },

  "input-otp": {
    overview:
      "An accessible one-time-password input rendering separate character slots with copy-paste support, backed by a single managed input (input-otp).",
    anatomy: [
      "InputOTP — the root managing the hidden input, value, and caret.",
      "InputOTPGroup — groups a run of slots.",
      "InputOTPSlot — one character cell; shows a blinking caret when it is the active slot.",
      "InputOTPSeparator — a visual divider between groups (e.g. 000–000).",
    ],
    props: [
      { name: "maxLength", type: "number", description: "Total number of characters / slots." },
      { name: "value", type: "string", description: "Controlled value." },
      { name: "onChange", type: "(value: string) => void", description: "Fires as the user types." },
      { name: "pattern", type: "string", description: "Regex restricting allowed characters (e.g. digits only)." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the input." },
    ],
    states: [
      { name: "default", description: "Empty slots — border-input, bg-input/30 (dark)." },
      { name: "active", description: "The focused slot shows border-ring + ring-ring/50 and an animated caret (bg-foreground)." },
      { name: "filled", description: "Entered characters render in their slots." },
      { name: "disabled", description: "opacity-50, not-allowed." },
      { name: "error", description: "aria-invalid → destructive border + ring." },
    ],
    usage: {
      do: [
        "Use for short fixed-length codes (OTP, 2FA, PIN).",
        "Set pattern to constrain input (digits for numeric codes).",
        "Label the field and announce errors on invalid codes.",
      ],
      dont: [
        "Don't use for free-form or variable-length input — use Input.",
        "Don't block paste — the component supports pasting a full code.",
      ],
    },
    a11y: [
      "Backed by one real input, so paste, autofill, and SMS autocomplete work.",
      "Full keyboard support; the active slot is visually indicated.",
      "Needs an associated label.",
    ],
    tokens: [
      { token: "border-input / bg-input/30", role: "slot surface" },
      { token: "border-ring · ring-ring/50", role: "active-slot ring" },
      { token: "bg-foreground", role: "animated caret" },
      { token: "border-destructive · ring-destructive/20", role: "error state" },
    ],
  },

  field: {
    overview:
      "A composable layout system that pairs a control with its label, description, and validation message in consistent vertical or horizontal arrangements — the recommended way to assemble form rows.",
    anatomy: [
      "FieldSet / FieldLegend — group several fields under a legend.",
      "FieldGroup — stacks multiple Fields with consistent spacing.",
      "Field — one row (orientation horizontal or vertical) wrapping a control.",
      "FieldContent — holds the control alongside label/description.",
      "FieldLabel / FieldTitle — the field's label / a heading.",
      "FieldDescription — helper text (text-muted-foreground).",
      "FieldError — validation message (text-destructive), shown on invalid.",
      "FieldSeparator — divider between fields.",
    ],
    props: [
      { name: "orientation", type: '"horizontal" | "vertical"', default: '"vertical"', description: "Label-above (vertical) or label-beside (horizontal) layout. On Field." },
      { name: "...props", type: 'React.ComponentProps<"div">', description: "Native div attributes on each part." },
    ],
    variants: ["orientation: horizontal · vertical"],
    states: [
      { name: "default", description: "Label + control + optional description." },
      { name: "invalid", description: "data-invalid / FieldError present → error text in text-destructive." },
      { name: "selected", description: "When wrapping a choice control, the selected row can read border-primary / bg-primary/5–10." },
    ],
    usage: {
      do: [
        "Wrap each form control in a Field so label, help, and error stay associated and aligned.",
        "Use FieldDescription for guidance and FieldError for validation messages.",
        "Use FieldSet + FieldLegend to group related fields (e.g. an address).",
      ],
      dont: [
        "Don't hand-roll label/description/error spacing per form — reuse Field.",
        "Don't convey errors with color alone — FieldError supplies the text.",
      ],
    },
    a11y: [
      "Associates label, description, and error with the control via ids (aria-describedby / aria-labelledby).",
      "FieldLegend names a FieldSet group for assistive tech.",
      "FieldError is wired so screen readers announce validation messages.",
    ],
    tokens: [
      { token: "text-muted-foreground", role: "FieldDescription" },
      { token: "text-destructive", role: "FieldError text" },
      { token: "border-primary / bg-primary/5 / bg-primary/10", role: "selected-field affordance" },
      { token: "bg-background", role: "field surface" },
    ],
  },

  "native-select": {
    overview:
      "A native <select> styled to match the design system. Prefer it for the best mobile and assistive-tech behaviour; use Select when you need custom item rendering or grouping.",
    anatomy: [
      "Wrapper — positions the chevron icon (data-slot=\"native-select\").",
      "<select> — the native control holding <option>/<optgroup> children.",
      "Chevron — a decorative indicator (pointer-events-none).",
    ],
    props: [
      { name: "size", type: '"default" | "sm"', default: '"default"', description: "Control height." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the select." },
      { name: "...props", type: 'React.ComponentProps<"select">', description: "All native select attributes (value, defaultValue, onChange, multiple, required, name)." },
    ],
    variants: ["size: default · sm"],
    states: [
      { name: "default", description: "border-input, bg-input/30 (dark)." },
      { name: "focus-visible", description: "border-ring + ring-ring/50." },
      { name: "disabled", description: "opacity-50, not-allowed." },
      { name: "error", description: "aria-invalid → destructive border + ring." },
    ],
    usage: {
      do: [
        "Use when native picker UX matters (mobile) or for simple option lists.",
        "Associate a Label.",
        "Group options with <optgroup> when helpful.",
      ],
      dont: [
        "Don't use when you need icons, descriptions, or custom item layout — use Select.",
      ],
    },
    a11y: [
      "Native semantics give the best keyboard and screen-reader support out of the box.",
      "Still requires an associated label.",
      "aria-invalid drives the visible error state.",
    ],
    tokens: [
      { token: "border-input / bg-input/30", role: "control surface" },
      { token: "text-muted-foreground", role: "chevron / placeholder" },
      { token: "border-ring · ring-ring/50", role: "focus ring" },
      { token: "border-destructive · ring-destructive/20", role: "error state" },
    ],
  },

  toggle: {
    overview:
      "A two-state button that stays pressed (on) or released (off). Built on Radix Toggle. For a set of related toggles use Toggle Group.",
    anatomy: [
      "Root — a button[data-state=on|off] (data-slot=\"toggle\") wrapping an icon and/or text.",
    ],
    props: [
      { name: "variant", type: '"default" | "outline"', default: '"default"', description: "Transparent (default) or bordered (outline)." },
      { name: "size", type: '"default" | "sm" | "lg"', default: '"default"', description: "Control size." },
      { name: "pressed", type: "boolean", description: "Controlled on/off state." },
      { name: "defaultPressed", type: "boolean", description: "Uncontrolled initial state." },
      { name: "onPressedChange", type: "(pressed: boolean) => void", description: "Fires on toggle." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the toggle." },
    ],
    variants: [
      "variant: default · outline",
      "size: default · sm · lg",
    ],
    states: [
      { name: "off (default)", description: "Transparent; border-input for outline." },
      { name: "on", description: "data-state=on → bg-accent / text-accent-foreground." },
      { name: "hover", description: "bg-muted / text-muted-foreground." },
      { name: "focus-visible", description: "border-ring + ring-ring/50." },
      { name: "disabled", description: "opacity-50, not-allowed." },
    ],
    usage: {
      do: [
        "Use for a single binary formatting/option toggle (e.g. bold).",
        "Give icon-only toggles an aria-label.",
      ],
      dont: [
        "Don't use a Toggle where a Switch (instant setting) or Checkbox (form value) fits better.",
        "Don't use a lone Toggle for mutually exclusive choices — use Toggle Group.",
      ],
    },
    a11y: [
      "Exposes aria-pressed reflecting the on/off state.",
      "Keyboard: Space/Enter toggles; visible focus ring.",
      "Icon-only toggles need an aria-label.",
    ],
    tokens: [
      { token: "bg-accent / text-accent-foreground", role: "on (pressed) state" },
      { token: "bg-muted / text-muted-foreground", role: "hover" },
      { token: "border-input", role: "outline variant border" },
      { token: "border-ring · ring-ring/50", role: "focus ring" },
    ],
  },

  "toggle-group": {
    overview:
      "A set of toggles that share variant and size, for single- or multiple-selection groupings (e.g. text alignment, view modes). Built on Radix ToggleGroup.",
    anatomy: [
      "ToggleGroup — the role=group container managing selection and roving focus.",
      "ToggleGroupItem — each toggle button, styled via the shared toggle variants.",
    ],
    props: [
      { name: "type", type: '"single" | "multiple"', description: "single selects one item; multiple allows many." },
      { name: "value", type: "string | string[]", description: "Controlled selection (string for single, array for multiple)." },
      { name: "onValueChange", type: "(value) => void", description: "Fires when the selection changes." },
      { name: "variant", type: '"default" | "outline"', default: '"default"', description: "Shared across all items." },
      { name: "size", type: '"default" | "sm" | "lg"', default: '"default"', description: "Shared across all items." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the whole group." },
    ],
    variants: [
      "type: single · multiple",
      "variant: default · outline",
      "size: default · sm · lg",
    ],
    states: [
      { name: "off", description: "Unselected item — transparent / border-input (outline)." },
      { name: "on", description: "Selected item — bg-accent / text-accent-foreground." },
      { name: "hover", description: "bg-muted." },
      { name: "focus-visible", description: "ring-ring/50." },
      { name: "disabled", description: "opacity-50." },
    ],
    usage: {
      do: [
        "Use type=single for mutually exclusive modes, type=multiple for independent toggles.",
        "Keep items short — usually icons with aria-labels.",
        "Give the group an accessible name.",
      ],
      dont: [
        "Don't use for primary navigation — use Tabs.",
        "Don't mix single and multiple semantics in one group.",
      ],
    },
    a11y: [
      "Roving tabindex: arrow keys move between items, Tab enters/leaves the group.",
      "single exposes radio-like semantics; multiple uses aria-pressed per item.",
      "Icon-only items need aria-labels; name the group.",
    ],
    tokens: [
      { token: "bg-accent / text-accent-foreground", role: "selected item" },
      { token: "bg-muted", role: "hover" },
      { token: "border-input", role: "outline variant" },
      { token: "ring-ring/50", role: "focus ring" },
    ],
  },

  calendar: {
    overview:
      "An interactive month grid for selecting a single date, multiple dates, or a range. Built on react-day-picker, themed with our tokens.",
    anatomy: [
      "Calendar — caption with month/year + previous/next nav buttons, weekday header, and the day grid.",
      "CalendarDayButton — each selectable day cell, with selected / today / outside / disabled styling.",
    ],
    props: [
      { name: "mode", type: '"single" | "multiple" | "range"', default: '"single"', description: "Selection behaviour." },
      { name: "selected", type: "Date | Date[] | DateRange", description: "Controlled selection." },
      { name: "onSelect", type: "(value) => void", description: "Fires when the selection changes." },
      { name: "disabled", type: "Matcher | Matcher[]", description: "Dates to disable." },
      { name: "showOutsideDays", type: "boolean", default: "true", description: "Show leading/trailing days of adjacent months." },
      { name: "captionLayout", type: '"label" | "dropdown"', description: "Month/year as static label or dropdowns." },
      { name: "numberOfMonths", type: "number", default: "1", description: "How many months to render side by side." },
    ],
    variants: ["mode: single · multiple · range"],
    states: [
      { name: "default", description: "Selectable day, hover bg-accent." },
      { name: "selected", description: "bg-primary / text-primary-foreground (range ends; middle uses accent)." },
      { name: "today", description: "Emphasised current day (bg-accent)." },
      { name: "outside", description: "Adjacent-month days dimmed (text-muted-foreground)." },
      { name: "disabled", description: "Non-selectable days, opacity reduced." },
      { name: "focus", description: "Focused day shows border-ring + ring-ring/50." },
    ],
    usage: {
      do: [
        "Use mode to match the task (single / multiple / range).",
        "Disable invalid dates with the disabled matcher.",
        "Pair with a Popover trigger to make a Date Picker.",
      ],
      dont: [
        "Don't use a full calendar for far-apart dates (e.g. birth year) — a dropdown/native control is faster.",
      ],
    },
    a11y: [
      "react-day-picker provides grid semantics and keyboard navigation (arrows move days, PageUp/PageDown change months).",
      "Nav buttons are labelled; the selected and today states are conveyed beyond color.",
    ],
    tokens: [
      { token: "bg-primary / text-primary-foreground", role: "selected day / range ends" },
      { token: "bg-accent / text-accent-foreground", role: "today / hover / range middle" },
      { token: "text-muted-foreground", role: "weekday header & outside days" },
      { token: "border-input", role: "nav buttons" },
      { token: "border-ring · ring-ring/50", role: "focused day" },
      { token: "bg-popover", role: "dropdown caption surface" },
    ],
  },

  "date-picker": {
    overview:
      "Not a single component but a composition: a Popover whose trigger Button shows the chosen date (or a placeholder), opening a single-select Calendar. Assemble it from Popover + Button + Calendar.",
    anatomy: [
      "Popover — owns open/closed state.",
      "PopoverTrigger → Button — shows a CalendarIcon and the formatted date or placeholder.",
      "PopoverContent → Calendar (mode=single) — the date grid; selecting a date closes the popover.",
    ],
    props: [
      { name: "(composition)", type: "—", description: "No dedicated props. Hold the selected Date in state; pass selected + onSelect to Calendar, and render the value in the trigger Button." },
    ],
    states: [
      { name: "empty", description: "Trigger shows the placeholder (text-muted-foreground)." },
      { name: "selected", description: "Trigger shows the formatted date." },
      { name: "open", description: "Popover open; Calendar visible with the current selection." },
      { name: "disabled", description: "Trigger Button disabled." },
    ],
    usage: {
      do: [
        "Format the trigger label clearly and show a placeholder when empty.",
        "Give the trigger an accessible name even when only an icon shows.",
        "Use the Calendar's disabled matcher for invalid dates.",
      ],
      dont: [
        "Don't use for coarse dates far in the past/future — a dropdown or native input is quicker.",
      ],
    },
    a11y: [
      "Trigger needs an accessible name (the date text or an aria-label).",
      "Calendar keyboard navigation comes from react-day-picker.",
      "Focus returns to the trigger when the popover closes.",
    ],
    tokens: [
      { token: "border-input (Button) ", role: "trigger surface" },
      { token: "text-muted-foreground", role: "placeholder / icon" },
      { token: "bg-popover", role: "popover panel" },
      { token: "bg-primary / text-primary-foreground", role: "selected day in Calendar" },
    ],
  },

  combobox: {
    overview:
      "A composition: a Popover whose trigger opens a searchable Command list for single-select with type-ahead filtering. Build it from Popover + Command + Button. Use Select for short, non-searchable lists.",
    anatomy: [
      "Popover — owns open/closed state.",
      "PopoverTrigger → Button[role=combobox] — shows the current value and a ChevronsUpDown icon.",
      "PopoverContent → Command — CommandInput (filter), CommandList, CommandEmpty, CommandGroup, CommandItem (with a Check on the selected item).",
    ],
    props: [
      { name: "(composition)", type: "—", description: "No dedicated props. Hold open and value in state; CommandInput filters, CommandItem onSelect sets the value and closes the popover." },
    ],
    states: [
      { name: "empty", description: "Trigger shows the placeholder." },
      { name: "selected", description: "Trigger shows the chosen option; its CommandItem shows a check." },
      { name: "open", description: "Popover open with the searchable list." },
      { name: "highlighted", description: "Keyboard/hover-focused item — bg-accent." },
      { name: "no results", description: "CommandEmpty message when the filter matches nothing." },
    ],
    usage: {
      do: [
        "Use for long lists where users benefit from type-ahead search.",
        "Give the trigger an accessible name and a clear placeholder.",
        "Provide a helpful CommandEmpty state.",
      ],
      dont: [
        "Don't use for a handful of options that don't need search — use Select.",
        "Don't use for multi-select without adapting the pattern (checkable items).",
      ],
    },
    a11y: [
      "Trigger exposes role=combobox + aria-expanded; it needs an accessible name.",
      "cmdk provides full keyboard support (type to filter, arrows, Enter, Esc).",
      "Focus returns to the trigger on close; the selected item is marked.",
    ],
    tokens: [
      { token: "border-input (Button)", role: "trigger surface" },
      { token: "bg-popover / text-popover-foreground", role: "popover list" },
      { token: "bg-accent / text-accent-foreground", role: "highlighted item" },
      { token: "text-muted-foreground", role: "placeholder / icons" },
    ],
  },

  // ── Overlays ───────────────────────────────────────────────────────────────
  dialog: {
    overview:
      "A modal window layered over the page that interrupts the user and expects a response. Built on Radix Dialog; focus is trapped while open.",
    anatomy: [
      "Dialog — the stateful root.",
      "DialogTrigger — opens the dialog.",
      "DialogOverlay — the dimmed backdrop.",
      "DialogContent — the centered panel (bg-background) with a built-in close button.",
      "DialogHeader / DialogTitle / DialogDescription — heading region.",
      "DialogFooter — action buttons row.",
      "DialogClose — dismisses the dialog.",
    ],
    props: [
      { name: "open", type: "boolean", description: "Controlled open state (on Dialog)." },
      { name: "defaultOpen", type: "boolean", description: "Uncontrolled initial state." },
      { name: "onOpenChange", type: "(open: boolean) => void", description: "Fires when open changes." },
      { name: "modal", type: "boolean", default: "true", description: "Whether interaction with outside content is blocked." },
    ],
    states: [
      { name: "closed", description: "Only the trigger is present." },
      { name: "open", description: "Overlay + content animate in; focus moves into the dialog and is trapped." },
      { name: "closing", description: "Exit animation; focus returns to the trigger." },
    ],
    usage: {
      do: [
        "Always provide a DialogTitle (and ideally a DialogDescription) for the accessible name.",
        "Use for focused tasks or confirmations that need the user's full attention.",
        "Keep footer actions clear (primary + cancel).",
      ],
      dont: [
        "Don't nest dialogs or use one for non-blocking info — use a Popover/Toast.",
        "Don't omit the title; screen readers rely on it.",
      ],
    },
    a11y: [
      "role=dialog with aria-modal; focus is trapped and restored to the trigger on close.",
      "Esc closes; the title provides the accessible name (use VisuallyHidden if visually omitted).",
      "Outside content is inert while modal.",
    ],
    tokens: [
      { token: "bg-background", role: "dialog panel" },
      { token: "bg-accent", role: "close-button hover" },
      { token: "text-muted-foreground", role: "description text" },
      { token: "ring-ring", role: "close-button focus ring" },
    ],
  },

  "alert-dialog": {
    overview:
      "A modal that interrupts with an important message and requires a deliberate confirm or cancel — used for destructive or irreversible actions.",
    anatomy: [
      "AlertDialog — the stateful root.",
      "AlertDialogTrigger — opens it.",
      "AlertDialogOverlay / AlertDialogContent — backdrop + panel.",
      "AlertDialogHeader / AlertDialogTitle / AlertDialogDescription — message.",
      "AlertDialogMedia — optional icon/illustration slot.",
      "AlertDialogFooter — AlertDialogAction (confirm) + AlertDialogCancel.",
    ],
    props: [
      { name: "open", type: "boolean", description: "Controlled open state." },
      { name: "onOpenChange", type: "(open: boolean) => void", description: "Fires when open changes." },
    ],
    states: [
      { name: "closed", description: "Only the trigger is present." },
      { name: "open", description: "Focus trapped; focus lands on AlertDialogCancel by default (safer choice)." },
    ],
    usage: {
      do: [
        "Use specifically for confirmations of risky/irreversible actions.",
        "Label the action button with the verb (e.g. 'Delete'), not 'OK'.",
        "Keep Cancel as the safe default.",
      ],
      dont: [
        "Don't use for routine dialogs — use Dialog.",
        "Don't make the destructive action the default focus.",
      ],
    },
    a11y: [
      "role=alertdialog; focus is trapped and starts on the cancel action.",
      "Esc cancels; title + description form the accessible name/description.",
    ],
    tokens: [
      { token: "bg-background", role: "panel" },
      { token: "bg-muted", role: "media/icon surface" },
      { token: "text-muted-foreground", role: "description" },
    ],
  },

  sheet: {
    overview:
      "A panel that slides in from an edge of the screen for secondary content or tasks without leaving the page. Built on Radix Dialog.",
    anatomy: [
      "Sheet — the stateful root.",
      "SheetTrigger / SheetClose — open / dismiss.",
      "SheetOverlay — backdrop.",
      "SheetContent — the edge-anchored panel (side: top/right/bottom/left).",
      "SheetHeader / SheetTitle / SheetDescription / SheetFooter.",
    ],
    props: [
      { name: "side", type: '"top" | "right" | "bottom" | "left"', default: '"right"', description: "Edge the sheet slides in from (on SheetContent)." },
      { name: "open", type: "boolean", description: "Controlled open state." },
      { name: "onOpenChange", type: "(open: boolean) => void", description: "Fires when open changes." },
    ],
    variants: ["side: top · right · bottom · left"],
    states: [
      { name: "closed", description: "Only the trigger is present." },
      { name: "open", description: "Slides in from the chosen side; focus trapped." },
      { name: "closing", description: "Slides out; focus returns to trigger." },
    ],
    usage: {
      do: [
        "Use for navigation, filters, or detail panels that complement the main view.",
        "Provide a SheetTitle for the accessible name.",
        "Pick the side that matches the content's relationship to the page.",
      ],
      dont: [
        "Don't use a sheet for a blocking confirmation — use Alert Dialog.",
        "Don't stuff a whole separate page into a sheet.",
      ],
    },
    a11y: [
      "role=dialog with focus trap and restore, like Dialog.",
      "Esc closes; needs a title for its accessible name.",
    ],
    tokens: [
      { token: "bg-background", role: "panel" },
      { token: "bg-secondary", role: "close-button hover" },
      { token: "text-foreground / text-muted-foreground", role: "title / description" },
      { token: "ring-ring", role: "close-button focus ring" },
    ],
  },

  drawer: {
    overview:
      "An edge-anchored panel with drag-to-dismiss, optimised for touch. Built on Vaul. Often used as the mobile counterpart to Dialog/Sheet.",
    anatomy: [
      "Drawer — the stateful root (direction: top/bottom/left/right).",
      "DrawerTrigger / DrawerClose.",
      "DrawerOverlay — backdrop.",
      "DrawerContent — the sliding panel with a drag handle (bottom direction).",
      "DrawerHeader / DrawerTitle / DrawerDescription / DrawerFooter.",
    ],
    props: [
      { name: "direction", type: '"top" | "bottom" | "left" | "right"', default: '"bottom"', description: "Edge the drawer slides from." },
      { name: "open", type: "boolean", description: "Controlled open state." },
      { name: "onOpenChange", type: "(open: boolean) => void", description: "Fires when open changes." },
    ],
    variants: ["direction: top · bottom · left · right"],
    states: [
      { name: "closed", description: "Only the trigger is present." },
      { name: "open", description: "Slides in; a drag handle allows swipe-to-dismiss (bottom)." },
      { name: "dragging", description: "Follows the pointer/touch during a drag." },
    ],
    usage: {
      do: [
        "Use for mobile-first sheets, action lists, or pickers.",
        "Provide a DrawerTitle.",
        "Keep content short so it fits without excessive scrolling.",
      ],
      dont: [
        "Don't use for desktop modal tasks where Dialog is clearer.",
      ],
    },
    a11y: [
      "Focus is trapped while open and restored on close.",
      "Swipe-to-dismiss is augmented by Esc/close button and a labelled title.",
    ],
    tokens: [
      { token: "bg-background", role: "panel" },
      { token: "bg-muted", role: "drag handle" },
      { token: "text-foreground / text-muted-foreground", role: "title / description" },
    ],
  },

  popover: {
    overview:
      "A non-modal floating panel anchored to a trigger, for rich content like forms or details. Built on Radix Popover.",
    anatomy: [
      "Popover — the stateful root.",
      "PopoverTrigger — the anchor that toggles it.",
      "PopoverAnchor — optional alternate anchor element.",
      "PopoverContent — the floating panel (bg-popover) with side/align positioning.",
      "PopoverHeader / PopoverTitle / PopoverDescription — optional heading region.",
    ],
    props: [
      { name: "open", type: "boolean", description: "Controlled open state." },
      { name: "onOpenChange", type: "(open: boolean) => void", description: "Fires when open changes." },
      { name: "side (content)", type: '"top" | "right" | "bottom" | "left"', default: '"bottom"', description: "Preferred side relative to the trigger." },
      { name: "align (content)", type: '"start" | "center" | "end"', default: '"center"', description: "Alignment along that side." },
    ],
    states: [
      { name: "closed", description: "Only the trigger is present." },
      { name: "open", description: "Panel animates in, positioned by side/align; focus moves inside." },
    ],
    usage: {
      do: [
        "Use for supplementary, non-blocking content tied to a control.",
        "Keep it dismissible by click-outside and Esc (default).",
      ],
      dont: [
        "Don't use for critical flows that need focus trapping — use Dialog.",
        "Don't put very long content in a popover.",
      ],
    },
    a11y: [
      "Non-modal: focus moves into the content but the rest of the page stays interactive.",
      "Esc and click-outside close it; focus returns to the trigger.",
    ],
    tokens: [
      { token: "bg-popover / text-popover-foreground", role: "panel surface + text" },
      { token: "text-muted-foreground", role: "description text" },
    ],
  },

  "hover-card": {
    overview:
      "A preview card that appears on hover/focus of a link or element, for sighted users to peek at related content. Built on Radix HoverCard.",
    anatomy: [
      "HoverCard — the stateful root.",
      "HoverCardTrigger — the hovered/focused element.",
      "HoverCardContent — the floating preview card (bg-popover).",
    ],
    props: [
      { name: "openDelay", type: "number", default: "700", description: "ms before opening on hover." },
      { name: "closeDelay", type: "number", default: "300", description: "ms before closing after leaving." },
    ],
    states: [
      { name: "closed", description: "Only the trigger is shown." },
      { name: "open", description: "Card appears after the open delay on hover or focus." },
    ],
    usage: {
      do: [
        "Use for supplementary previews (user cards, link previews) that are nice-to-have.",
        "Ensure the underlying content is reachable without hover.",
      ],
      dont: [
        "Don't put essential or interactive-only content behind hover — it's not reliably reachable on touch.",
      ],
    },
    a11y: [
      "Opens on focus as well as hover, but treat its content as non-essential (touch users may not trigger it).",
      "Not a replacement for a Tooltip's accessible name.",
    ],
    tokens: [
      { token: "bg-popover / text-popover-foreground", role: "card surface + text" },
    ],
  },

  tooltip: {
    overview:
      "A small label that appears on hover/focus to describe an element. Built on Radix Tooltip; requires a TooltipProvider ancestor.",
    anatomy: [
      "TooltipProvider — wraps the app/section, sharing delay config.",
      "Tooltip — a single tooltip instance.",
      "TooltipTrigger — the element being described.",
      "TooltipContent — the floating label (bg-foreground / text-background) with an arrow.",
    ],
    props: [
      { name: "delayDuration", type: "number", default: "0–700", description: "ms before showing (set on Provider or Tooltip)." },
      { name: "side (content)", type: '"top" | "right" | "bottom" | "left"', default: '"top"', description: "Preferred side." },
    ],
    states: [
      { name: "closed", description: "Only the trigger is shown." },
      { name: "open", description: "Label appears on hover or keyboard focus after the delay." },
    ],
    usage: {
      do: [
        "Use to name or clarify icon-only controls.",
        "Keep the text to a short phrase.",
        "Wrap usages in a TooltipProvider.",
      ],
      dont: [
        "Don't put essential information or interactive elements in a tooltip.",
        "Don't rely on a tooltip as the only label for a control that needs an accessible name — also set aria-label.",
      ],
    },
    a11y: [
      "Shows on focus as well as hover; dismissible with Esc.",
      "Content is short and supplementary; pair icon buttons with a real aria-label too.",
    ],
    tokens: [
      { token: "bg-foreground / text-background", role: "tooltip surface + text (inverted)" },
      { token: "fill-foreground", role: "arrow" },
    ],
  },

  "dropdown-menu": {
    overview:
      "A menu of actions and options triggered by a button — with items, checkbox/radio items, labels, separators, shortcuts, and submenus. Built on Radix DropdownMenu.",
    anatomy: [
      "DropdownMenu — the stateful root; DropdownMenuTrigger opens it.",
      "DropdownMenuContent — the floating menu (bg-popover).",
      "DropdownMenuItem — an action; DropdownMenuShortcut shows a hint.",
      "DropdownMenuCheckboxItem / DropdownMenuRadioGroup + RadioItem — stateful items.",
      "DropdownMenuLabel / DropdownMenuSeparator / DropdownMenuGroup — organisation.",
      "DropdownMenuSub + SubTrigger + SubContent — nested submenus.",
    ],
    props: [
      { name: "open", type: "boolean", description: "Controlled open state (on root)." },
      { name: "onOpenChange", type: "(open: boolean) => void", description: "Fires when open changes." },
      { name: "variant (item)", type: '"default" | "destructive"', default: '"default"', description: "destructive items render in destructive color." },
      { name: "inset (item/label)", type: "boolean", description: "Adds left padding to align with checkbox/radio items." },
    ],
    variants: ["item variant: default · destructive"],
    states: [
      { name: "closed", description: "Only the trigger is present." },
      { name: "open", description: "Menu animates in; first item is focused." },
      { name: "highlighted", description: "Hovered/arrow-focused item → bg-accent." },
      { name: "destructive", description: "variant=destructive items → text-destructive, bg-destructive/10 on highlight." },
    ],
    usage: {
      do: [
        "Use for a list of actions tied to a button (row actions, account menus).",
        "Group related items with labels and separators.",
        "Mark dangerous items with variant=destructive.",
      ],
      dont: [
        "Don't use for site navigation — use Navigation Menu.",
        "Don't use for selecting a form value — use Select.",
      ],
    },
    a11y: [
      "role=menu with full keyboard support (arrows, typeahead, Esc, submenu open/close).",
      "Focus is managed within the menu and restored to the trigger on close.",
    ],
    tokens: [
      { token: "bg-popover / text-popover-foreground", role: "menu surface" },
      { token: "bg-accent / text-accent-foreground", role: "highlighted item" },
      { token: "text-destructive / bg-destructive/10", role: "destructive item" },
      { token: "bg-border", role: "separator" },
      { token: "text-muted-foreground", role: "labels / shortcuts" },
    ],
  },

  "context-menu": {
    overview:
      "A menu of actions opened by right-click (or long-press) on a target area. Same item vocabulary as Dropdown Menu, built on Radix ContextMenu.",
    anatomy: [
      "ContextMenu — the stateful root; ContextMenuTrigger is the right-clickable area.",
      "ContextMenuContent — the floating menu.",
      "ContextMenuItem / CheckboxItem / RadioItem, Label, Separator, Shortcut, Sub*.",
    ],
    props: [
      { name: "onOpenChange", type: "(open: boolean) => void", description: "Fires when open changes." },
      { name: "variant (item)", type: '"default" | "destructive"', default: '"default"', description: "Destructive item color." },
      { name: "inset (item/label)", type: "boolean", description: "Left padding to align with stateful items." },
    ],
    variants: ["item variant: default · destructive"],
    states: [
      { name: "closed", description: "No menu; the trigger area awaits right-click." },
      { name: "open", description: "Menu appears at the pointer; keyboard navigable." },
      { name: "highlighted", description: "Focused item → bg-accent." },
      { name: "destructive", description: "Destructive items → text-destructive." },
    ],
    usage: {
      do: [
        "Use for power-user shortcuts on a specific surface (canvas, table row).",
        "Mirror the most important actions elsewhere too (not everyone right-clicks).",
      ],
      dont: [
        "Don't hide essential actions only behind a context menu.",
        "Don't use where a visible button/menu is expected.",
      ],
    },
    a11y: [
      "role=menu; opens via context-menu key as well as right-click; full keyboard navigation.",
      "Because discovery is low, duplicate critical actions in a visible control.",
    ],
    tokens: [
      { token: "bg-popover / text-popover-foreground", role: "menu surface" },
      { token: "bg-accent / text-accent-foreground", role: "highlighted item" },
      { token: "text-destructive / bg-destructive/10", role: "destructive item" },
      { token: "bg-border", role: "separator" },
    ],
  },

  menubar: {
    overview:
      "A persistent horizontal bar of top-level menus, like a desktop application menu bar. Built on Radix Menubar.",
    anatomy: [
      "Menubar — the bar container.",
      "MenubarMenu — one top-level menu; MenubarTrigger is its label.",
      "MenubarContent — the dropdown for that menu.",
      "MenubarItem / CheckboxItem / RadioItem, Label, Separator, Shortcut, Sub*.",
    ],
    props: [
      { name: "value", type: "string", description: "Controlled open-menu value (on Menubar)." },
      { name: "onValueChange", type: "(value: string) => void", description: "Fires when the open menu changes." },
      { name: "inset (item/label)", type: "boolean", description: "Left padding alignment." },
    ],
    states: [
      { name: "default", description: "Bar visible, all menus closed." },
      { name: "open", description: "A trigger is active (bg-accent); its content is shown." },
      { name: "highlighted", description: "Focused item → bg-accent." },
    ],
    usage: {
      do: [
        "Use for app-like products with many grouped commands (editors, dashboards).",
        "Keep top-level labels short and conventional (File, Edit, View).",
      ],
      dont: [
        "Don't use for simple sites — a single Dropdown Menu or nav is enough.",
      ],
    },
    a11y: [
      "role=menubar; arrow keys move between menus/items, Esc closes, typeahead supported.",
      "Hovering one open menu moves focus across the bar as expected.",
    ],
    tokens: [
      { token: "bg-background", role: "bar surface" },
      { token: "bg-popover / text-popover-foreground", role: "menu content" },
      { token: "bg-accent / text-accent-foreground", role: "active trigger / highlighted item" },
      { token: "bg-border", role: "separator" },
    ],
  },

  command: {
    overview:
      "A fast, composable command palette for searching and running actions, built on cmdk. Render inline or inside CommandDialog for a ⌘K palette.",
    anatomy: [
      "Command — the root list with built-in filtering.",
      "CommandInput — the search field.",
      "CommandList — scrollable results; CommandEmpty for no matches.",
      "CommandGroup — labelled section; CommandItem — a runnable result; CommandShortcut — a hint.",
      "CommandSeparator — divider; CommandDialog — wraps Command in a modal palette.",
    ],
    props: [
      { name: "value", type: "string", description: "Controlled highlighted value." },
      { name: "onValueChange", type: "(value: string) => void", description: "Fires when the highlight changes." },
      { name: "filter", type: "(value, search) => number", description: "Custom scoring function for filtering." },
      { name: "open (CommandDialog)", type: "boolean", description: "Open state when used as a modal palette." },
    ],
    states: [
      { name: "default", description: "Input empty; full list shown." },
      { name: "filtering", description: "Typing narrows results live." },
      { name: "highlighted", description: "Active item → bg-accent." },
      { name: "empty", description: "CommandEmpty message when nothing matches." },
    ],
    usage: {
      do: [
        "Use for global search/command palettes (⌘K) and as the body of a Combobox.",
        "Group actions and provide a clear CommandEmpty state.",
        "Show shortcuts with CommandShortcut.",
      ],
      dont: [
        "Don't use for a small fixed set of options — use a Select or menu.",
      ],
    },
    a11y: [
      "Provides combobox/listbox semantics with full keyboard support (type, arrows, Enter, Esc).",
      "When used in CommandDialog, focus is trapped like a Dialog.",
    ],
    tokens: [
      { token: "bg-popover / text-popover-foreground", role: "palette surface" },
      { token: "bg-accent / text-accent-foreground", role: "highlighted item" },
      { token: "text-muted-foreground", role: "input placeholder / group labels" },
      { token: "bg-border", role: "separator" },
    ],
  },

  "navigation-menu": {
    overview:
      "A site navigation header with optional rich dropdown panels and an animated viewport/indicator. Built on Radix NavigationMenu.",
    anatomy: [
      "NavigationMenu — the root; NavigationMenuList holds the items.",
      "NavigationMenuItem — a top-level entry.",
      "NavigationMenuTrigger — opens a content panel; NavigationMenuLink — a plain link.",
      "NavigationMenuContent — the dropdown panel; NavigationMenuViewport renders it; NavigationMenuIndicator points at the active item.",
    ],
    props: [
      { name: "value", type: "string", description: "Controlled active item (on root)." },
      { name: "onValueChange", type: "(value: string) => void", description: "Fires when the active item changes." },
      { name: "viewport", type: "boolean", default: "true", description: "Render content in a shared animated viewport." },
    ],
    states: [
      { name: "default", description: "Links/triggers in the bar." },
      { name: "open", description: "A trigger's content panel is shown in the viewport." },
      { name: "active", description: "Current item highlighted (bg-accent / bg-accent/50)." },
      { name: "focus-visible", description: "ring-ring/50 on links/triggers." },
    ],
    usage: {
      do: [
        "Use for primary site navigation with grouped or featured links.",
        "Use NavigationMenuLink (real anchors) so navigation stays accessible.",
        "Keep panels scannable.",
      ],
      dont: [
        "Don't use for in-app action menus — use Dropdown Menu / Menubar.",
        "Don't put non-navigation actions in it.",
      ],
    },
    a11y: [
      "Real links underpin navigation; keyboard and screen-reader friendly.",
      "Panels open on interaction and close on Esc/blur; the indicator conveys the active item beyond color via focus.",
    ],
    tokens: [
      { token: "bg-background", role: "bar surface" },
      { token: "bg-popover / text-popover-foreground", role: "dropdown panel" },
      { token: "bg-accent / bg-accent/50 / text-accent-foreground", role: "active / hovered item" },
      { token: "ring-ring/50", role: "focus ring" },
      { token: "text-muted-foreground", role: "secondary text" },
    ],
  },

  // ── Feedback ─────────────────────────────────────────────────────────────
  alert: {
    overview:
      "An inline callout that draws attention to a short, important message, with an optional leading icon. Static and in-flow (not a toast or modal).",
    anatomy: [
      "Alert — the role=alert container (bg-card), optional leading icon slot.",
      "AlertTitle — the concise heading.",
      "AlertDescription — supporting text (text-muted-foreground).",
    ],
    props: [
      { name: "variant", type: '"default" | "destructive"', default: '"default"', description: "Neutral info or destructive/error emphasis." },
      { name: "...props", type: 'React.ComponentProps<"div">', description: "Native div attributes." },
    ],
    variants: ["variant: default · destructive"],
    states: [
      { name: "default", description: "Neutral callout on bg-card." },
      { name: "destructive", description: "Error emphasis — text-destructive title, destructive description." },
    ],
    usage: {
      do: [
        "Use for persistent, contextual messages tied to a region of the page.",
        "Keep the title short; put detail in the description.",
        "Pair an icon with text — don't rely on color/icon alone.",
      ],
      dont: [
        "Don't use for transient confirmations — use a toast (Sonner).",
        "Don't use for blocking decisions — use Alert Dialog.",
      ],
    },
    a11y: [
      "Container carries role=alert so assistive tech announces it when it appears.",
      "Meaning is conveyed by text, not color alone.",
      "Note: default description uses --muted-foreground (≈4.35:1 on card) — a documented Figma-fidelity exception, not a fix.",
    ],
    tokens: [
      { token: "bg-card / text-card-foreground", role: "alert surface + title" },
      { token: "text-destructive / text-destructive/90", role: "destructive title / description" },
      { token: "text-muted-foreground", role: "default description" },
    ],
  },

  sonner: {
    overview:
      "Toast notifications — brief, auto-dismissing messages shown in a corner. <Toaster /> mounts once near the app root; the imperative toast() function fires messages from anywhere. Built on the sonner library.",
    anatomy: [
      "Toaster — the portal/region that renders and stacks toasts (placed once in the layout).",
      "toast(message, options) — imperative call; variants: toast.success / .error / .warning / .info / .loading / .promise.",
      "Each toast — optional title, description, action button, and close.",
    ],
    props: [
      { name: "position (Toaster)", type: '"top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center"', default: '"bottom-right"', description: "Where toasts appear." },
      { name: "richColors (Toaster)", type: "boolean", description: "Use colored success/error/warning styling." },
      { name: "duration", type: "number", description: "ms before auto-dismiss (per toast or global)." },
      { name: "action (toast)", type: "{ label, onClick }", description: "Optional action button on a toast." },
    ],
    variants: ["toast type: default · success · error · warning · info · loading · promise"],
    states: [
      { name: "enter", description: "Toast slides/fades in and stacks." },
      { name: "visible", description: "Shown until duration elapses or dismissed." },
      { name: "loading → resolved", description: "toast.promise swaps loading for success/error." },
      { name: "exit", description: "Auto-dismiss or manual close animates out." },
    ],
    usage: {
      do: [
        "Use for brief, non-critical confirmations ('Saved').",
        "Mount a single <Toaster /> in the root layout.",
        "Use toast.promise for async operations.",
      ],
      dont: [
        "Don't put essential or lengthy content in a toast — it disappears.",
        "Don't require interaction inside a toast for a critical flow.",
      ],
    },
    a11y: [
      "sonner renders toasts in an aria-live region so they're announced.",
      "Toasts are reachable/dismissible via keyboard; avoid color-only meaning.",
      "Keep durations long enough to read; offer a persistent alternative for important info.",
    ],
    tokens: [
      { token: "(themed via next-themes + sonner CSS vars)", role: "surface/text follow the active theme" },
      { token: "success / warning / error", role: "richColors map to semantic intent" },
    ],
  },

  progress: {
    overview:
      "A horizontal bar showing completion of a determinate task (0–100%). Built on Radix Progress.",
    anatomy: [
      "Progress — the track (bg-primary/20).",
      "Indicator — the filled portion (bg-primary), width driven by value.",
    ],
    props: [
      { name: "value", type: "number", description: "Current progress 0–100 (omit/null for indeterminate)." },
      { name: "max", type: "number", default: "100", description: "Maximum value." },
      { name: "...props", type: "React.ComponentProps<typeof ProgressPrimitive.Root>", description: "Native attributes; add aria-label if no visible label." },
    ],
    states: [
      { name: "default", description: "Indicator fills to value over the track." },
      { name: "complete", description: "value=100 — fully filled." },
    ],
    usage: {
      do: [
        "Use for determinate progress (uploads, multi-step completion).",
        "Provide an accessible name (aria-label or associated text).",
        "Show a numeric percentage nearby when precision helps.",
      ],
      dont: [
        "Don't use for unknown-duration waits — use a Spinner/Skeleton.",
      ],
    },
    a11y: [
      "Exposes role=progressbar with aria-valuenow/min/max.",
      "Needs an accessible name describing what is progressing.",
    ],
    tokens: [
      { token: "bg-primary/20", role: "track" },
      { token: "bg-primary", role: "filled indicator" },
    ],
  },

  skeleton: {
    overview:
      "A pulsing placeholder that mimics the shape of content while it loads, reducing perceived wait and layout shift.",
    anatomy: [
      "Skeleton — a single shaped block (bg-accent, animate-pulse); compose several to mirror the real layout.",
    ],
    props: [
      { name: "className", type: "string", description: "Size/shape via utilities (e.g. h-4 w-32 rounded-full)." },
      { name: "...props", type: 'React.ComponentProps<"div">', description: "Native div attributes." },
    ],
    states: [
      { name: "loading", description: "Pulsing placeholder shown while data is pending." },
    ],
    usage: {
      do: [
        "Match skeletons to the size/shape of the content they replace to avoid layout shift.",
        "Use for initial loads of known layouts (cards, lists, avatars).",
      ],
      dont: [
        "Don't use for very short waits where a flash is more jarring than helpful.",
        "Don't leave skeletons up indefinitely on error — show an error/empty state.",
      ],
    },
    a11y: [
      "Decorative — convey loading status to assistive tech separately (e.g. aria-busy on the region or a live message).",
    ],
    tokens: [
      { token: "bg-accent", role: "placeholder fill (with animate-pulse)" },
    ],
  },

  spinner: {
    overview:
      "An indeterminate loading indicator (animated icon) for waits of unknown duration. Inherits the current text color and sizes with the font/box.",
    anatomy: [
      "Spinner — an animate-spin icon (Loader); color via currentColor, size via size-* / text-*.",
    ],
    props: [
      { name: "className", type: "string", description: "Set size and color (e.g. size-6 text-primary)." },
      { name: "...props", type: 'React.ComponentProps<"svg">', description: "Native svg attributes; add aria-label or wrap with status text." },
    ],
    states: [
      { name: "spinning", description: "Continuous rotation while loading." },
    ],
    usage: {
      do: [
        "Use for indeterminate waits (submitting, fetching).",
        "Place inside buttons to show in-progress actions.",
        "Provide accompanying status text or an accessible label.",
      ],
      dont: [
        "Don't use where progress is known — use Progress.",
        "Don't show a bare spinner with no context for long waits.",
      ],
    },
    a11y: [
      "On its own it's decorative — announce loading via an aria-live region or label the control as busy.",
      "Respect reduced-motion preferences where possible.",
    ],
    tokens: [
      { token: "currentColor", role: "stroke follows surrounding text color (e.g. text-primary)" },
    ],
  },

  badge: {
    overview:
      "A small label for status, counts, or categories. Non-interactive by default; can render as a link/button via asChild.",
    anatomy: [
      "Badge — a compact pill (data-slot=\"badge\") with optional leading icon and text.",
    ],
    props: [
      { name: "variant", type: '"default" | "secondary" | "destructive" | "outline"', default: '"default"', description: "Visual style/emphasis." },
      { name: "asChild", type: "boolean", default: "false", description: "Render as the child element (e.g. an <a>) keeping badge styles." },
      { name: "...props", type: 'React.ComponentProps<"span">', description: "Native attributes." },
    ],
    variants: ["variant: default · secondary · destructive · outline"],
    states: [
      { name: "default", description: "bg-primary / text-primary-foreground." },
      { name: "secondary", description: "bg-secondary / text-secondary-foreground." },
      { name: "destructive", description: "bg-destructive surface." },
      { name: "outline", description: "border-border, transparent surface." },
      { name: "focus-visible (asChild link)", description: "ring-ring/50 when interactive." },
    ],
    usage: {
      do: [
        "Use for concise status, counts, or tags.",
        "Keep text to a word or two.",
        "Don't rely on color alone — include a clear label.",
      ],
      dont: [
        "Don't use a badge as a primary action — use a Button.",
        "Don't overload a view with many competing badges.",
      ],
    },
    a11y: [
      "Decorative by default; if it conveys status, ensure the text states it (not color only).",
      "When interactive (asChild), it inherits proper focus ring and semantics from the child element.",
    ],
    tokens: [
      { token: "bg-primary / text-primary-foreground", role: "default" },
      { token: "bg-secondary / text-secondary-foreground", role: "secondary" },
      { token: "bg-destructive", role: "destructive" },
      { token: "border-border", role: "outline border" },
      { token: "ring-ring/50", role: "focus ring (interactive)" },
    ],
  },

  empty: {
    overview:
      "An empty-state block shown when there's no content yet — an icon/media, a title, a description, and an optional call-to-action.",
    anatomy: [
      "Empty — the centered container.",
      "EmptyHeader — wraps media + title + description.",
      "EmptyMedia — icon or illustration (variant: default | icon).",
      "EmptyTitle — the headline.",
      "EmptyDescription — supporting text (text-muted-foreground).",
      "EmptyContent — actions (e.g. a primary Button).",
    ],
    props: [
      { name: "variant (EmptyMedia)", type: '"default" | "icon"', default: '"default"', description: "Plain media or a tokened icon chip." },
      { name: "...props", type: 'React.ComponentProps<"div">', description: "Native div attributes on each part." },
    ],
    states: [
      { name: "empty", description: "Shown when a list/result set/area has no items." },
    ],
    usage: {
      do: [
        "Explain why it's empty and offer a next step (CTA).",
        "Use for first-run, no-results, and cleared states.",
        "Keep the message encouraging and specific.",
      ],
      dont: [
        "Don't show a blank area with no guidance.",
        "Don't use an empty state to mask an error — use an error state.",
      ],
    },
    a11y: [
      "Use a real heading (EmptyTitle) so the state is discoverable in the document outline.",
      "Ensure any CTA is a proper, labelled control.",
    ],
    tokens: [
      { token: "bg-muted", role: "icon/media chip surface" },
      { token: "text-foreground", role: "title" },
      { token: "text-muted-foreground", role: "description" },
      { token: "text-primary", role: "media icon / link accent" },
    ],
  },

  // ── Data Display ───────────────────────────────────────────────────────────
  table: {
    overview:
      "A styled set of primitives for rendering tabular data with header, body, footer, and caption. Composable, semantic HTML table elements.",
    anatomy: [
      "Table — the scroll-wrapped <table>.",
      "TableHeader / TableBody / TableFooter — the <thead>/<tbody>/<tfoot> sections.",
      "TableRow — a row; TableHead — a header cell; TableCell — a data cell.",
      "TableCaption — an accessible caption describing the table.",
    ],
    props: [
      { name: "...props", type: "React.ComponentProps of the matching element", description: "Each part forwards native attributes to its <table>/<tr>/<td> element." },
    ],
    states: [
      { name: "default", description: "Header row with muted text; rows separated by borders." },
      { name: "hover", description: "Row hover → bg-muted/50." },
      { name: "selected", description: "data-state=selected rows can read bg-muted." },
    ],
    usage: {
      do: [
        "Use real table elements for tabular data so semantics and screen-reader navigation work.",
        "Add a TableCaption (or aria-label) describing the table.",
        "Use TableHead for column headers.",
      ],
      dont: [
        "Don't use a table purely for layout.",
        "Don't fake rows with divs when data is tabular.",
      ],
    },
    a11y: [
      "Native table semantics give row/column navigation in screen readers.",
      "Provide a caption/label; mark header cells with TableHead (th).",
    ],
    tokens: [
      { token: "bg-muted", role: "selected row / header surface" },
      { token: "bg-muted/50", role: "row hover" },
      { token: "text-foreground / text-muted-foreground", role: "cell text / header text" },
    ],
  },

  "data-table": {
    overview:
      "A fuller table layout composed from the Table primitives — header, body, footer (e.g. totals), and caption — for displaying structured rows of data. Build it from Table parts; add sorting/filtering/pagination as needed.",
    anatomy: [
      "Built from Table + TableHeader/Body/Footer + TableRow + TableHead/Cell + TableCaption.",
      "Header row for columns, body rows for data, footer for summary/totals, caption for context.",
    ],
    props: [
      { name: "(composition)", type: "—", description: "No dedicated component. Map your data to TableRow/TableCell; wire sorting/pagination via your own state or a table library." },
    ],
    states: [
      { name: "default", description: "Rendered rows with hover/selected states from Table." },
      { name: "empty", description: "Pair with an Empty state when there are no rows." },
    ],
    usage: {
      do: [
        "Reuse the Table primitives for consistent styling.",
        "Add a caption/label and clear column headers.",
        "Show an Empty state when there's no data.",
      ],
      dont: [
        "Don't reinvent table styling — compose from Table.",
        "Don't paginate without keeping headers and context visible.",
      ],
    },
    a11y: [
      "Inherits native table semantics from the Table primitives.",
      "Keep header cells as TableHead and provide a caption/label.",
    ],
    tokens: [
      { token: "bg-muted / bg-muted/50", role: "header / row hover (via Table)" },
      { token: "text-muted-foreground", role: "header & caption text" },
    ],
  },

  card: {
    overview:
      "A surface that groups related content and actions — header, content, and footer — into a bordered container.",
    anatomy: [
      "Card — the bordered surface (bg-card).",
      "CardHeader — wraps CardTitle, CardDescription, and an optional CardAction.",
      "CardContent — the main body.",
      "CardFooter — actions or meta at the bottom.",
    ],
    props: [
      { name: "...props", type: 'React.ComponentProps<"div">', description: "Native div attributes on each part." },
    ],
    states: [
      { name: "default", description: "Static surface; interactivity comes from controls inside." },
    ],
    usage: {
      do: [
        "Group related information and its actions in one card.",
        "Use CardTitle/CardDescription for a clear heading.",
        "Place primary actions in CardFooter or CardAction.",
      ],
      dont: [
        "Don't nest cards deeply.",
        "Don't make the whole card a click target without a real link/button inside.",
      ],
    },
    a11y: [
      "A container, not a control — ensure interactive elements inside are proper buttons/links.",
      "Use a real heading element for CardTitle where it aids the document outline.",
    ],
    tokens: [
      { token: "bg-card / text-card-foreground", role: "card surface + text" },
      { token: "text-muted-foreground", role: "description" },
    ],
  },

  avatar: {
    overview:
      "A user/entity image with a text fallback, supporting status badges and stacked groups. Built on Radix Avatar.",
    anatomy: [
      "Avatar — the rounded container.",
      "AvatarImage — the photo (hidden until loaded).",
      "AvatarFallback — initials/icon shown while loading or on error.",
      "AvatarBadge — a small status indicator; AvatarGroup / AvatarGroupCount — overlapping stacks with an overflow count.",
    ],
    props: [
      { name: "...props (Avatar)", type: "React.ComponentProps<typeof AvatarPrimitive.Root>", description: "Size via className (e.g. size-10)." },
      { name: "src / alt (AvatarImage)", type: "string", description: "Image source and alt text." },
      { name: "delayMs (AvatarFallback)", type: "number", description: "Delay before showing the fallback to avoid flicker." },
    ],
    states: [
      { name: "loading", description: "AvatarFallback (bg-muted) shown until the image loads." },
      { name: "loaded", description: "AvatarImage replaces the fallback." },
      { name: "error", description: "Fallback remains if the image fails." },
    ],
    usage: {
      do: [
        "Provide meaningful alt text (or initials) for the person/entity.",
        "Use AvatarGroup with a count for overflow.",
        "Convey status with AvatarBadge plus a label, not color alone.",
      ],
      dont: [
        "Don't leave AvatarImage without alt.",
        "Don't rely on the image always loading — keep a fallback.",
      ],
    },
    a11y: [
      "AvatarImage needs alt; the fallback provides a text alternative.",
      "Note: fallback text uses --muted-foreground — a documented Figma-fidelity contrast exception.",
    ],
    tokens: [
      { token: "bg-muted / text-muted-foreground", role: "fallback surface + initials" },
      { token: "bg-primary / text-primary-foreground", role: "badge / accent" },
      { token: "ring-background", role: "ring separating stacked avatars" },
    ],
  },

  accordion: {
    overview:
      "Vertically stacked headers that each expand to reveal a section of content. Built on Radix Accordion.",
    anatomy: [
      "Accordion — the root (type single or multiple).",
      "AccordionItem — one header+panel pair.",
      "AccordionTrigger — the clickable header (chevron rotates when open).",
      "AccordionContent — the collapsible panel.",
    ],
    props: [
      { name: "type", type: '"single" | "multiple"', description: "Whether one or many items can be open." },
      { name: "collapsible", type: "boolean", description: "For single: allow closing the open item." },
      { name: "value / defaultValue", type: "string | string[]", description: "Controlled / initial open item(s)." },
      { name: "onValueChange", type: "(value) => void", description: "Fires when open items change." },
    ],
    variants: ["type: single · multiple"],
    states: [
      { name: "collapsed", description: "Panel hidden; chevron down." },
      { name: "expanded", description: "data-state=open → panel revealed, chevron rotated." },
      { name: "focus-visible", description: "Trigger shows border-ring + ring-ring/50." },
    ],
    usage: {
      do: [
        "Use to declutter long content into scannable sections (e.g. FAQs).",
        "Use type=single for one-at-a-time, multiple for independent panels.",
      ],
      dont: [
        "Don't hide critical content users need at a glance.",
        "Don't nest accordions deeply.",
      ],
    },
    a11y: [
      "Triggers are buttons with aria-expanded controlling their panels.",
      "Keyboard: Enter/Space toggles, arrows move between headers.",
    ],
    tokens: [
      { token: "border-ring · ring-ring/50", role: "trigger focus ring" },
      { token: "text-muted-foreground", role: "chevron icon" },
    ],
  },

  collapsible: {
    overview:
      "A single trigger that expands/collapses one panel of content. The primitive behind accordions; built on Radix Collapsible.",
    anatomy: [
      "Collapsible — the root.",
      "CollapsibleTrigger — toggles open/closed.",
      "CollapsibleContent — the panel that shows/hides.",
    ],
    props: [
      { name: "open", type: "boolean", description: "Controlled open state." },
      { name: "defaultOpen", type: "boolean", description: "Uncontrolled initial state." },
      { name: "onOpenChange", type: "(open: boolean) => void", description: "Fires on toggle." },
      { name: "disabled", type: "boolean", description: "Disables toggling." },
    ],
    states: [
      { name: "closed", description: "Content hidden (data-state=closed)." },
      { name: "open", description: "Content revealed (data-state=open)." },
    ],
    usage: {
      do: [
        "Use to show/hide a single optional region (e.g. 'show more').",
        "Style the trigger so its expanded/collapsed state is clear.",
      ],
      dont: [
        "Don't use for a set of sections — use Accordion.",
      ],
    },
    a11y: [
      "Trigger exposes aria-expanded and controls the content region.",
      "Keyboard toggling via Enter/Space.",
    ],
    tokens: [
      { token: "(inherits from the trigger/content you compose)", role: "no dedicated tokens" },
    ],
  },

  carousel: {
    overview:
      "A horizontally (or vertically) scrolling set of slides with previous/next controls and swipe support. Built on Embla Carousel.",
    anatomy: [
      "Carousel — the root managing the Embla instance and orientation.",
      "CarouselContent — the track; CarouselItem — each slide.",
      "CarouselPrevious / CarouselNext — navigation buttons.",
    ],
    props: [
      { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Scroll axis." },
      { name: "opts", type: "EmblaOptionsType", description: "Embla options (loop, align, …)." },
      { name: "setApi", type: "(api) => void", description: "Access the Embla API for custom control." },
    ],
    variants: ["orientation: horizontal · vertical"],
    states: [
      { name: "default", description: "Current slide shown; prev/next enable per position." },
      { name: "start / end", description: "Prev or Next disabled at the boundaries (non-loop)." },
    ],
    usage: {
      do: [
        "Use for browsable galleries or featured sets.",
        "Keep prev/next buttons visible and labelled.",
        "Consider loop/auto-advance carefully.",
      ],
      dont: [
        "Don't put essential content only in later slides.",
        "Don't auto-advance without a pause control.",
      ],
    },
    a11y: [
      "Embla provides keyboard support; prev/next are real buttons (label them).",
      "The carousel is exposed as a labelled region/roledescription so AT can navigate; avoid motion that ignores reduced-motion.",
    ],
    tokens: [
      { token: "(prev/next inherit Button outline tokens)", role: "navigation buttons via Button" },
    ],
  },

  chart: {
    overview:
      "A theming wrapper around Recharts that wires your data into token-driven containers, tooltips, and legends. You supply the Recharts chart; Chart handles colors and theming.",
    anatomy: [
      "ChartContainer — wraps a Recharts chart, injecting the color config as CSS vars.",
      "ChartTooltip + ChartTooltipContent — themed tooltip.",
      "ChartLegend + ChartLegendContent — themed legend.",
      "config — maps each series key to a label and a token-based color.",
    ],
    props: [
      { name: "config", type: "ChartConfig", description: "Per-series { label, color, icon }; colors should be tokens / CSS vars." },
      { name: "children", type: "React.ReactElement", description: "A Recharts chart (Bar/Line/Area/Pie…)." },
    ],
    states: [
      { name: "default", description: "Renders the chart with themed grid/axes/series." },
      { name: "hover", description: "ChartTooltipContent shows the focused datum." },
    ],
    usage: {
      do: [
        "Drive series colors from the config using tokens / CSS vars.",
        "Provide labels in config for accessible tooltips/legends.",
        "Use the provided tooltip/legend content for consistent theming.",
      ],
      dont: [
        "Don't hardcode hex colors in the chart — use the config + tokens.",
        "Don't rely on color alone to distinguish series; add labels.",
      ],
    },
    a11y: [
      "Provide text labels and a summary; charts are hard for AT — consider a data table alternative.",
      "Tooltips/legends use config labels so values are readable.",
    ],
    tokens: [
      { token: "bg-background / border-border/50", role: "tooltip surface" },
      { token: "fill-muted / fill-muted-foreground", role: "grid / axis fills" },
      { token: "text-foreground / text-muted-foreground", role: "labels / secondary text" },
      { token: "--color-<key> (from config)", role: "per-series colors mapped to tokens" },
    ],
  },

  pagination: {
    overview:
      "Navigation for paged content — previous/next plus numbered page links and an ellipsis for gaps. Renders as a labelled nav of links.",
    anatomy: [
      "Pagination — a <nav> labelled for assistive tech.",
      "PaginationContent — the list; PaginationItem — each entry.",
      "PaginationLink — a page link (isActive marks the current page).",
      "PaginationPrevious / PaginationNext — directional links; PaginationEllipsis — overflow gap.",
    ],
    props: [
      { name: "isActive (PaginationLink)", type: "boolean", description: "Marks the current page (aria-current=page)." },
      { name: "size", type: '"default" | "sm" | "lg" | "icon"', description: "Link sizing (via buttonVariants)." },
      { name: "...props", type: "anchor attributes", description: "href and link attributes pass through." },
    ],
    states: [
      { name: "default", description: "Page links in a row." },
      { name: "active", description: "Current page styled and marked aria-current." },
      { name: "boundary", description: "Prev/Next at first/last page." },
    ],
    usage: {
      do: [
        "Mark the current page with isActive (sets aria-current).",
        "Use the ellipsis for large page counts.",
        "Use real links so pages are navigable/bookmarkable.",
      ],
      dont: [
        "Don't show every page number for huge sets — collapse with ellipsis.",
      ],
    },
    a11y: [
      "Wrapped in a labelled nav; current page exposes aria-current=page.",
      "Prev/Next links carry accessible names even when icon-only.",
    ],
    tokens: [
      { token: "(links inherit buttonVariants ghost/outline tokens)", role: "page links via Button styles" },
    ],
  },

  breadcrumb: {
    overview:
      "Shows the path to the current page as a hierarchy of links, ending in the current page. Renders as a labelled nav.",
    anatomy: [
      "Breadcrumb — a <nav aria-label=\"breadcrumb\">.",
      "BreadcrumbList — the ordered list; BreadcrumbItem — each step.",
      "BreadcrumbLink — a link to an ancestor; BreadcrumbPage — the current page (non-link).",
      "BreadcrumbSeparator — between items; BreadcrumbEllipsis — collapsed middle.",
    ],
    props: [
      { name: "...props", type: "list/anchor attributes", description: "Native attributes on each part; BreadcrumbLink takes href." },
    ],
    states: [
      { name: "default", description: "Ancestor links + separators." },
      { name: "current", description: "BreadcrumbPage marks the current location (aria-current=page)." },
    ],
    usage: {
      do: [
        "Use for deep hierarchies so users can navigate up.",
        "Mark the last item as BreadcrumbPage (not a link).",
        "Collapse long trails with BreadcrumbEllipsis.",
      ],
      dont: [
        "Don't use breadcrumbs for flat sites or as primary navigation.",
      ],
    },
    a11y: [
      "nav is labelled 'breadcrumb'; the current page uses aria-current=page.",
      "Separators are decorative (aria-hidden).",
    ],
    tokens: [
      { token: "text-muted-foreground", role: "ancestor links / separators" },
      { token: "text-foreground", role: "current page" },
    ],
  },

  tabs: {
    overview:
      "Switch between sibling panels of content within the same context, one visible at a time. Built on Radix Tabs.",
    anatomy: [
      "Tabs — the root holding the active value.",
      "TabsList — the row of tab buttons (bg-muted).",
      "TabsTrigger — one tab; the active one is highlighted.",
      "TabsContent — the panel tied to a tab value.",
    ],
    props: [
      { name: "value / defaultValue", type: "string", description: "Controlled / initial active tab." },
      { name: "onValueChange", type: "(value: string) => void", description: "Fires when the tab changes." },
      { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Tab list direction." },
    ],
    variants: ["orientation: horizontal · vertical"],
    states: [
      { name: "inactive", description: "text-foreground/60 trigger." },
      { name: "active", description: "data-state=active → raised trigger (bg-background) and its panel shown." },
      { name: "focus-visible", description: "border-ring + ring-ring/50." },
    ],
    usage: {
      do: [
        "Use for switching between related views in one place.",
        "Keep tab labels short and parallel.",
      ],
      dont: [
        "Don't use tabs for sequential steps — use a stepper/wizard.",
        "Don't hide content users need to compare side by side.",
      ],
    },
    a11y: [
      "role=tablist/tab/tabpanel with arrow-key navigation and aria-selected.",
      "Each panel is associated with its tab; focus management is handled by Radix.",
    ],
    tokens: [
      { token: "bg-muted", role: "tab list surface" },
      { token: "bg-background / text-foreground", role: "active trigger" },
      { token: "text-foreground/60 / text-muted-foreground", role: "inactive trigger" },
      { token: "border-ring · ring-ring/50", role: "focus ring" },
    ],
  },

  separator: {
    overview:
      "A thin divider between content, horizontal or vertical. Built on Radix Separator.",
    anatomy: [
      "Separator — a 1px line (bg-border), oriented horizontally or vertically.",
    ],
    props: [
      { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Line direction." },
      { name: "decorative", type: "boolean", default: "true", description: "If true, hidden from AT; set false when it carries meaning." },
    ],
    variants: ["orientation: horizontal · vertical"],
    states: [
      { name: "default", description: "A static hairline." },
    ],
    usage: {
      do: [
        "Use to separate groups of related content or controls.",
        "Set decorative=false only when the divider is semantically meaningful.",
      ],
      dont: [
        "Don't overuse dividers where spacing alone suffices.",
      ],
    },
    a11y: [
      "Decorative by default (aria-hidden); as a semantic separator it exposes role=separator.",
    ],
    tokens: [
      { token: "bg-border", role: "divider line" },
    ],
  },

  "aspect-ratio": {
    overview:
      "Constrains its child to a fixed width-to-height ratio (e.g. 16:9), keeping media responsive without layout shift. Built on Radix AspectRatio.",
    anatomy: [
      "AspectRatio — a wrapper that reserves space at the given ratio for its single child (image, video, embed).",
    ],
    props: [
      { name: "ratio", type: "number", default: "1", description: "Width / height (e.g. 16 / 9)." },
      { name: "...props", type: 'React.ComponentProps<"div">', description: "Native div attributes." },
    ],
    states: [
      { name: "default", description: "Child fills the reserved ratio box." },
    ],
    usage: {
      do: [
        "Use for images, video, and embeds to prevent layout shift.",
        "Make the child fill the box (object-cover for images).",
      ],
      dont: [
        "Don't use it for arbitrary text blocks that shouldn't be ratio-locked.",
      ],
    },
    a11y: [
      "Layout-only — accessibility comes from the child (e.g. img alt, video captions).",
    ],
    tokens: [
      { token: "(layout-only)", role: "no dedicated tokens" },
    ],
  },

  "scroll-area": {
    overview:
      "A scrollable region with cross-browser, styled scrollbars. Built on Radix ScrollArea.",
    anatomy: [
      "ScrollArea — the viewport wrapper with a constrained size.",
      "ScrollBar — the custom horizontal/vertical scrollbar (thumb uses bg-border).",
    ],
    props: [
      { name: "type", type: '"auto" | "always" | "scroll" | "hover"', description: "When scrollbars are visible." },
      { name: "...props", type: "React.ComponentProps<typeof ScrollAreaPrimitive.Root>", description: "Set the size via className; content scrolls within." },
    ],
    states: [
      { name: "default", description: "Content scrolls; scrollbar appears per type." },
      { name: "scrolling", description: "Thumb tracks the scroll position." },
    ],
    usage: {
      do: [
        "Use for constrained, scrollable lists/panels needing consistent scrollbar styling.",
        "Keep keyboard scrolling/focus reachable for the content.",
      ],
      dont: [
        "Don't wrap the whole page — use native document scrolling.",
      ],
    },
    a11y: [
      "Note: the viewport isn't tabbable by default (a documented axe exception); ensure focusable content inside remains reachable.",
      "Don't trap keyboard users; native scroll keys should work.",
    ],
    tokens: [
      { token: "bg-border", role: "scrollbar thumb" },
      { token: "ring-ring/50", role: "focus ring" },
    ],
  },

  item: {
    overview:
      "A flexible row container for list-like content — media, title, description, and actions — composable into separated groups. A building block for lists, settings rows, and option lists.",
    anatomy: [
      "ItemGroup — wraps multiple Items; ItemSeparator — divides them.",
      "Item — one row (variant + size); ItemHeader / ItemFooter — optional row regions.",
      "ItemMedia — leading icon/avatar; ItemContent — ItemTitle + ItemDescription.",
      "ItemActions — trailing controls.",
    ],
    props: [
      { name: "variant", type: '"default" | "outline" | "muted"', default: '"default"', description: "Row surface style." },
      { name: "size", type: '"default" | "sm"', default: '"default"', description: "Row density." },
      { name: "asChild", type: "boolean", description: "Render the row as a link/button while keeping layout." },
    ],
    variants: [
      "variant: default · outline · muted",
      "size: default · sm",
    ],
    states: [
      { name: "default", description: "Static row." },
      { name: "hover", description: "Interactive rows → bg-accent/50." },
      { name: "focus-visible", description: "border-ring + ring-ring/50 when interactive." },
    ],
    usage: {
      do: [
        "Use for consistent list/settings rows with media, text, and actions.",
        "Group with ItemGroup + ItemSeparator.",
        "Make rows interactive via asChild (real link/button).",
      ],
      dont: [
        "Don't put unrelated content in one Item.",
        "Don't make a row clickable without a real control (asChild).",
      ],
    },
    a11y: [
      "When interactive, render as a real link/button (asChild) so it's focusable and labelled.",
      "Use ItemTitle as the accessible label for the row's action.",
    ],
    tokens: [
      { token: "bg-accent/50", role: "row hover" },
      { token: "bg-muted / bg-muted/50", role: "muted variant surface" },
      { token: "border-border", role: "outline variant / separators" },
      { token: "border-ring · ring-ring/50", role: "focus ring" },
      { token: "text-muted-foreground", role: "description" },
    ],
  },

  kbd: {
    overview:
      "Displays keyboard keys and shortcut combinations as small key caps, groupable with KbdGroup.",
    anatomy: [
      "Kbd — a single key cap (e.g. ⌘, Esc).",
      "KbdGroup — a sequence of keys forming a shortcut (⌘ + K).",
    ],
    props: [
      { name: "...props", type: 'React.ComponentProps<"kbd">', description: "Native kbd attributes." },
    ],
    states: [
      { name: "default", description: "A static key cap (bg-muted)." },
    ],
    usage: {
      do: [
        "Use to document keyboard shortcuts in menus, tooltips, and docs.",
        "Group multi-key shortcuts with KbdGroup.",
      ],
      dont: [
        "Don't use Kbd for non-keyboard labels.",
      ],
    },
    a11y: [
      "Uses the semantic <kbd> element.",
      "Note: muted key text uses --muted-foreground — a documented Figma-fidelity contrast exception.",
    ],
    tokens: [
      { token: "bg-muted / text-muted-foreground", role: "key cap surface + text" },
      { token: "bg-background/10 / bg-background/20 / text-background", role: "key caps on inverted surfaces (e.g. tooltip)" },
    ],
  },
}
