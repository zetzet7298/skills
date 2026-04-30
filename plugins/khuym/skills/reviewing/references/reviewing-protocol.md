# Reviewing Protocol

Load this file only after `khuym:reviewing` has been selected.

## Communication Standard

For every serious finding:

1. explain the bug in plain language
2. show the evidence
3. give one concrete failure scenario
4. name the smallest credible fix direction

## Phase 1: Automated Review

Dispatch 5 specialist agents. Agents 1-4 may run in parallel unless 5+ agents are already active or `--serial` is set. Agent 5 always runs last.

| Agent | Focus |
|---|---|
| 1 `code-quality` | readability, correctness, type safety |
| 2 `architecture` | coupling, boundaries, API design |
| 3 `security` | auth, secrets, injection, data exposure |
| 4 `test-coverage` | missing tests and edge cases |
| 5 `learnings-synthesizer` | known patterns and compounding candidates |

Each agent receives only the diff, `CONTEXT.md`, and `approach.md`. Load exact prompts from `review-agent-prompts.md`.

## Review Beads

Each distinct issue becomes a bead using `review-bead-template.md`.

- P1: blocking fix bead on the current review/epic-close path
- P2/P3: non-blocking follow-up bead, not a child of the current epic

Use `external_ref=<source-epic-id>` plus labels such as `review`, `review-p2`, `review-p3`, and the source reviewer label for non-blocking traceability.

Title pattern:

```text
Resolve Review P1: <problem title>
Resolve Review P2: <problem title>
Resolve Review P3: <problem title>
```

Severity:

- P1: security breach, data loss, breaking change, production blocker
- P2: real performance, architecture, or reliability issue
- P3: minor cleanup, docs, or future debt

When in doubt, choose P2.

## Synthesis

After all agents finish:

1. collect review beads from agents 1-4
2. deduplicate overlaps; close redundant duplicates as `Duplicate of <bead-id>`
3. add Agent 5 known-pattern notes to relevant review beads
4. present counts and bead IDs by severity
5. stop on P1 until user acknowledges

## Phase 2: Artifact Verification

Run a goal-backward check for every artifact named in `CONTEXT.md` and `approach.md`.

- Level 1 EXISTS: file/component/route exists
- Level 2 SUBSTANTIVE: not a stub, placeholder, TODO-only, static fake, or empty handler
- Level 3 WIRED: imported and used by the integration path

Outcomes:

- L1+L2+L3: pass
- L1+L2 only: create P2 review bead
- L1 only or missing: create P1 review bead

Use the live bead graph and bead files to verify acceptance-criteria coverage when needed.

## Phase 3: Human UAT

Extract decisions with `SEE`, `CALL`, or `RUN` verification from `CONTEXT.md`. Walk them one at a time:

```text
UAT Item <i> of <n> - Decision <D-id>:
"<deliverable>"
Can you confirm this works? [Pass / Fail / Skip]
```

On failure, invoke `khuym:debugging`, create a P1 fix bead, execute it, and re-verify the item. On skip, record the reason in `.khuym/state.json`.

## Phase 4: Finishing

Before compounding:

- verify all epic beads are closed with `bv --robot-triage --graph-root <epic-id>`
- run project build/test/lint commands
- create or update review beads for any remaining blocker
- present merge options: PR, direct merge, keep branch, discard branch
- remove temporary worktrees if used
- close the epic with `br close <epic-id> --reason "Feature complete: <summary>"`
- archive final state to `history/<feature>/state-final.json`
- reset active fields in `.khuym/state.json`

## Red Flags

- P1 findings with no user acknowledgment
- P1 bead created but gate not stopped
- UAT failure marked as pass
- artifact verification skipped
- epic closed with open beads
- known failure pattern from `history/learnings/` not surfaced
- Agent 5 runs before agents 1-4 complete
- P2/P3 attached as current-epic children
