import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/components/ui/native-select"

export function NativeSelectDemo() {
  return (
    <NativeSelect className="max-w-sm" defaultValue="los-angeles">
      <NativeSelectOption value="" disabled>
        Select a city
      </NativeSelectOption>
      <NativeSelectOptGroup label="North America">
        <NativeSelectOption value="los-angeles">Los Angeles</NativeSelectOption>
        <NativeSelectOption value="new-york">New York</NativeSelectOption>
        <NativeSelectOption value="toronto">Toronto</NativeSelectOption>
      </NativeSelectOptGroup>
      <NativeSelectOptGroup label="Europe">
        <NativeSelectOption value="london">London</NativeSelectOption>
        <NativeSelectOption value="berlin">Berlin</NativeSelectOption>
        <NativeSelectOption value="madrid">Madrid</NativeSelectOption>
      </NativeSelectOptGroup>
    </NativeSelect>
  )
}
