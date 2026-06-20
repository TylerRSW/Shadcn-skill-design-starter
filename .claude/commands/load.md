---
description: Handoff IN — pull, read PROGRESS.md and resume after switching accounts
---

You are running the `/load` handoff command, just after the user switched Claude
accounts. Do ALL of these IN ORDER, then report and wait for the user.

1. Run `echo $CLAUDE_CONFIG_DIR` to confirm which account is active.
2. Run `git status`.
   - If the tree is DIRTY (uncommitted work — both accounts share the same
     folder on disk): do NOT pull/rebase over it. Read those changes and plan to
     continue from them.
   - If the tree is CLEAN: run `git fetch origin`; if local is behind
     `origin/main`, run `git pull --rebase origin main`.
3. Read `PROGRESS.md` in full to understand current state and the next step.
4. Report back in EXACTLY this format, then wait for the user before doing work:

```
✅ resumed (account: <.claude-xxx>)
• synced: HEAD <short sha> == origin
• อยู่จุดนี้: <one line — current state>
• ขั้นต่อไป: <one line — next step>
```
