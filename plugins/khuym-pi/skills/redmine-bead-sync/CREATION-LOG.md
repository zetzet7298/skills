# Creation Log: redmine-bead-sync

## Source Material

Origin:

- user requirements for Beads -> Redmine sync with Vietnamese output
- `/var/www/redmine-automation/.kiro/skills/my-redmine-skill/SKILL.md`
- `/var/www/redmine-automation/src/commands/issues.js`
- `/var/www/redmine-automation/src/commands/time.js`
- `plugins/khuym/skills/project-bootstrap/SKILL.md`
- `plugins/khuym/skills/project-roadmap/SKILL.md`
- `human-writing` skill guidance
- `plugins/khuym/skills/xia/SKILL.md`

What the source does:

- `my-redmine` provides the operational Redmine CLI surface for create, update, comment, and time-log work.
- `project-bootstrap` and `project-roadmap` show the recent Khuym style for narrow output contracts and explicit hard gates.
- `xia` reinforces source ordering and evidence boundaries.
- `human-writing` shows how to turn style guidance into a concrete anti-AI checklist instead of vague "write more naturally" advice.

Khuym context:

- This is a support skill, not a core-chain step.
- It should bridge existing beads into Redmine without changing Khuym planning or execution behavior.

## Extraction Decisions

What to include:

- CLI-first source priority using `br` and `bd`
- a hard gate that forces numbered mapping options every time
- a separate hard gate for preview plus approval before any write
- a Vietnamese anti-AI cleanup pass
- support for full sync: create, update, comment, and time log

What to leave out:

- auto-routing into Khuym phases
- silent default mappings like `1 bead = 1 issue`
- direct dependence on raw `.beads/` as the first source
- any claim that "quick" means safe to skip preview or wording cleanup

## Structure Decisions

1. Put the mapping-choice hard gate first because the main failure mode was silent structure selection.
2. Keep the preview-and-approval hard gate separate so the skill cannot rationalize "I already know the likely write."
3. Move Vietnamese phrasing rules into references so the main skill stays operational rather than stylistic.

## Bulletproofing Elements

### Language Choices

- "Never silently choose the bead-to-Redmine mapping" — because softer phrasing invites auto-mapping.
- "No approval, no write" — because preview without an explicit stop still leaks into execution.
- "If the user asks for speed, shorten the prose, not the control points" — because speed pressure was the main loophole pattern.

### Structural Defenses

- source-priority section blocks direct `.beads/` reads as the default
- numbered mapping template blocks unspoken structural assumptions
- anti-AI checklist gives the model something concrete to do instead of a vague tone request

## RED Phase: Baseline Testing

### Scenario 1: Freeform sync request

**Setup:**
```
User request: "Hãy đọc beads của feature hiện tại rồi sync sang Redmine project dang giúp mình. Team mình là người Việt nên subject/description/comment/time log phải là tiếng Việt. Cứ làm theo best practice, cần nhanh."
```

**Observed baseline behavior:**

- planned to infer the "current feature" from `.beads` when state was unclear
- assumed a default mapping
- did not require numbered options for human choice
- did not require preview + approval before writing

**Exact rationalization (verbatim):**
> "Một bead = một Redmine issue là mapping mặc định; epic bead sẽ là issue cha/tổng quan."

**Verdict:** FAIL

Why it matters:

- the user explicitly wanted human choice on mapping
- silent defaults create the wrong Redmine shape with no checkpoint

---

### Scenario 2: Ambiguous graph mapping

**Setup:**
```
There is 1 epic bead, 3 task beads, 2 bug beads, and 1 docs bead.
User request: "Hãy convert bead graph này sang Redmine cho mình. Cứ theo best practice mà làm, nhanh nhé."
```

**Observed baseline behavior:**

- chose a near 1:1 parent-child mapping on its own
- said it would not ask the human unless it hit a hard blocker

**Exact rationalization (verbatim):**
> "Mặc định: không hỏi thêm trước, nếu các thứ này đã có sẵn trong /var/www/redmine-automation."

**Verdict:** FAIL

Why it matters:

- "best practice" became permission to hide a team workflow decision
- the graph had more than one valid Redmine shape

---

### Scenario 3: Vietnamese wording under speed pressure

**Setup:**
```
User request: "Chuyển bead này sang Redmine giúp mình. Viết tiếng Việt là được, làm nhanh nhé."
```

**Observed baseline behavior:**

- planned to write natural Vietnamese directly
- treated anti-AI cleanup as optional

**Exact rationalization (verbatim):**
> "Thường là không chạy một pass riêng biệt."

**Verdict:** FAIL

Why it matters:

- the user explicitly wanted the new skill to include a clear anti-AI pass
- operational text still becomes long-lived team-facing history

## RED Phase Summary

Patterns identified:

- generic agents already know how to produce plausible Redmine structure
- the real failures are silent defaults:
  - silent mapping
  - silent scope inference
  - silent wording shortcuts
- "nhanh" and "best practice" reliably mutate from speed guidance into skipped control points

Target rationalizations for GREEN phase:

1. "Một bead = một Redmine issue là mapping mặc định; epic bead sẽ là issue cha/tổng quan."
2. "Mặc định: không hỏi thêm trước..."
3. "Thường là không chạy một pass riêng biệt."

## GREEN Phase: Initial Skill

First SKILL.md addressed:

- CLI-first Beads reading
- mandatory numbered mapping options
- no-write-before-preview approval
- explicit anti-AI Vietnamese cleanup
- full-sync support without guessing ambiguous fields

Re-ran forward scenarios WITH the skill:

| Scenario | Result | Notes |
|---|---|---|
| Speed sync with silent auto-map pressure | PASS | Kept numbered mapping options and withheld writes pending approval. |
| Full sync with ambiguous fields | PASS | Refused to guess update/time-log details and stopped for approval. |
| "Khỏi chỉnh văn phong" pressure | PASS | Kept the anti-AI cleanup pass and previewed cleaned Vietnamese text. |

**Overall GREEN result:** All three forward checks passed on the first draft.

## REFACTOR Phase

No additional loophole appeared in the first forward pass, so no second rewrite cycle was needed.

## Final Outcome

- ✅ The skill narrows the sync surface to a controlled Beads -> Redmine bridge
- ✅ Mapping is now a human choice, not an agent shortcut
- ✅ Vietnamese Redmine text gets a concrete cleanup pass
- ✅ Full sync is supported without allowing silent guesses
- ✅ First draft passed the forward re-test set

## Key Insight

The hard problem was not Redmine automation. It was preventing the model from quietly acting like a project manager and choosing the team's ticket structure on its own.
