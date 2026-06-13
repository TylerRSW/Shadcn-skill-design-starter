import Link from "next/link"
import { CircleHelpIcon, LayersIcon } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const components = [
  {
    title: "Alert Dialog",
    href: "/docs/alert-dialog",
    description: "A modal dialog that interrupts the user with important content.",
  },
  {
    title: "Hover Card",
    href: "/docs/hover-card",
    description: "For sighted users to preview content available behind a link.",
  },
  {
    title: "Tabs",
    href: "/docs/tabs",
    description: "Layered sections of content shown one panel at a time.",
  },
]

export function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[280px] gap-1 p-2">
              {components.map((component) => (
                <li key={component.title}>
                  <NavigationMenuLink asChild>
                    <Link href={component.href}>
                      <div className="flex items-center gap-2 text-sm font-medium leading-none">
                        <LayersIcon />
                        {component.title}
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {component.description}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/docs">Documentation</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/support">
              <CircleHelpIcon />
              Support
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
