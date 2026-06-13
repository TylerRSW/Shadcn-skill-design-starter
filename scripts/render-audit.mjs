/**
 * Real-render contrast audit against the LIVE Next.js dev server.
 * - Static text contrast on every doc route, light + dark.
 * - Interactive hover/focus state contrast on interactive elements.
 * Routes are parsed from lib/registry.ts so it stays in sync.
 * Usage: node scripts/render-audit.mjs   (server must be on :3000)
 */
import { chromium } from "playwright"
import { readFileSync } from "node:fs"

const BASE = "http://localhost:3000"
const reg = readFileSync("lib/registry.ts", "utf8")
const PAGES = [...new Set([...reg.matchAll(/href:\s*"([^"]+)"/g)].map((m) => m[1]))]

// Injected into every page: WCAG contrast helpers + element measurement.
const helpers = () => {
  window.__a = {}
  const A = window.__a
  A.parse = (c) => {
    const m = c && c.match(/rgba?\(([^)]+)\)/)
    if (!m) return null
    const p = m[1].split(",").map((x) => parseFloat(x.trim()))
    return { r: p[0], g: p[1], b: p[2], a: p[3] === undefined ? 1 : p[3] }
  }
  A.over = (fg, bg) => {
    const a = fg.a + bg.a * (1 - fg.a)
    if (a === 0) return { r: 0, g: 0, b: 0, a: 0 }
    const mix = (f, b) => (f * fg.a + b * bg.a * (1 - fg.a)) / a
    return { r: mix(fg.r, bg.r), g: mix(fg.g, bg.g), b: mix(fg.b, bg.b), a }
  }
  A.effBg = (el) => {
    const stack = []
    let node = el
    while (node && node.nodeType === 1) {
      const bg = A.parse(getComputedStyle(node).backgroundColor)
      if (bg && bg.a > 0) stack.push(bg)
      node = node.parentElement
    }
    stack.push({ r: 255, g: 255, b: 255, a: 1 })
    let base = stack[stack.length - 1]
    for (let i = stack.length - 2; i >= 0; i--) base = A.over(stack[i], base)
    return base
  }
  A.lum = ({ r, g, b }) => {
    const f = (v) => {
      v /= 255
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
    }
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
  }
  A.ratio = (a, b) => {
    const l1 = A.lum(a), l2 = A.lum(b)
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
  }
  A.measure = (el) => {
    const cs = getComputedStyle(el)
    if (cs.visibility === "hidden" || cs.display === "none") return null
    const rect = el.getBoundingClientRect()
    if (rect.width === 0 || rect.height === 0) return null
    const fg = A.parse(cs.color)
    if (!fg) return null
    const bg = A.effBg(el)
    const cr = A.ratio(A.over(fg, bg), bg)
    const size = parseFloat(cs.fontSize)
    const bold = parseInt(cs.fontWeight) >= 700
    const large = size >= 24 || (size >= 18.66 && bold)
    const min = large ? 3 : 4.5
    return {
      cr: Math.round(cr * 100) / 100, min, size: Math.round(size),
      text: el.textContent.trim().slice(0, 32),
      tag: el.tagName.toLowerCase(),
      cls: (el.getAttribute("class") || "").slice(0, 50),
    }
  }
}

const staticPass = () => {
  const A = window.__a, out = []
  for (const el of document.querySelectorAll("body *")) {
    const hasText = Array.from(el.childNodes).some(
      (n) => n.nodeType === 3 && n.textContent.trim().length > 0
    )
    if (!hasText) continue
    const m = A.measure(el)
    if (m && m.cr < m.min) out.push(m)
  }
  return out
}

const ISEL = 'button, a[href], [role="tab"], [role="menuitem"], summary, label'

const browser = await chromium.launch()
const fails = { static: [], hover: [], focus: [] }
let pagesChecked = 0

for (const theme of ["light", "dark"]) {
  for (const path of PAGES) {
    const ctx = await browser.newContext()
    await ctx.addInitScript((t) => { try { localStorage.setItem("theme", t) } catch {} }, theme)
    await ctx.addInitScript(helpers)
    const page = await ctx.newPage()
    try {
      await page.goto(BASE + path, { waitUntil: "networkidle", timeout: 20000 })
      await page.waitForTimeout(200)
      pagesChecked++

      // 1) static text
      for (const m of await page.evaluate(staticPass)) fails.static.push({ theme, path, ...m })

      // 2) interactive hover + focus (cap per page for runtime)
      const handles = (await page.$$(ISEL)).slice(0, 14)
      for (const h of handles) {
        const visible = await h.isVisible().catch(() => false)
        if (!visible) continue
        // hover
        try {
          await h.hover({ timeout: 1000 })
          await page.waitForTimeout(40)
          const m = await h.evaluate((el) => window.__a.measure(el))
          if (m && m.cr < m.min) fails.hover.push({ theme, path, ...m })
        } catch {}
        // focus
        try {
          await h.focus({ timeout: 1000 })
          await page.waitForTimeout(40)
          const m = await h.evaluate((el) => window.__a.measure(el))
          if (m && m.cr < m.min) fails.focus.push({ theme, path, ...m })
        } catch {}
      }
    } catch (e) {
      console.log(`  ! ${theme} ${path} — ${e.message.split("\n")[0]}`)
    }
    await ctx.close()
  }
}
await browser.close()

const dedupe = (arr) => {
  const seen = new Set(), out = []
  for (const f of arr) {
    const k = `${f.theme}|${f.cr}|${f.tag}|${f.cls}|${f.text}`
    if (seen.has(k)) continue
    seen.add(k); out.push(f)
  }
  return out
}
const report = (name, arr) => {
  const d = dedupe(arr)
  console.log(`\n===== ${name}: ${d.length} unique failure(s) =====`)
  for (const f of d)
    console.log(`  [${f.theme}] ${f.cr}:1 (need ${f.min}) ${f.tag} ${f.size}px "${f.text}" ${f.path} [${f.cls}]`)
}
console.log(`\nPages checked: ${pagesChecked} (${PAGES.length} routes × 2 themes)`)
report("STATIC text", fails.static)
report("HOVER state", fails.hover)
report("FOCUS state", fails.focus)
