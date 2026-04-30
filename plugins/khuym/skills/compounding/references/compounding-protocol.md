# Compounding Protocol

Load this file only after `khuym:compounding` has been selected.

## Phase 1: Gather Context

Read completed feature artifacts:

- `history/<feature>/CONTEXT.md`
- `history/<feature>/discovery.md`
- `history/<feature>/approach.md`
- `.khuym/state.json` or retained handoff artifacts
- `.beads/` or `br show` output
- review output, P1/P2/P3 findings, and debugging notes

Collect feature commit history with the correct local range, for example:

```bash
git log --oneline feature/<feature-name>..main
```

Build an internal summary of what was built, what risks were flagged, and what surprised the team. If history files are missing, fall back to session summary and recent git diff.

## Phase 2: Three Parallel Analysis Agents

Launch three subagents. They write temp findings only; the orchestrator writes the final learnings file.

### Pattern Extractor

Find reusable code, architecture, process, and integration patterns. For each, capture name, value, location, and applicable-when. Write `/tmp/compounding-patterns.md`.

### Decision Analyst

Find significant decisions, good calls, bad calls, surprises, and trade-offs. For each, capture what was chosen, how it played out, tag, and future recommendation. Write `/tmp/compounding-decisions.md`.

### Failure Analyst

Find blockers, wrong assumptions, wasted effort, regressions, and missing prerequisites. For each, capture what went wrong, root cause, blocked time, and prevention rule. Write `/tmp/compounding-failures.md`.

## Phase 3: Synthesis

Read all three temp files. Tag every useful finding:

- `domain`
- `severity`: critical or standard
- `applicable-when`
- `category`: pattern, decision, or failure

Create a short slug such as `<primary-topic>-<secondary-topic>`, then write one file:

```text
history/learnings/YYYYMMDD-<slug>.md
```

Use `learnings-template.md`. One file per feature; group related findings inside it.

## Phase 4: Critical Promotion

Promote a finding to `history/learnings/critical-patterns.md` only when all are true:

- it affects more than one future feature
- future agents would waste meaningful time without it
- it is generalizable enough to be useful

Append:

```markdown
## [YYYYMMDD] <Learning Title>
**Category:** pattern | decision | failure
**Feature:** <feature-name>
**Tags:** [tag1, tag2]

<2-4 sentence summary of the learning and what to do differently>

**Full entry:** history/learnings/YYYYMMDD-<slug>.md
```

If the file does not exist, create it with the standard `# Critical Patterns` header.

## Phase 5: Optional CASS / CM

Check `.khuym/config.json`. If `cass_enabled` or `cm_enabled` is true, store/index the new learnings through the configured tool. File-based learnings remain primary.

## Phase 6: State Update

Update `.khuym/state.json`:

```json
{
  "active_skill": "compounding",
  "phase": "compounding-complete",
  "summary": "Compounding complete. Learnings captured for the next feature.",
  "next_action": "Start the next feature or reopen deferred follow-up work.",
  "last_compounding_run": {
    "feature": "<feature-name>",
    "date": "YYYY-MM-DD",
    "learnings_file": "history/learnings/YYYYMMDD-<slug>.md",
    "critical_promotions": <N>
  }
}
```

## Red Flags

- skipping compounding for meaningful work
- promoting everything as critical
- writing vague advice such as "test more carefully"
- inventing findings when the feature ran smoothly
- letting analysis agents write final durable files directly
