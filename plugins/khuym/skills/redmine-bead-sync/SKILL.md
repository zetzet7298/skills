---
name: redmine-bead-sync
description: Use when Khuym or Beads work needs to be converted into Vietnamese Redmine issues, comments, or time logs through a human-approved sync flow. Trigger whenever the user wants beads synced to Redmine, wants Khuym tasks mirrored into Redmine, asks to convert bead graphs into ticket structures, or needs Vietnamese Redmine updates from bead progress. Use this even when the user says to "just sync it quickly" because mapping, wording, and write safety must still be checked.
metadata:
  version: '1.0'
  ecosystem: khuym
  dependencies:
    - id: beads-cli
      kind: command
      command: br
      missing_effect: degraded
      reason: The sync flow should read Beads state through br before trusting raw files.
    - id: beads-viewer
      kind: command
      command: bd
      missing_effect: degraded
      reason: bd helps inspect graph shape and dependencies before proposing Redmine mappings.
    - id: node-runtime
      kind: command
      command: node
      missing_effect: unavailable
      reason: The default execution path uses the Node-based Redmine CLI in /var/www/redmine-automation.
---

# Redmine bead sync

This skill is a careful bridge from Beads into Redmine.

Its job is not just to "push tickets." Its job is to preserve task meaning, make the output readable for a Vietnamese team, and stop the agent from silently guessing structure or writing the wrong thing into Redmine.

## Default execution surface

Use `/var/www/redmine-automation` as the default Redmine automation surface unless the user explicitly gives a different Redmine CLI or workflow.

Prefer commands shaped like:

```bash
cd /var/www/redmine-automation
npx my-redmine ...
```

If that repo is missing, not configured, or not logged in, stop and ask the human what Redmine execution surface to use instead.

## Scope

This skill can support all of these:

- create new Redmine issues from beads
- update existing Redmine issues from bead progress
- add Vietnamese comments
- log time in Vietnamese
- produce a dry-run preview without writing

## HARD-GATES

### 1. Never silently choose the bead-to-Redmine mapping

You must always present **numbered mapping options** for the human to choose.

This is true even when:

- the user says "cứ theo best practice mà làm"
- the graph looks obvious
- one option is clearly better
- the user says "đừng hỏi nhiều"

Why: mapping changes issue shape, parent-child structure, and update behavior. That is a team workflow decision, not a silent agent default.

### 2. Never write to Redmine before preview + approval

Before any real write, show:

- the chosen mapping option
- the exact issues that will be created or updated
- the Vietnamese `subject`
- the Vietnamese `description`
- the Vietnamese `comment`
- the Vietnamese `time log` note
- any tracker, status, priority, assignee, parent, relation, or project assumptions
- the exact CLI commands you plan to run when that is practical

Then ask for approval.

No approval, no write.

### 3. Never guess ambiguous Redmine fields

If tracker, assignee, status, time amount, parent issue, or target project is materially unclear, stop and ask the human.

"Best effort" is not permission to create noisy Redmine data.

### 4. Never skip the Vietnamese anti-AI pass

All outbound Redmine text for this skill must go through the anti-AI cleanup pass in `references/anti-ai-vn-checklist.md`.

This still applies when the user says:

- "viết tiếng Việt là được"
- "làm nhanh nhé"
- "khỏi chỉnh văn phong"

Why: Redmine text becomes team-facing operational history. Fast is good. Mechanical is not.

## Source priority

Use this order:

1. `br` and `bd`
2. `.khuym/` state or handoff files if they clarify the active feature
3. `.beads/` files only as a cross-check or fallback
4. human clarification when the active scope is still ambiguous

Do not start by scraping `.beads/` directly just because it is convenient.

## Workflow

### 1. Establish the sync scope

First answer:

- which feature or bead set is being synced
- whether the intent is `create`, `update`, `comment`, `time log`, or a combination
- which Redmine project receives the changes
- whether this is a dry-run preview or a write-ready operation

If "current feature" is ambiguous, use repo state and `br` output to narrow it down.

If the scope is still unclear after a quick check, ask the human.

### 2. Read Beads through CLI first

