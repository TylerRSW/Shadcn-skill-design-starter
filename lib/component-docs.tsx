import type { ComponentType } from "react"

import { AccordionDemo } from "@/components/demos/accordion-demo"
import { AlertDemo } from "@/components/demos/alert-demo"
import { AlertDialogDemo } from "@/components/demos/alert-dialog-demo"
import { AspectRatioDemo } from "@/components/demos/aspect-ratio-demo"
import { AvatarDemo } from "@/components/demos/avatar-demo"
import { BadgeDemo } from "@/components/demos/badge-demo"
import { BreadcrumbDemo } from "@/components/demos/breadcrumb-demo"
import { ButtonDemo } from "@/components/demos/button-demo"
import { ButtonGroupDemo } from "@/components/demos/button-group-demo"
import { CalendarDemo } from "@/components/demos/calendar-demo"
import { CardDemo } from "@/components/demos/card-demo"
import { CarouselDemo } from "@/components/demos/carousel-demo"
import { ChartDemo } from "@/components/demos/chart-demo"
import { CheckboxDemo } from "@/components/demos/checkbox-demo"
import { CollapsibleDemo } from "@/components/demos/collapsible-demo"
import { ComboboxDemo } from "@/components/demos/combobox-demo"
import { CommandDemo } from "@/components/demos/command-demo"
import { ContextMenuDemo } from "@/components/demos/context-menu-demo"
import { DataTableDemo } from "@/components/demos/data-table-demo"
import { DatePickerDemo } from "@/components/demos/date-picker-demo"
import { DialogDemo } from "@/components/demos/dialog-demo"
import { DrawerDemo } from "@/components/demos/drawer-demo"
import { DropdownMenuDemo } from "@/components/demos/dropdown-menu-demo"
import { EmptyDemo } from "@/components/demos/empty-demo"
import { FieldDemo } from "@/components/demos/field-demo"
import { HoverCardDemo } from "@/components/demos/hover-card-demo"
import { InputDemo } from "@/components/demos/input-demo"
import { InputGroupDemo } from "@/components/demos/input-group-demo"
import { InputOtpDemo } from "@/components/demos/input-otp-demo"
import { ItemDemo } from "@/components/demos/item-demo"
import { KbdDemo } from "@/components/demos/kbd-demo"
import { LabelDemo } from "@/components/demos/label-demo"
import { MenubarDemo } from "@/components/demos/menubar-demo"
import { NativeSelectDemo } from "@/components/demos/native-select-demo"
import { NavigationMenuDemo } from "@/components/demos/navigation-menu-demo"
import { PaginationDemo } from "@/components/demos/pagination-demo"
import { PopoverDemo } from "@/components/demos/popover-demo"
import { ProgressDemo } from "@/components/demos/progress-demo"
import { RadioGroupDemo } from "@/components/demos/radio-group-demo"
import { ScrollAreaDemo } from "@/components/demos/scroll-area-demo"
import { SelectDemo } from "@/components/demos/select-demo"
import { SeparatorDemo } from "@/components/demos/separator-demo"
import { SheetDemo } from "@/components/demos/sheet-demo"
import { SidebarDemo } from "@/components/demos/sidebar-demo"
import { SkeletonDemo } from "@/components/demos/skeleton-demo"
import { SliderDemo } from "@/components/demos/slider-demo"
import { SonnerDemo } from "@/components/demos/sonner-demo"
import { SpinnerDemo } from "@/components/demos/spinner-demo"
import { SwitchDemo } from "@/components/demos/switch-demo"
import { TableDemo } from "@/components/demos/table-demo"
import { TabsDemo } from "@/components/demos/tabs-demo"
import { TextareaDemo } from "@/components/demos/textarea-demo"
import { ToggleDemo } from "@/components/demos/toggle-demo"
import { ToggleGroupDemo } from "@/components/demos/toggle-group-demo"
import { TooltipDemo } from "@/components/demos/tooltip-demo"

export type ComponentDoc = {
  title: string
  description: string
  install: string
  Demo: ComponentType
}

