---
name: project-bootstrap
description: Use when starting a new initiative before Khuym, especially for greenfield work or brownfield repos that need project framing, a human-approved scan-depth choice, and evidence-first research before any roadmap, phase planning, or execution.
metadata:
  version: '1.0'
  ecosystem: khuym
  dependencies:
    - id: exa
      kind: mcp_server
      server_names: [exa]
      config_sources: [global_codex_config, plugin_mcp_manifest]
      missing_effect: degraded
      reason: Official-doc research is best-effort evidence for the research brief.
    - id: deepwiki
      kind: mcp_server
      server_names: [deepwiki]
      config_sources: [global_codex_config, plugin_mcp_manifest]
      missing_effect: degraded
      reason: Upstream repository research is best-effort evidence for the research brief.
---

# Project Bootstrap

This skill is the front stage before Khuym.

Its job is to make the initiative legible enough that Khuym can stay strict about feature execution instead of absorbing product framing, brownfield discovery, and roadmap setup.

## Outputs

Write only:

- `history/bootstrap/<initiative-slug>/INITIATIVE.md`
- `history/bootstrap/<initiative-slug>/RESEARCH-BRIEF.md`

Do not write:

- `history/<feature>/CONTEXT.md`
- `history/<feature>/phase-plan.md`
- `.khuym/state.json`
- `.khuym/STATE.md`
- beads or execution artifacts

If the user already has both bootstrap artifacts and wants the next step, stop and invoke `project-roadmap`.

## HARD-GATE

Do not enter Khuym, do not plan phases, and do not write code until both bootstrap artifacts exist and are good enough for roadmap work.

This includes:

- no `khuym:exploring`
- no `khuym:planning`
- no feature implementation
- no silent handoff into downstream workflow

## Mode selection

Classify the initiative first:

- `greenfield` — no meaningful repo yet, or the codebase is only a stub
- `brownfield` — existing repo or service already carries real behavior, legacy constraints, or reusable seams

If the request is ambiguous, ask one short clarification question before proceeding.

## Brownfield scan-depth rule

If this is brownfield, the scan depth is a product and risk decision, not a silent agent choice.

You MUST ask the human to choose one of these before deeper investigation:

- `quick seam scan` — enough to identify entrypoints, relevant modules, and obvious fit
- `reuse map` — quick seam scan plus likely reuse points and extension surfaces
- `reuse + risk map` — reuse map plus migration risks, blast radius, and major constraints

Even if the user says “tự quyết luôn” or “đừng hỏi thêm”, do not auto-pick the depth when the choice materially changes time, confidence, or risk.

Why: teams often mean “be efficient,” not “silently choose the wrong level of diligence for my repo.”

## Workflow

### 1. Establish the initiative shell

Choose an `initiative-slug` and artifact directory:

`history/bootstrap/<initiative-slug>/`

Load `references/initiative-template.md` and write `INITIATIVE.md`.

Capture:

- initiative summary
- greenfield vs brownfield mode
- goals
- non-goals
- constraints
- success criteria
- known stakeholders or users
- chosen brownfield scan depth, if applicable
- open questions that still block research confidence

### 2. Build the research brief

Load `references/research-brief-template.md` and write `RESEARCH-BRIEF.md`.

Use this order:

1. `Local`
2. `Upstream`
3. `Docs`
4. `Inference`

#### Local rules

For brownfield repos:

- read `AGENTS.md` and `README.md` first when they exist
- inspect real manifests, entrypoints, configs, tests, and feature-adjacent files
- identify existing seams, reusable modules, and risky boundaries

For greenfield work:

- say explicitly when there is no meaningful local codebase yet
- capture any repo, product, or org constraints that already exist locally

#### Upstream rules

- check relevant public repositories or upstream patterns only after the local picture is clear
- use `deepwiki` when it helps, but do not block progress on it

#### Docs rules

- prefer official docs over blog posts
- when versions are knowable, say whether you matched the detected version or latest stable guidance

#### Inference rules

- keep inference separate from facts
- explain why the recommendation is the lightest credible path from the evidence, not from instinct

### 3. Apply the evidence boundary

Do not blur evidence sources together.

Every non-trivial claim in the brief should land under one of:

- `Local`
- `Upstream`
- `Docs`
- `Inference`

“Quick answer” is not permission to collapse these boundaries into one blended story.

### 4. Gate the bootstrap

Stop and ask the human before roadmap work if any of these are true:

- the initiative still has unresolved goals or scope boundaries
- the chosen brownfield scan depth appears insufficient for confidence
- the recommendation depends on a product decision the user has not made
- the brief still reads like intuition rather than evidence

### 5. Handoff

When both artifacts are solid, stop with:

> Bootstrap complete. Use `project-roadmap` next.

## Done criteria

This skill is done only when:

- `INITIATIVE.md` exists
- `RESEARCH-BRIEF.md` exists
- brownfield work asked the human to choose scan depth before deeper investigation
- the brief preserves `Local / Upstream / Docs / Inference` boundaries
- no Khuym artifacts were written

## Red flags

Stop and correct course if any of these appear:

- auto-picking brownfield scan depth because the user said “just decide”
- writing `CONTEXT.md` before Khuym starts
- jumping straight into roadmap or feature slicing before the bootstrap artifacts exist
- blending repo truth, web results, and inference into one unlabelled recommendation
- calling a greenfield idea “ready for execution” without initiative framing

## References

- `references/initiative-template.md`
- `references/research-brief-template.md`
