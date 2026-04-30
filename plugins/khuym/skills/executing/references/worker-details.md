# Worker Details

Open this file when the compact worker loop in `SKILL.md` is not enough.

## Parent Context

Swarming should provide:

- `codex_subagent_name`
- `agent_id`
- `project_key`
- `epic_id`
- `feature_name`
- optional `startup_hint`

The Codex nickname is your reservation identity. Use it for reserve, release, and write-heavy shell commands.

## Bead Selection Detail

Choose the top-ranked open bead that:

- has no unresolved dependencies
- is consistent with `CONTEXT.md`
- looks implementable within one bounded worker run

Before implementing, confirm:

- what must be built
- which dependencies must already be closed
- the verification criteria
- the file scope
- any referenced decision IDs from `CONTEXT.md`

## Reservation Conflict Report

If reservation conflicts, return `[BLOCKED]` with:

- bead id
- requested files or globs
- conflicting holder
- what you need next

Do not edit through the conflict.

## Shell Guard

Prefix write-heavy Bash commands with your reservation identity:

```bash
KHUYM_AGENT_NAME="<codex-subagent-name>" git add src/foo.ts
```

Use this for:

- `git add`
- `git mv`
- `git rm`
- `mv`, `cp`, `rm`, `mkdir`, `touch`
- `sed -i`, `perl -i`, redirection-based file writes

## Verification Failure

If verification fails:

1. fix the root cause
2. rerun the exact failing command
3. if it still fails after two serious attempts, stop and return `[BLOCKED]`

Include the command, failure text summary, what you tried, and the smallest useful next decision.

## Atomic Commit

One commit per bead:

```bash
KHUYM_AGENT_NAME="<codex-subagent-name>" git add <files-you-modified>
git commit -m "feat(<bead-id>): <summary matching br close reason>"
```

Do not batch multiple beads into one commit.

## Result Headings

Use one of:

- `[DONE]`: bead closed, committed, and reservations released.
- `[BLOCKED]`: cannot safely continue; include current reservation state and the parent decision needed.
- `[HANDOFF]`: context is high or safe stop needed; write `.khuym/HANDOFF.json` first.
- `[NOOP]`: no safe bead exists right now.

Expected minimum fields:

- Codex nickname
- agent id if known
- bead id
- files touched or requested
- reservation outcome
- verification result
- next action the parent should take

Follow `../swarming/references/message-templates.md` when available.

## Post-Compaction Recovery

After compaction, stop and reread:

1. `AGENTS.md`
2. `history/<feature>/CONTEXT.md`
3. `br show <bead-id>`
4. active reservations:
   ```bash
   node .codex/khuym_reservations.mjs list --active-only --agent "<codex-subagent-name>" --json
   ```

Only continue once those four are restored.