Prefer CLI evidence before raw files.

Useful paths:

```bash
br ready --json
br list --status open --json
br show <id>
bd ...   # use the local graph view that best reveals parent/child and dependency shape
```

Use `.beads/` only when:

- CLI output is missing a field you need
- you need to verify a suspicious discrepancy
- `br` or `bd` is unavailable

If you fall back to raw files, say so and lower confidence.

### 3. Build the mapping options

Load `references/mapping-options-template.md`.

Present numbered options like:

1. recommended mapping
2. lighter/faster mapping
3. more explicit mapping

For each option, state:

- what maps to what
- why a team might want it
- what information gets lost or preserved
- whether it is better for creation only or for longer-term sync

Even when one path is clearly best, still present numbered options and recommend one.

Do not auto-pick.

### 4. Draft Vietnamese Redmine payloads

After the human chooses a mapping, load `references/redmine-vn-templates.md`.

Draft:

- issue subjects
- issue descriptions
- progress comments
- time log notes

The draft should be:

- specific
- traceable back to the bead
- readable for a Vietnamese team
- compact enough for daily operational use

Keep traceability by preserving bead IDs such as `br-123` where that helps auditability.

### 5. Run the anti-AI cleanup pass

Load `references/anti-ai-vn-checklist.md`.

Rewrite the Vietnamese text so it sounds like an internal teammate, not like a polished chatbot.

Focus on:

- concrete wording over inflated wording
- short natural Vietnamese over translated stiffness
- operational clarity over presentation polish
- direct statements over abstract "giá trị / tối ưu / nâng cao trải nghiệm" language

### 6. Preview exact Redmine actions

Before any write, present a sync preview with:

- selected mapping option
- bead IDs included
- Redmine objects to create or update
- exact Vietnamese payloads
- assumptions still in play
- commands to run via `/var/www/redmine-automation`

Recommended headings:

```markdown
# Sync scope
# Mapping options
# Chosen mapping
# Draft Redmine payloads
# Write preview
# Approval request
```

If the user only wants a dry-run, stop after the preview.

### 7. Execute only the approved plan

Once the human approves:

1. verify Redmine auth/session state
2. verify tracker/status/project assumptions if relevant
3. run the approved commands only
4. record the resulting issue IDs, comment actions, and time-entry IDs

Prefer idempotent behavior:

- search for existing issue links or bead IDs before creating duplicates
- update when a clear match already exists
- create only when there is no trustworthy match

### 8. Return an audit report

After execution, return:

- which beads were synced
- which Redmine issues were created or updated
- which comments were added
- which time entries were logged
- which assumptions were used
- anything skipped because confidence was too low

## Output contract

Use a visibly structured response.

### When mapping has not been chosen yet

Use:

```markdown
# Sync scope
# Mapping options
# Recommendation
# What I need from you
```

### When mapping is chosen but write approval is not given yet

Use:

```markdown
# Sync scope
# Chosen mapping
# Draft Redmine payloads
# Write preview
# Approval request
```

### After execution

Use:

```markdown
# Sync result
# Redmine objects touched
# Notes
```

## Precision rules

- Prefer `br` and `bd` over raw `.beads/` reads.
- If CLI evidence and raw file evidence disagree, surface the mismatch.
- If the Redmine project is not explicit, ask.
- If time-log hours are not evidenced, ask instead of inventing them.
- If assignee mapping is unclear, ask instead of guessing from bead ownership language.
- If a graph can reasonably map in more than one way, present numbered options and wait.
- If the user asks for speed, shorten the prose, not the control points.

## Red flags

Stop and correct course if any of these appear:

- reading `.beads/` first because it is faster
- choosing a mapping without offering numbered options
- assuming `1 bead = 1 issue` without human confirmation
- writing Vietnamese text straight from a rough draft without cleanup
- logging time from implied effort rather than evidenced effort
- creating or updating issues before a preview was approved
- translating the bead too literally and producing awkward Vietnamese
- hiding a Redmine assumption inside the command instead of surfacing it

## References

- `references/mapping-options-template.md`
- `references/redmine-vn-templates.md`
- `references/anti-ai-vn-checklist.md`
