import { ChevronRight, FileText, Music2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item"

export function ItemDemo() {
  return (
    <ItemGroup className="w-full max-w-sm">
      <Item variant="outline">
        <ItemMedia variant="icon">
          <Music2 />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Midnight Drive</ItemTitle>
          <ItemDescription>The Wanderers · 3:42</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="ghost" size="icon" className="size-8" aria-label="Open">
            <ChevronRight />
          </Button>
        </ItemActions>
      </Item>
      <ItemSeparator />
      <Item variant="outline">
        <ItemMedia variant="icon">
          <FileText />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Q3 Roadmap.pdf</ItemTitle>
          <ItemDescription>Updated 2 hours ago · 1.2 MB</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Open
          </Button>
        </ItemActions>
      </Item>
    </ItemGroup>
  )
}
