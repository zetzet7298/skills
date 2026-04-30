# Swarming Protocol

Load this file only after `khuym:swarming` has been selected and validation has approved the current phase.

## Role Boundary

`swarming` launches and tends workers. `executing` is the bounded worker loop each spawned subagent follows. If the orchestrator starts editing source files, stop.

## Confirm Readiness

1. Get `EPIC_ID` from `.khuym/state.json` or validated phase artifacts.
2. Check the live graph:
   ```bash
   bv --robot-triage --graph-root <EPIC_ID>
   ```
3. Confirm open executable beads, acyclic dependencies, and no validation blockers.
4. Sweep reservations:
   ```bash
   node .codex/khuym_reservations.mjs sweep --json
   ```
5. Update `.khuym/state.json` with current swarm intent and epic ID.

Do not create separate runtime waves or plans; the bead graph is source of truth.

## Spawn Workers

Use `spawn_agent(...)` with `references/worker-template.md`. Capture `agent_id` and `agent_nickname`, then send startup context with `send_input(...)`.

Required startup context:

- `codex_subagent_name`
- `agent_id`
- `project_key`
- `epic_id`
- `feature_name`
- optional `startup_hint`
- instruction to load `khuym:executing`

Record each worker in `.khuym/state.json` immediately. Do not invent names; runtime nicknames are the source of truth.

## Worker Scope

Workers are short-lived and bead-scoped:

1. read project context
2. pick one executable bead from `bv --robot-priority`
3. reserve the edit surface locally
4. implement and verify
5. close the bead, release reservations, and return a final status

## Tend Loop

Keep looping while workers are spawned, busy, or blocked; the graph has ready/in-progress work; or current-phase reservations remain active.

Each cycle:

```bash
bv --robot-triage --graph-root <EPIC_ID>
node .codex/khuym_reservations.mjs sweep --json
node .codex/khuym_reservations.mjs list --active-only --json
```

Use `wait_agent(targets=[...], timeout_ms=60000)` only when you need the next finished result. Prefer batched, longer waits over busy polling. Update `.khuym/state.json` after meaningful events.

## Worker Results

Workers finish with one of the statuses defined in `message-templates.md`:

- `[DONE]`
- `[BLOCKED]`
- `[HANDOFF]`
- `[NOOP]`

For each result:

1. update the worker entry in `.khuym/state.json`
2. verify bead state with `br show <bead-id>` or `br ready --json`
3. verify reservations were released, or release them if safe
4. decide whether to respawn, redirect, defer, or escalate

## Silence Ladder

Silence means a worker has not finished yet. After a long wait timeout:

1. inspect reservation state
2. inspect graph state
3. if both are healthy, keep waiting
4. if unhealthy, recover parent-side first
5. escalate only with worker name, graph state, reservation evidence, and attempts made

Do not send routine mid-flight `send_input(...)` messages. Do not use `interrupt=true` except for explicit aborts or confirmed deadlocks where the user wants preemption.

## File Conflicts

When reservations overlap:

1. inspect active reservations
2. choose one: holder keeps until checkpoint, holder releases and waiting worker respawns, or change becomes a follow-up bead
3. record the resolution in `.khuym/state.json`

Do not ask workers to edit through active conflicts.

## Handoff And Completion

If context usage passes roughly 65%, write `.khuym/HANDOFF.json` with active workers, bead IDs, reservation snapshot, and resume steps.

Before declaring phase completion:

- run final `bv --robot-triage --graph-root <EPIC_ID>`
- confirm no active reservations remain for the phase
- handle orphaned or blocked beads
- run project quality gates
- clear `active_workers`

If all current-phase beads are closed, return to planning for the next phase or to reviewing for the final phase.

## Red Flags

- spawning before validation
- worker edits without reservations
- long-lived silent worker daemons
- passive waiting while ready beads or reservations exist
- conflict resolution by optimism instead of ownership changes
- missing `.khuym/state.json` updates
- handoff without reservation snapshot
