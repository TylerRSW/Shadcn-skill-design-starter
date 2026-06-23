# Assignment progress — Design Component to Storybook

> Living status for the **"Design Component to Storybook"** assignment (due 2026-06-19, Module: Storybook).
> Portable handoff doc — any session/account can read this + `git log` + `CLAUDE.md` and continue.
> Last updated: 2026-06-23 (all deliverables done; gitignored test `coverage/` output).

## Switching Claude accounts (token limit handoff)

Two accounts on this machine share this repo: `claude-personal` and `claude-work`.
Use these commands so work continues seamlessly. **6 steps:**

**Before switching out (current account):**
1. Type **`/save`**
2. Wait for **"✅ pushed — safe to switch"**
3. Press **Ctrl-D** to exit

**Switch:**
4. Type the alias (NOT bare `claude`): **`claude-work`**  (or **`claude-personal`** to come back)

**Continue (new account):**
5. Type **`/load`**
6. Check the summary matches, then keep working

**Iron rules:** ① never run both accounts at once · ② open with the alias only · ③ always `/save` and wait for "pushed" before exiting.

Memory is shared between the two accounts (symlinked), so both see the same notes. The repo (this file + git) is the source of truth.

---

## The assignment (3 deliverables)

Pick ≥ 3 shadcn/ui components and:

1. **Design Component** — map shadcn base → production code on the DTCG 3-tier token system (Primitive → Semantic → Component). React + Tailwind v4, no hardcoded hex/px/timing, all variants, all states (default/hover/focus/active/disabled/loading/error as applicable), WCAG 2.2 AA.
2. **Component Documentation** — for each component: Anatomy, Props/API, Variants & States, Usage Do/Don't, Accessibility notes, Token mapping.
3. **Into Storybook** — config, CSF stories for every variant/state, argTypes + controls, autodocs or MDX carrying the deliverable-2 docs, a11y addon with no critical violations.

We are doing **all ~55 components**, not just 3 — batched by the Storybook sidebar groups.

## Status

| Deliverable | Status |
|---|---|
| 1 — Design Component | ✅ Done — all components token-driven, variants/states present, **a11y 0 violations** |
| 2 — Component Documentation | ✅ Done — **all 54/54 components documented** |
| 3 — Into Storybook | ✅ Done — config, 55 CSF story files, autodocs on all, a11y addon green; docs page wired (lights up as deliverable-2 batches fill) |

### Deliverable 2 — documentation batches

| Batch (sidebar group) | Done | Remaining |
|---|---|---|
| **Forms** (19) | 19 ✅ all done | — |
| **Overlays** (12) | 12 ✅ all done | — |
| **Feedback** (7) | 7 ✅ all done | — |
| **Data Display** (16) | 16 ✅ all done | — |

## How the documentation system works (single source → two renderers)

- **`lib/component-details.ts`** — `componentDetails: Record<slug, ComponentDetail>`. The structured docs (overview, anatomy, props, variants, states, usage do/dont, a11y, tokens). **Token mappings are read from the real `components/ui/*` className strings — never invented.** To document a component, add its entry here.
- **`components/component-docs-sections.tsx`** — `<ComponentDocsSections detail>`, pure React + semantic-token styling. No Next/Storybook imports, so it renders in both places.
- **Docs site:** `app/docs/[slug]/page.tsx` renders the sections after Installation when `componentDetails[slug]` exists.
- **Storybook:** global `DocsPage` in `.storybook/preview.tsx` (`parameters.docs.page`) resolves slug from the story title and renders the same sections inside `<Unstyled>`. DRY — covers all 55, no per-story edits needed.

Undocumented slugs simply fall back to plain autodocs until their entry is added.

## Verify (all currently green)

```bash
npm run build            # Next.js — builds docs site, 55 /docs/[slug] pages (SSG)
npm run build-storybook  # Storybook static build
npm run test-storybook   # vitest browser: play tests + a11y → 67 files / 88 tests, 0 violations
npm run storybook        # dev server at http://localhost:6006
```

Note: `tsconfig.json` excludes `**/*.stories.tsx` from the Next build (stories are Storybook-only; Storybook's own pipeline type-checks them).

## Current state (2026-06-23)

**All three deliverables complete. Everything is committed AND pushed — working tree clean, `main` == `origin/main`.** Nothing is left only on the local machine.

- This session: added `/coverage` to `.gitignore` (vitest/test-storybook coverage output should not be tracked). No app/Storybook source changed.
- Earlier session: installed the `figma-rest-api` npm dependency (`^0.1.0`) — added to `package.json` + `package-lock.json`. Not yet used in app code; available for calling the Figma REST API.

**Exact next step:** nothing outstanding for the assignment. Optional next move — start using `figma-rest-api` in app code, or tackle one of the optional items below.

- Deliverable 2: 54/54 documented (Forms 19, Overlays 12, Feedback 7, Data Display 16).
- Deliverable 3: argTypes/controls enriched on the hand-authored ui stories (button, input, select, checkbox, switch, badge, tabs, tooltip, dialog, alert-dialog, dropdown-menu); accordion intentionally left (Radix union typing).
- Docs site fully committed (nav, layout, token reference pages, site-header) — renders on a fresh clone.

## Optional / not done (none block the assignment)

- accordion story argTypes (skipped — union typing risk).
- Convert demo-wrapper stories to expose real component controls (structural; current ui stories already cover controls for the chosen components).

## Done earlier (context)

- Dark theme + a11y fixes + audit tooling.
- Storybook 10 (`@storybook/nextjs-vite`) workbench, 55 stories (12 hand-authored + 43→55 generated by `scripts/gen-stories.mjs`).
- Storybook a11y driven 14 → 0 (genuine aria-label fixes + documented per-story rule disables baked into the generator's `A11Y_OFF` map; see commit history / `scripts/gen-stories.mjs`).
