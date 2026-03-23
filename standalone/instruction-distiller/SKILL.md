---
name: instruction-distiller
description: Distill prior coding-agent sessions into reviewed, patch-ready updates for a repo’s AGENTS.md or CLAUDE.md files. Use when mining session history, generating outcome-first reports, maintaining a reviewed knowledge catalog, or drafting instruction-file updates without editing live files.
---

# Instruction Distiller

Use this skill when the goal is to turn prior agent sessions into reviewed instruction updates for the active repository.

## Core Rules

- Keep all generated artifacts inside the consumer repo under `.ai-distill/`.
- Distill from engineering outcomes first: implemented changes, touched files, validations, and successful fixes outrank prompt boilerplate.
- Filter copied instruction dumps, skill catalogs, generic review prompts, and plan-only noise.
- Only reviewed catalog entries may drive instruction drafts. Raw reports are review input, not instruction sources.
- Never auto-apply changes to live `AGENTS.md` or `CLAUDE.md`.
- Preserve the repo’s existing instruction topology. Draft only against existing instruction paths unless a reviewer deliberately chooses a broader change.

## Workflow

1. Generate a session report:

```bash
node /path/to/skills/scripts/ai-distill.mjs report --workspace /path/to/repo --mode daily
```

2. Review `.ai-distill/reports/` and update:
   - `.ai-distill/catalog/accepted-knowledge.yaml`
   - `.ai-distill/catalog/session-provenance-ledger.json`

3. Draft instruction updates from accepted catalog entries only:

```bash
node /path/to/skills/scripts/ai-distill.mjs draft-instructions --workspace /path/to/repo --target auto
```

4. Review:
   - `.ai-distill/drafts/`
   - `.ai-distill/patches/`
   - `.ai-distill/drafts/review-manifest.json`

## Targeting Rules

- `--target auto` resolves to `agents` when the repo only contains `AGENTS.md` files.
- `--target auto` resolves to `claude` when the repo only contains `CLAUDE.md` files.
- If both families exist or neither exists, the draft command stops with review output and does not choose a target.

## Catalog Entry Shape

Accepted entries belong in `.ai-distill/catalog/accepted-knowledge.yaml` with:

- `id`
- `category`
- `scope`
- `applies_to: agents | claude | both`
- `instruction`
- `evidence`
- `status`

## References

- Read `references/consumer-layout.md` when you need the artifact layout and file semantics.
