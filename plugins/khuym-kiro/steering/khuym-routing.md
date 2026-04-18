---
inclusion: auto
name: khuym-routing
description: Use when the user wants the Khuym workflow, validate-first feature delivery, swarming, reviewing, compounding, or Khuym project bootstrap in Kiro.
---

# Khuym Routing

- Prefer the `using-khuym` skill first for Khuym requests.
- Treat `AGENTS.md` and `.khuym/*` as the workflow source of truth.
- If `.kiro/khuym_status.mjs` exists, run `node .kiro/khuym_status.mjs --json` early.
- Use custom Khuym agents for swarm coordination, worker execution, and review when the CLI delegate workflow is available.
