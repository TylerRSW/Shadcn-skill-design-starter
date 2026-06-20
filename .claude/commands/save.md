---
description: Handoff OUT — wrap up, commit, push before switching Claude accounts
---

You are running the `/save` handoff command. The user is about to switch Claude
accounts (e.g. token limit reached). Do ALL of these IN ORDER, then report.

1. Run `git status`. If there are half-finished edits, bring them to a clean,
   working state — finish the small unit, or revert the incomplete part. Never
   leave broken/uncompilable code behind.
2. If the change touches app or Storybook code, run a quick verify
   (`npm run build` or `npm run test-storybook`) and fix any failure.
3. Update `PROGRESS.md`: what changed this session, the EXACT next step, and the
   date. Update any relevant memory too.
4. Stage the relevant files, `git commit` with a clear message, then
   `git push origin main`.
5. Run `git status` again and confirm the tree is clean and `main` == `origin/main`.
6. Report back in EXACTLY this format:

```
✅ pushed — safe to switch
• commit: <subject> (<N> files)
• HEAD: <short sha> == origin/main (sync)
• session นี้ทำ: <one line>
• ขั้นต่อไป: <one line>
```

If the push fails, or the tree cannot be made clean, say so clearly and tell the
user **NOT to switch yet** — explain what is blocking.
