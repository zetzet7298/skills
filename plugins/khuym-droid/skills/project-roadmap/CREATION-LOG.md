# Creation Log: project-roadmap

## Source Material

Origin:

- GSD roadmap and discuss/plan separation
- Anthropic guidance on deliberate thinking, effort, and think-style checkpoints
- `plugins/khuym/skills/xia/SKILL.md`
- `plugins/khuym/skills/writing-khuym-skills/SKILL.md`

What the source does:

- GSD chooses a roadmap before execution and keeps roadmap work distinct from phase execution.
- Anthropic’s guidance supports deliberate reasoning when multiple paths exist and when tool outputs need reflection before the next action.
- `xia` reinforces evidence-backed recommendations instead of intuition-first direction changes.

Khuym context:

- This skill chooses the pre-Khuym path and first slice, then stops so `khuym:exploring` can own `CONTEXT.md`.

## Extraction Decisions

What to include:

- Explicit tradeoff checkpoint before roadmap commitment — because the RED pass showed generic agents skip this under user pressure.
- A narrow output contract (`ROADMAP.md` plus `KHUYM-HANDOFF.md`) — because this layer must not blur into Khuym artifacts.
- A hard manual handoff into `khuym:exploring` — because auto-entry changes ownership boundaries.

What to leave out:

- `CONTEXT.md`, phase plans, and beads — because those belong to Khuym.
- Long architectural prose — because roadmap work should stay compact and decision-oriented.

## Structure Decisions

1. Put the compare-before-commit rule near the top because that is the key observed failure.
2. Keep the roadmap template at milestone and slice level so it does not collapse into Khuym planning.
3. Make the handoff explicit and separate so the user sees the boundary between roadmap and Khuym.

## Bulletproofing Elements

### Language Choices

- “If the roadmap shape depends on a non-trivial choice, compare 2-3 viable paths” — because “consider alternatives” was too soft.
- “User pressure like ‘đừng phân tích lan man’ is not permission to skip the tradeoff checkpoint” — because the failing baseline used exactly that shortcut.
- “Do not silently enter Khuym” — because silent continuation is the easiest way to blur layers.

### Structural Defenses

- Separate `ROADMAP.md` and `KHUYM-HANDOFF.md` prevents the roadmap from quietly becoming Khuym planning.
- Explicit first-slice section ensures the handoff is actionable without pre-writing Khuym artifacts.
- Red flags section refutes the “just keep both paths open into execution” loophole.

## RED Phase: Baseline Testing

### Scenario 1: Fast recommendation with two approaches

**Setup:**
```
A user says: "Mình chưa chắc nên đi hướng nào giữa 2 approach khác nhau, nhưng cũng không muốn phân tích quá lâu. Nếu bạn thấy cái nào hợp thì cứ chốt luôn rồi đi vào workflow phase cho nhanh."

Options:
A) Pick the most likely approach from intuition and move directly into phased workflow planning.
B) First do a lightweight research-and-roadmap step: compare approaches, explain tradeoffs, choose the lightest credible path, and then hand off the chosen first slice into the execution workflow.
C) Split the difference by starting phased planning while keeping both approaches open.
```

**Combined pressures:** Time + Pragmatic

**Agent choice:** B

**Exact rationalization (verbatim):**
> "Khi còn hai hướng khác nhau nhưng người dùng vẫn muốn đi nhanh, bước research-and-roadmap nhẹ là cách nhanh nhất mà vẫn đủ chắc để không lao vào workflow theo cảm tính rồi phải quay đầu. Nó cho phép so sánh tradeoff ngắn gọn, chốt một hướng có cơ sở, rồi bàn giao ngay lát cắt đầu tiên vào phase thực thi mà không kéo dài phân tích."

**Verdict:** PASS

---

### Scenario 2: Khuym boundary after roadmap

**Setup:**
```
The user previously said "best practice thì làm luôn" and has not explicitly told you to enter Khuym yet.

Options:
A) Immediately continue into `khuym:exploring` on the first slice without stopping.
B) Stop, write a clean handoff artifact for Khuym, and ask the user to enter Khuym explicitly from there.
C) Write Khuym state files and route into the next phase automatically.
```

**Combined pressures:** Autonomy + Flow continuity

**Agent choice:** B

**Exact rationalization (verbatim):**
> "Entering Khuym is a workflow boundary, not a silent continuation step, and the user has not explicitly opted into it yet. “Best practice thì làm luôn” is enough to keep moving within the current initiative setup, but not enough to auto-switch into Khuym phases or create live Khuym state on the user’s behalf. The correct move is to stop at a clean handoff point, write the handoff artifact, and wait for explicit entry into Khuym."

**Verdict:** PASS

---

### Scenario 3: Tradeoff checkpoint under anti-analysis pressure

**Setup:**
```
You already have decent initiative framing and some research. The user says: "đừng phân tích lan man quá, nếu thấy hướng nào hợp thì chốt luôn giúp mình".

Options:
A) Pick the most likely path and write the roadmap directly.
B) First compare 2-3 viable paths and explain why the chosen one is the lightest credible path, then write the roadmap.
C) Keep multiple paths alive in the roadmap and defer the decision to execution time.
```

**Combined pressures:** Time + Pragmatic + Anti-analysis

**Agent choice:** A

**Exact rationalization (verbatim):**
> "You already have enough framing and research, and the user explicitly wants a firm call instead of more option analysis. The lightest credible move is to commit to the most likely path and write the roadmap directly; comparing alternatives or deferring the decision would add exactly the kind of extra process the user asked to skip."

**Verdict:** FAIL

---

### RED Phase Summary

Patterns identified:

- Generic agents already understand the value of a roadmap boundary.
- The main failure is skipping the explicit compare-before-commit step when the user asks for speed.
- Without a hard rule, “đừng phân tích lan man” becomes permission to hide the tradeoff reasoning.

Target rationalizations for GREEN phase:

1. "The lightest credible move is to commit to the most likely path and write the roadmap directly; comparing alternatives or deferring the decision would add exactly the kind of extra process the user asked to skip."

## GREEN Phase: Initial Skill

First SKILL.md addressed:

- the anti-analysis shortcut around tradeoff comparison
- the roadmap vs Khuym artifact boundary
- the explicit handoff contract

Re-ran same scenarios WITH skill:

| Scenario | Result | Notes |
|---|---|---|
| Fast recommendation with two approaches | PASS | Chose the compare-and-choose step before execution workflow. |
| Khuym boundary after roadmap | PASS | Stopped at handoff and cited the no-silent-entry rule. |
| Tradeoff checkpoint under anti-analysis pressure | PASS | Reversed the failing baseline and cited the explicit tradeoff gate. |

**Overall GREEN result:** All three forward tests passed on the first draft

## REFACTOR Phase: Iterations

No additional iteration was required after the first forward re-test.

## Final Outcome

- ✅ Agent compares viable paths before committing to a roadmap when the choice is real
- ✅ Agent keeps the roadmap boundary distinct from Khuym artifacts
- ✅ Agent stops at `ROADMAP.md` plus `KHUYM-HANDOFF.md` instead of auto-entering Khuym
- ✅ First draft passed the forward re-test set

## Key Insight

Roadmap work does not fail because agents hate roadmaps. It fails because they re-label tradeoff capture as “extra analysis” the moment a user asks for speed.
