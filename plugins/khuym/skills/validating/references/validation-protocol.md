# Validation Protocol

Load this file only after `khuym:validating` has been selected and the concise `SKILL.md` routing rules have passed.

## Communication Standard

Explain validation risk in practical terms:

- what the current phase is trying to make true
- what is wrong in the current plan or bead set
- why that would fail in a real scenario
- the smallest credible repair

Avoid unexplained labels such as `dependency issue`, `context budget failure`, or `risk alignment problem`.

## Phase 0: Orientation

Read `.khuym/state.json` and phase artifacts. Present:

```text
Validating Phase <n> of <total>: <phase name>

Stories:
- Story 1: <name>
- Story 2: <name>
- Story 3: <name>

Goal of this phase:
- <one-line practical outcome>
```

If the phase plan is not approved, stop.

## Phase 1: Structural Verification

Maximum 3 iterations. Spawn a plan-checker with `plan-checker-prompt.md` and these inputs:

- current phase bead set
- `CONTEXT.md`
- `discovery.md`
- `approach.md`
- `phase-plan.md`
- `phase-<n>-contract.md`
- `phase-<n>-story-map.md`

The checker verifies:

1. Phase contract clarity
2. Story coverage and ordering
3. Decision coverage
4. Dependency correctness
5. File scope isolation
6. Context budget
7. Verification completeness
8. Exit-state completeness and risk alignment

If all pass, continue. If any fail, repair the artifact and rerun. After 3 failed iterations, escalate to the user.

Repair routing:

- unclear phase meaning: revise `phase-<n>-contract.md`
- unclear story order or scope: revise `phase-<n>-story-map.md`
- missing decision coverage: revise story map and/or beads
- dependency, scope, or test gaps: revise current phase beads
- unreachable exit state: revise contract, story map, or phase plan

## Phase 2: Spike Execution

Run a spike for every HIGH-risk component that matters to the current phase. Skip this phase only when no HIGH-risk items exist.

Create spikes:

```bash
br create "Spike: Phase <n> - <specific yes/no question>" -t task -p 0
```

Each spike is isolated, time-boxed to 30 minutes, writes `.spikes/<feature>/<spike-id>/FINDINGS.md`, and closes with a definitive YES or NO.

```bash
br close <id> --reason "YES: <validated approach and constraints>"
br close <id> --reason "NO: <blocker and why it breaks the approach>"
```

YES means embed constraints into affected beads and, if needed, the story map. NO means stop, write the blocker into `approach.md`, return to planning, and rerun validating after replanning.

## Phase 3: Bead Polishing

Run the graph passes and fix real issues:

```bash
bv --robot-suggest
bv --robot-insights
bv --robot-priority
```

Check for duplicate beads, story-to-bead coherence, orphaned beads, and beads that span unrelated stories. Then load `bead-reviewer-prompt.md` for fresh-eyes review. Fix all CRITICAL flags before moving on.

## Phase 4: Exit-State Readiness

Ask explicitly:

1. If all stories reach "Done Looks Like", does the phase exit state hold?
2. If all current-phase beads close, will all stories be done?
3. Is the phase demo credible?
4. Does this phase still fit the larger `phase-plan.md`?

Route any "no" or "not sure" answer back to the relevant artifact: phase contract, story map, beads, approach, or phase plan.

## Phase 5: Approval

Present this gate:

```text
VALIDATION COMPLETE - APPROVAL REQUIRED BEFORE EXECUTION

Current Phase Summary:
- Phase: Phase <n> - <name>
- Stories: <N>
- Beads: <N>
- Demo walkthrough: <one line>

Structural Verification:
- All 8 dimensions: PASS (after <N> iterations)

Spike Results:
- HIGH-risk items for this phase: <N>
- Result: <all passed / concerns listed>

Polishing Results:
- Dependencies added: <N>
- Graph issues fixed: <N>
- Priority adjustments: <N>
- Duplicates removed: <N>
- Fresh-eyes CRITICAL flags fixed: <N>

Exit-State Readiness:
- Entry state understood: YES
- Exit state observable: YES
- Story sequence coherent: YES
- Demo credible: YES

Unresolved concerns:
- <none | list>

Approve execution for Phase <n>? (yes/no)
```

If the user rejects, ask what concerns them and route back to the relevant artifact. Do not guess.

## Lightweight Mode

For confirmed LOW-risk single-story, single-phase work:

1. run abbreviated structural verification
2. skip spikes
3. run `bv --robot-suggest`
4. still require the final approval gate

If uncertain, use full mode.

## Red Flags

- executing before approval
- validating without approved `phase-plan.md`
- missing current-phase contract or story map
- unobservable phase exit state
- spike returned NO and execution is still being considered
- iteration 4 of structural verification
- bead done criteria not tied to a story
