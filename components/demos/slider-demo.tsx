import { Slider } from "@/components/ui/slider"

export function SliderDemo() {
  return (
    <Slider
      defaultValue={[50]}
      max={100}
      step={1}
      className="max-w-sm"
      aria-label="Volume"
    />
  )
}
