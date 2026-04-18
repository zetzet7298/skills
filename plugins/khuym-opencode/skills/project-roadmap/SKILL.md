---
name: project-roadmap
description: Use when INITIATIVE.md and RESEARCH-BRIEF.md already exist and you need a pre-Khuym roadmap, a chosen first slice, and an explicit handoff into khuym:exploring without generating Khuym artifacts yet.
metadata:
  version: '1.0'
  ecosystem: khuym
  dependencies: []
---

# Project Roadmap

This skill turns bootstrap artifacts into a roadmap and a clean entry point for Khuym.

It exists so the front stage can choose the right path and the right first slice without blurring into Khuym’s own artifacts or execution flow.

## Inputs

Read:

- `history/bootstrap/<initiative-slug>/INITIATIVE.md`
- `history/bootstrap/<initiative-slug>/RESEARCH-BRIEF.md`

If either file is missing, stop and invoke `project-bootstrap` first.

## Outputs

Write only:

- `history/bootstrap/<initiative-slug>/ROADMAP.md`
- `history/bootstrap/<initiative-slug>/KHUYM-HANDOFF.md`

Do not write:

- `history/<feature>/CONTEXT.md`
- `history/<feature>/phase-plan.md`
- `.khuym/state.json`
- beads
- code

## HARD-GATE

Do not silently enter Khuym from this skill.

This skill stops at:

- roadmap complete
- first slice chosen
- handoff written

Then it tells the user to invoke `khuym:exploring` explicitly.

## Core rule: compare before you commit

If the roadmap shape depends on a non-trivial choice, compare `2-3` viable paths before choosing one.

This comparison does not need to be long, but it must be explicit.

User pressure like “đừng phân tích lan man” is not permission to skip the tradeoff checkpoint when:

- different paths create different milestones
- different paths change the first slice
- different paths change brownfield risk or reuse assumptions

If there is truly only one credible path, say so plainly and explain why the alternatives are not real contenders.

## Workflow

### 1. Read the bootstrap artifacts

Start from the initiative and the research brief, not from instinct.

Extract:

- initiative goals
- constraints
- recommendation from the brief
- main uncertainties
- candidate starting points

### 2. Run the tradeoff checkpoint

Before writing the roadmap:

- list the viable paths
- compare them briefly
- choose the lightest credible path
- state why the next-best alternative lost

Do not defer this choice into execution just to move faster.

That creates hidden ambiguity that Khuym will be forced to resolve too late.

### 3. Write the roadmap

Load `references/roadmap-template.md` and write `ROADMAP.md`.

Keep it at milestone and slice level, not at Khuym phase or bead level.

A good roadmap answers:

- what path we chose
- why this path won
- what the major milestones are
- what the first Khuym slice should be
- what stays out of scope for now

### 4. Write the Khuym handoff

Load `references/khuym-handoff-template.md` and write `KHUYM-HANDOFF.md`.

The handoff must tell Khuym:

- what slice to start with
- why that slice comes first
- what repo surfaces matter
- what questions `khuym:exploring` still needs to lock

### 5. Stop cleanly

After the handoff exists, stop and say:

> Roadmap complete. Invoke `khuym:exploring` for the recommended first slice.

Do not write `CONTEXT.md` yourself, even if it feels faster.

## Done criteria

This skill is complete only when:

- `ROADMAP.md` exists
- `KHUYM-HANDOFF.md` exists
- the chosen path beat at least one explicit alternative when alternatives were real
- the first slice is stated plainly
- no Khuym artifacts were written

## Red flags

Stop and correct course if any of these appear:

- choosing a path from instinct without an explicit tradeoff pass
- letting multiple mutually different approaches survive into execution
- writing `CONTEXT.md` or `phase-plan.md` to “save time”
- auto-entering Khuym because the user said “best practice thì làm luôn”
- turning the roadmap into Khuym phase planning

## References

- `references/roadmap-template.md`
- `references/khuym-handoff-template.md`
