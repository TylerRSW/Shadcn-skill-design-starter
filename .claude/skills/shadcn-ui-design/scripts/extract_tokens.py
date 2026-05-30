#!/usr/bin/env python3
"""
Extract shadcn/ui semantic tokens from a Figma variables export
(lazyyysync-variables-v1) and emit a ready-to-paste `:root` CSS block.

Usage:
    python3 extract_tokens.py path/to/variables-export.json
    python3 extract_tokens.py variables-export.json > tokens.css

The shadcn/ui collection holds the 35 semantic tokens. Color values are
resolved from their {r,g,b,a} float components into hex.
"""
import json
import sys


def rgba_to_css(value: dict) -> str:
    r = round(value["r"] * 255)
    g = round(value["g"] * 255)
    b = round(value["b"] * 255)
    a = value.get("a", 1)
    if a >= 1:
        return f"#{r:02x}{g:02x}{b:02x}"
    return f"rgba({r},{g},{b},{a:.2f})"


def main(path: str) -> int:
    with open(path) as f:
        data = json.load(f)

    shadcn = [v for v in data["variables"] if v["collectionName"] == "shadcn/ui"]
    if not shadcn:
        print("No 'shadcn/ui' collection found in export.", file=sys.stderr)
        return 1

    lines = [":root {"]
    for v in shadcn:
        name = v["name"]
        mode = next(iter(v["valuesByMode"].values()))
        value = mode.get("value")
        if isinstance(value, dict) and "r" in value:
            css = rgba_to_css(value)
        else:
            css = str(value)
        alias = mode.get("alias")
        comment = f"   /* {mode.get('aliasCollection', '')}: {alias} */" if alias else ""
        lines.append(f"  --{name}: {css};{comment}")
    lines.append("}")

    print("\n".join(lines))
    return 0


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(__doc__, file=sys.stderr)
        sys.exit(2)
    sys.exit(main(sys.argv[1]))
