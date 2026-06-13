"use client"

import * as React from "react"
import { Minus, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

export function DrawerDemo() {
  const [goal, setGoal] = React.useState(350)

  function adjust(delta: number) {
    setGoal((prev) => Math.max(200, Math.min(800, prev + delta)))
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Set daily goal</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Move goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <div className="flex items-center justify-center gap-6 p-4">
            <Button
              variant="outline"
              size="icon"
              className="size-8 shrink-0 rounded-full"
              onClick={() => adjust(-10)}
              disabled={goal <= 200}
            >
              <Minus />
              <span className="sr-only">Decrease</span>
            </Button>
            <div className="text-center">
              <div className="text-5xl font-bold tracking-tighter text-foreground">
                {goal}
              </div>
              <div className="text-xs text-muted-foreground uppercase">
                Calories/day
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="size-8 shrink-0 rounded-full"
              onClick={() => adjust(10)}
              disabled={goal >= 800}
            >
              <Plus />
              <span className="sr-only">Increase</span>
            </Button>
          </div>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
