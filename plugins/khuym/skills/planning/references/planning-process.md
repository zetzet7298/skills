# Planning Process Reference

Open this file when you need the fuller planning standard, examples, or artifact quality checks. Keep `SKILL.md` focused on routing and gates.

## Communication Standard

Planning explanations should sound like a teammate explaining the work at a whiteboard.

When describing phases or stories:

- start with what becomes true in the product or system
- explain why the order makes sense using a realistic scenario
- use technical terms only after the practical meaning is clear
- avoid vague labels like "foundation", "polish", or "integration layer" unless translated into concrete outcomes

Bad:

- `Phase 1 establishes the foundational ingestion abstraction.`

Good:

- `Phase 1 makes one inbound message arrive safely, get normalized, and become visible in the inbox. We do this first because nothing else matters until one real message can get through the system correctly.`

## Worked Example

Feature: add inbound email support for the agent inbox.

**Phase 1: Receive and normalize inbound email**

- What changes in real life: an incoming email can reach the system and become a normalized internal message record.
- Why this phase exists first: nothing else matters until inbound mail can be accepted safely.
- Demo: send one test email, see one normalized inbox record appear.

**Stories inside Phase 1**

- **Story 1: Accept the webhook safely**: the system can verify the inbound request and reject invalid payloads.
- **Story 2: Normalize the message**: the accepted payload becomes one predictable internal shape.
- **Story 3: Surface it in tooling**: a human or agent can inspect the normalized message in the inbox flow.

Why this order makes sense:

- Story 1 comes first because unsafe input should not reach storage.
- Story 2 comes next because later code needs one consistent message shape.
- Story 3 comes last because there is nothing useful to show until normalization works.

**Phase 2: Route messages to the right agent and thread**

- What changes in real life: the email no longer just exists, it lands in the right conversation.

**Phase 3: Add reply polish, safety checks, and operational visibility**

- What changes in real life: the feature is dependable enough to run in normal use.

## Discovery Detail

Always explore:

1. Architecture topology: where this feature will live.
2. Existing patterns: what should be reused or modeled after.
3. Technical constraints: runtime, dependencies, build/test requirements.

Use gkg MCP tools first for supported repos with green readiness. Fall back to grep/file inspection only after recording why gkg is not available or suitable.

Explore external patterns only when the feature introduces a new library, integration, or pattern.

Parallelization guidance:

- Standard feature: 2-3 agents covering architecture, patterns, constraints.
- New integration/library: 3-4 agents including external research.
- Pure refactor: 1-2 agents focused on existing patterns and constraints.
- Architecture change: go deep on topology and replacement risk.

## Synthesis Detail

`approach.md` must include:

1. Gap Analysis
2. Recommended Approach
3. Alternatives Considered
4. Risk Map
5. Proposed File Structure
6. Institutional Learnings Applied

Risk classification:

| Level | Criteria | Action |
|-------|----------|--------|
| LOW | Pattern exists in codebase | Proceed |
| MEDIUM | Variation of existing pattern | Interface sketch optional |
| HIGH | Novel, external dep, blast radius >5 files | Flag for validating to spike |

## Phase Plan Quality

The whole-feature plan must answer:

1. What are the 2-4 meaningful phases?
2. What changes for real users or systems after each phase?
3. Why does Phase 1 come before Phase 2?
4. What is the simplest believable demo for each phase?
5. Which phase should be prepared first?

Rules:

- Every phase describes a real, observable capability slice.
- A reader understands the phase without reading implementation files.
- Phase 1 feels obviously first.
- If a phase has 5+ stories, it is probably too large.
- If a phase can only be described with architecture jargon, rewrite it.

## Current Phase Contract

The contract must answer:

1. What changes in real life when this phase lands.
2. What the entry state is.
3. What the exit state is.
4. What the simplest demo walkthrough is.
5. What this phase unlocks next.
6. What is explicitly out of scope.
7. What signals would force a pivot.

Rules:

- The exit state is observable, not aspirational.
- The phase closes a meaningful small loop by itself.
- The demo proves the phase is real.
- If the phase fails, the team knows whether to debug locally or rethink the larger plan.

## Story Map Detail

Every story must state:

- what happens
- why it happens now
- what part of the phase exit state it advances
- what it creates
- what it unlocks next
- what done looks like

Quality checks:

- Story 1 has an obvious reason to exist first.
- Every story unlocks or de-risks a later story, or directly closes part of the exit state.
- If all stories complete, the phase exit state holds.
- If a story cannot answer "what becomes possible after this?", it is probably not a real story.

Count guidance:

- Typical current phase: 2-4 stories.
- Small current phase: 1-2 stories.
- Large current phase: split the phase before creating beads.

## Multi-Perspective Check

Only use this for HIGH-stakes current phases: multiple HIGH-risk components, core architecture, auth flows, data model changes, or large blast radius.

Review:

- `history/<feature>/phase-plan.md`
- `history/<feature>/phase-<n>-contract.md`
- `history/<feature>/phase-<n>-story-map.md`

Ask:

1. Does this phase still fit the full feature plan?
2. Does the phase contract close a small believable loop?
3. Do the stories make sense in this order?
4. Which story is too large, vague, or poorly ordered?
5. What would make an executor regret this phase design later?

Iterate 1-2 rounds. Stop when changes become incremental.

## Bead Detail

Every bead must include:

- clear title
- description with enough context for a fresh worker
- file scope
- dependencies
- verification criteria
- explicit phase association
- explicit story association

Create epic first if missing, then current-phase tasks:

```bash
br create "<Feature Name>" -t epic -p 1
br create "Phase <n> / Story <m>: <Action>" -t task --blocks br-<epic-id>
br dep add br-<id2> br-<id1>
```

Embed this context in each bead:

```markdown
## Phase Context

Phase: Phase <n> - <Phase Name>
What Changes: <what becomes true after this phase>
Unlocks Next: <next phase or capability>

## Story Context

Story: Story <m> - <Story Name>
What Happens: <what this story makes true>
Contributes To: <phase exit-state statement>
Unlocks: <what the next story can now do>

## Planning Context

From approach.md: <specific decision that applies here>

## Institutional Learnings

From history/learnings/<file>:
- <key gotcha or pattern>
```

Decomposition principles:

- One bead = one agent, one context window, roughly 30-90 minutes.
- Never create a bead that requires reading 10+ files.
- Shared files require explicit dependencies.
- Story closure matters more than layer purity.

The validator must be able to trace:

`feature -> phase -> story -> bead`
