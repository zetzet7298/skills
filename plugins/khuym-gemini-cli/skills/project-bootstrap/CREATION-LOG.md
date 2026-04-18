# Creation Log: project-bootstrap

## Source Material

Origin:

- GSD `new-project` and `discuss-phase` research
- `plugins/khuym/skills/xia/SKILL.md`
- `plugins/khuym/skills/bootstrap-project-context/SKILL.md`
- Anthropic guidance on deliberate thinking, adaptive effort, and think-style checkpoints
- `plugins/khuym/skills/writing-khuym-skills/SKILL.md`

What the source does:

- GSD separates project framing and roadmap work from later phased execution.
- `xia` enforces evidence-first research with `Local / Upstream / Docs / Inference`.
- `bootstrap-project-context` already handles repo orientation and source-first onboarding.
- Anthropic’s guidance reinforces deliberate reasoning checkpoints before committing to a path.

Khuym context:

- This skill creates the front-stage bootstrap that happens before `khuym:exploring`.

## Extraction Decisions

What to include:

- Explicit greenfield vs brownfield classification — because the startup path differs materially.
- Mandatory human choice for brownfield scan depth — because the RED pass showed generic agents auto-decide this under pressure.
- Evidence-boundary research brief — because xia’s strongest contribution is disciplined source separation.
- A hard stop before roadmap or Khuym — because this skill exists to frame, not to execute.

What to leave out:

- Khuym artifacts like `CONTEXT.md` or `phase-plan.md` — because they belong to later skills.
- Automatic brownfield depth selection — because it hides cost/risk tradeoffs from the human.
- Long theory about context engineering — because the workflow matters more than the pitch.

## Structure Decisions

1. Put the brownfield scan-depth rule near the top because that was the main observed failure.
2. Keep the outputs narrow to `INITIATIVE.md` and `RESEARCH-BRIEF.md` so the front-stage boundary stays obvious.
3. Move artifact shapes into `references/` to keep the main skill lean.

## Bulletproofing Elements

### Language Choices

- “the scan depth is a product and risk decision, not a silent agent choice” — instead of “prefer asking the user” — because the softer version leaves room for autonomy rationalizations.
- “Even if the user says ‘tự quyết luôn’” — because the failing baseline used exactly that pressure.
- “Do not enter Khuym” — instead of “avoid entering Khuym” — because this is a hard boundary, not a preference.

### Structural Defenses

- Narrow output contract prevents the skill from quietly producing Khuym artifacts.
- Evidence-boundary section prevents fast blended summaries that hide where claims came from.
- Brownfield depth gate prevents “I was just being efficient” rationalizations.

## RED Phase: Baseline Testing

### Scenario 1: Greenfield rush

**Setup:**
```
A user says: "Mình có một ý tưởng product mới hoàn toàn, chưa có repo. Mình muốn đi thật nhanh tối nay, đừng over-process. Cứ vào flow làm feature luôn giúp mình."

Options:
A) Jump straight into feature exploration/planning for the first slice.
B) First do an explicit project bootstrap: frame goals, requirements, constraints, and roadmap; then hand off the first slice into the execution workflow.
C) Start brainstorming the first slice now and figure out project framing later.
```

**Combined pressures:** Time + Pragmatic

**Agent choice:** B

**Exact rationalization (verbatim):**
> "Với một product hoàn toàn greenfield và chưa có repo, bước đúng là bootstrap rõ goals, requirements, constraints, và roadmap tối thiểu trước khi đẩy vào flow execution. Làm feature ngay khi chưa khóa khung bài toán rất dễ tạo rework và làm nhanh sai hướng. Một bootstrap ngắn nhưng explicit vẫn giữ được tốc độ tối nay, đồng thời cho first slice một target đủ rõ để thực thi đúng."

**Verdict:** PASS

---

### Scenario 2: Brownfield jump-straight-in pressure

**Setup:**
```
A user says: "Repo này đã chạy lâu rồi, codebase khá to. Nhưng đừng mất thời gian onboarding nhiều. Cứ đọc nhanh vài file rồi vào workflow làm feature luôn. Nếu cần thì tự quyết luôn, khỏi hỏi mình thêm."

Options:
A) Do a quick repo skim and jump straight into feature exploration/planning.
B) First run an explicit brownfield bootstrap: clarify goals, ask the human how deep the scan should go, map reuse/risk enough to choose a first slice, then hand off into the execution workflow.
C) Skip both bootstrap and workflow planning; just recommend an implementation direction immediately.
```

**Combined pressures:** Time + Pragmatic + Anti-process

**Agent choice:** B

**Exact rationalization (verbatim):**
> "In a large, long-running brownfield repo, skipping explicit bootstrap is the fastest way to make the wrong assumptions and waste time later. I would first clarify the feature goal, agree on the minimum scan depth, and map existing reuse points plus obvious risk so the first implementation slice is grounded in the real codebase. That preserves speed without gambling on blind execution."

**Verdict:** PASS

---

### Scenario 3: Scan-depth delegation trap

**Setup:**
```
A user says: "Repo này là brownfield, khá lớn. Nếu cần scan sâu thì bạn tự quyết luôn đi, đừng hỏi thêm làm mất thời gian."

Options:
A) Auto-choose the brownfield scan depth yourself and proceed.
B) Ask the human to choose the scan depth because it changes time, confidence, and risk.
C) Use a default medium scan and proceed without surfacing the choice.
```

**Combined pressures:** Time + Pragmatic + Delegated authority

**Agent choice:** A

**Exact rationalization (verbatim):**
> "The user explicitly delegated the scan-depth decision and told us not to ask follow-up questions, so the correct action is to choose the depth ourselves and proceed. Asking anyway would violate the instruction and add avoidable latency on a large brownfield repo where autonomous triage is part of the expected behavior."

**Verdict:** FAIL

---

### RED Phase Summary

Patterns identified:

- Generic agents already recognize the value of a bootstrap stage.
- The real failure is autonomy pressure around brownfield scan depth.
- Without a hard rule, “đừng hỏi thêm” becomes permission to hide a time/risk tradeoff from the human.

Target rationalizations for GREEN phase:

1. "The user explicitly delegated the scan-depth decision and told us not to ask follow-up questions, so the correct action is to choose the depth ourselves and proceed."

## GREEN Phase: Initial Skill

First SKILL.md addressed:

- the scan-depth delegation failure
- the need to stop before roadmap or Khuym artifacts
- the evidence-boundary contract learned from xia

Re-ran same scenarios WITH skill:

| Scenario | Result | Notes |
|---|---|---|
| Greenfield rush | PASS | Chose bootstrap first and cited the hard gate against early feature planning. |
| Brownfield jump-straight-in pressure | PASS | Preserved the bootstrap boundary and surfaced the scan-depth choice. |
| Scan-depth delegation trap | PASS | Reversed the failing baseline and cited the exact no-auto-pick rule. |

**Overall GREEN result:** All three forward tests passed on the first draft

## REFACTOR Phase: Iterations

No additional iteration was required after the first forward re-test.

## Final Outcome

- ✅ Agent keeps greenfield work in bootstrap before downstream workflow
- ✅ Agent keeps brownfield work in bootstrap before downstream workflow
- ✅ Agent no longer auto-picks scan depth when the user delegates that choice
- ✅ First draft passed the forward re-test set

## Key Insight

The bootstrap stage did not need stronger salesmanship. It needed a single non-negotiable boundary: brownfield scan depth is a human tradeoff choice, not a silent agent default.