export const componentDocs: Record<string, ComponentDoc> = {
  "accordion": { title: "Accordion", description: "A vertically stacked set of interactive headings that each reveal an associated section of content.", install: "npx shadcn@latest add accordion", Demo: AccordionDemo },
  "alert": { title: "Alert", description: "Displays a callout for user attention, with a title, description, and optional icon, in default or destructive variants.", install: "npx shadcn@latest add alert", Demo: AlertDemo },
  "alert-dialog": { title: "Alert Dialog", description: "A modal dialog that interrupts the user with important content and expects a confirm or cancel response.", install: "npx shadcn@latest add alert-dialog", Demo: AlertDialogDemo },
  "aspect-ratio": { title: "Aspect Ratio", description: "Displays content within a desired ratio, constraining its dimensions to a fixed width-to-height proportion.", install: "npx shadcn@latest add aspect-ratio", Demo: AspectRatioDemo },
  "avatar": { title: "Avatar", description: "An image element with a text fallback representing a user, supporting size variants, status badges, and grouped stacks.", install: "npx shadcn@latest add avatar", Demo: AvatarDemo },
  "badge": { title: "Badge", description: "Displays a small status descriptor or label, with variant styles and optional leading icons.", install: "npx shadcn@latest add badge", Demo: BadgeDemo },
  "breadcrumb": { title: "Breadcrumb", description: "Displays the path to the current resource using a hierarchy of links.", install: "npx shadcn@latest add breadcrumb", Demo: BreadcrumbDemo },
  "button": { title: "Button", description: "Displays a clickable button with multiple visual variants and sizes for triggering actions.", install: "npx shadcn@latest add button", Demo: ButtonDemo },
  "button-group": { title: "Button Group", description: "Groups related buttons and text into a single connected control with shared borders and rounded outer edges.", install: "npx shadcn@latest add button-group", Demo: ButtonGroupDemo },
  "calendar": { title: "Calendar", description: "A date field component that lets users select a single date from an interactive month grid.", install: "npx shadcn@latest add calendar", Demo: CalendarDemo },
  "card": { title: "Card", description: "Displays a card with header, content, and footer to group related information and actions.", install: "npx shadcn@latest add card", Demo: CardDemo },
  "carousel": { title: "Carousel", description: "A carousel with motion and swipe built using Embla, with previous/next controls for navigating through a set of slides.", install: "npx shadcn@latest add carousel", Demo: CarouselDemo },
  "chart": { title: "Chart", description: "A composable charting wrapper around Recharts that wires your data into themeable, semantic-token-driven containers, tooltips, and legends.", install: "npx shadcn@latest add chart", Demo: ChartDemo },
  "checkbox": { title: "Checkbox", description: "A control that allows the user to toggle between checked and not checked states.", install: "npx shadcn@latest add checkbox", Demo: CheckboxDemo },
  "collapsible": { title: "Collapsible", description: "An interactive component that expands and collapses a panel of content with a toggle trigger.", install: "npx shadcn@latest add collapsible", Demo: CollapsibleDemo },
  "combobox": { title: "Combobox", description: "An autocomplete input and command palette with a list of suggestions, composed from Popover and Command.", install: "npx shadcn@latest add popover command", Demo: ComboboxDemo },
  "command": { title: "Command", description: "A fast, composable command menu for searching and running actions, built on cmdk.", install: "npx shadcn@latest add command", Demo: CommandDemo },
  "context-menu": { title: "Context Menu", description: "Displays a menu of actions, checkboxes, and radio options triggered by right-clicking an element.", install: "npx shadcn@latest add context-menu", Demo: ContextMenuDemo },
  "data-table": { title: "Data Table", description: "A responsive table component for displaying structured rows of data, with header, body, footer, and caption sections.", install: "npx shadcn@latest add table", Demo: DataTableDemo },
  "date-picker": { title: "Date Picker", description: "A date picker that combines a Popover trigger button with a single-select Calendar to choose and display a date.", install: "npx shadcn@latest add popover calendar", Demo: DatePickerDemo },
  "dialog": { title: "Dialog", description: "A modal window overlaid on the page that interrupts the user with important content and expects a response.", install: "npx shadcn@latest add dialog", Demo: DialogDemo },
  "drawer": { title: "Drawer", description: "A panel that slides in from the edge of the screen, built on Vaul, for presenting content or actions without leaving the current page.", install: "npx shadcn@latest add drawer", Demo: DrawerDemo },
  "dropdown-menu": { title: "Dropdown Menu", description: "Displays a menu of actions or options triggered by a button, with labels, grouped items, keyboard shortcuts, and a destructive action.", install: "npx shadcn@latest add dropdown-menu", Demo: DropdownMenuDemo },
  "empty": { title: "Empty", description: "Displays an empty state with an icon, title, description, and an optional call-to-action when there is no content to show.", install: "npx shadcn@latest add empty", Demo: EmptyDemo },
  "field": { title: "Field", description: "A composable wrapper that pairs form controls with labels, descriptions, and validation messages in consistent layouts.", install: "npx shadcn@latest add field", Demo: FieldDemo },
  "hover-card": { title: "Hover Card", description: "For sighted users to preview content available behind a link on hover.", install: "npx shadcn@latest add hover-card", Demo: HoverCardDemo },
  "input": { title: "Input", description: "Displays a form input field for collecting user text, with support for types like email, search, and file as well as disabled states.", install: "npx shadcn@latest add input", Demo: InputDemo },
  "input-group": { title: "Input Group", description: "A flexible input wrapper that composes an input with leading and trailing addons such as icons, buttons, or text labels.", install: "npx shadcn@latest add input-group", Demo: InputGroupDemo },
  "input-otp": { title: "Input OTP", description: "An accessible one-time password input with copy-paste support, rendering six grouped character slots split by a separator.", install: "npx shadcn@latest add input-otp", Demo: InputOtpDemo },
  "item": { title: "Item", description: "A flexible container for displaying content with optional media, title, description, and actions, composable into separated groups.", install: "npx shadcn@latest add item", Demo: ItemDemo },
  "kbd": { title: "Kbd", description: "Displays keyboard keys and shortcut combinations, grouped together with KbdGroup.", install: "npx shadcn@latest add kbd", Demo: KbdDemo },
  "label": { title: "Label", description: "An accessible label associated with a form control, pairing with inputs and checkboxes via htmlFor.", install: "npx shadcn@latest add label", Demo: LabelDemo },
  "menubar": { title: "Menubar", description: "A visually persistent menu common in desktop applications that provides a consistent set of commands grouped into top-level menus.", install: "npx shadcn@latest add menubar", Demo: MenubarDemo },
  "native-select": { title: "Native Select", description: "A native HTML select control styled to match the design system, with support for grouped options.", install: "npx shadcn@latest add native-select", Demo: NativeSelectDemo },
  "navigation-menu": { title: "Navigation Menu", description: "A collection of links for navigating websites, with a trigger that reveals a panel of related content.", install: "npx shadcn@latest add navigation-menu", Demo: NavigationMenuDemo },
  "pagination": { title: "Pagination", description: "Pagination with page navigation, next and previous links, and an ellipsis for truncated page ranges.", install: "npx shadcn@latest add pagination", Demo: PaginationDemo },
  "popover": { title: "Popover", description: "Displays rich content in a portal-rendered overlay, triggered by a button.", install: "npx shadcn@latest add popover", Demo: PopoverDemo },
  "progress": { title: "Progress", description: "Displays an indicator showing the completion progress of a task, typically rendered as a horizontal bar.", install: "npx shadcn@latest add progress", Demo: ProgressDemo },
  "radio-group": { title: "Radio Group", description: "A set of checkable buttons where only one option can be selected at a time.", install: "npx shadcn@latest add radio-group", Demo: RadioGroupDemo },
  "scroll-area": { title: "Scroll Area", description: "Augments native scroll functionality for custom, cross-browser styling of an overflowing content area.", install: "npx shadcn@latest add scroll-area", Demo: ScrollAreaDemo },
  "select": { title: "Select", description: "Displays a list of grouped options for the user to pick from, triggered by a button.", install: "npx shadcn@latest add select", Demo: SelectDemo },
  "separator": { title: "Separator", description: "Visually or semantically separates content with a horizontal or vertical divider.", install: "npx shadcn@latest add separator", Demo: SeparatorDemo },
  "sheet": { title: "Sheet", description: "A panel that slides in from the edge of the screen to display complementary content such as a form, navigation, or details.", install: "npx shadcn@latest add sheet", Demo: SheetDemo },
  "sidebar": { title: "Sidebar", description: "A composable, collapsible sidebar with provider-driven state for app navigation, grouped menus, and an inset content area.", install: "npx shadcn@latest add sidebar", Demo: SidebarDemo },
  "skeleton": { title: "Skeleton", description: "Use a placeholder to show a pulsing loading state while content is being fetched.", install: "npx shadcn@latest add skeleton", Demo: SkeletonDemo },
  "slider": { title: "Slider", description: "An input where the user selects a value from within a given range by dragging a thumb along a track.", install: "npx shadcn@latest add slider", Demo: SliderDemo },
  "sonner": { title: "Sonner", description: "An opinionated toast component that triggers temporary notifications via the toast() function.", install: "npx shadcn@latest add sonner", Demo: SonnerDemo },
  "spinner": { title: "Spinner", description: "An animated loading indicator that signals an in-progress or pending state.", install: "npx shadcn@latest add spinner", Demo: SpinnerDemo },
  "switch": { title: "Switch", description: "A control that toggles between an on and off state, paired with a label.", install: "npx shadcn@latest add switch", Demo: SwitchDemo },
  "table": { title: "Table", description: "A responsive table component for displaying tabular data with header, body, footer, and caption sections.", install: "npx shadcn@latest add table", Demo: TableDemo },
  "tabs": { title: "Tabs", description: "A set of layered sections of content—known as tab panels—that are displayed one at a time.", install: "npx shadcn@latest add tabs", Demo: TabsDemo },
  "textarea": { title: "Textarea", description: "Displays a multi-line text input field with an optional helper message for collecting longer-form user input.", install: "npx shadcn@latest add textarea", Demo: TextareaDemo },
  "toggle": { title: "Toggle", description: "A two-state button that can be toggled on or off, supporting default and outline variants with optional icons and labels.", install: "npx shadcn@latest add toggle", Demo: ToggleDemo },
  "toggle-group": { title: "Toggle Group", description: "A set of two-state buttons that can be toggled on or off, supporting single or multiple selection.", install: "npx shadcn@latest add toggle-group", Demo: ToggleGroupDemo },
  "tooltip": { title: "Tooltip", description: "A popup that displays informative text when a user hovers over or focuses on an element.", install: "npx shadcn@latest add tooltip", Demo: TooltipDemo },
}
