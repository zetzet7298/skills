# Learning Artifacts

Use for concept explainers, study guides, feature deep-dives, incident reports, research summaries, and status/report documents.

## Concept Explainer

Use this shape when the user asks how something works.

Layout:
- Hook with a concrete action: drag, click, choose a sample, scrub a value, or run a tiny simulation.
- Header with title, audience, and a one-paragraph frame after the hook.
- "Core idea" block that gives away the punchline early.
- Visual model: inline SVG diagram, state machine, timeline, chart, table, or interactive demo.
- Concrete example trace with realistic inputs and outputs.
- Comparison to the naive or prior model when useful.
- Glossary near the relevant terms, not buried at the bottom.
- "Where to look next" with source links or files when repo-specific.

Load-bearing details:
- Include at least one visual object that carries meaning.
- Prefer a worked example over abstract prose.
- Keep text and visuals synchronized: if the selected state changes, labels and explanation change too.
- Make important nodes, data points, formulas, or steps inspectable on click/focus/hover.
- Use tabs/collapsibles to keep advanced details available but not dominant.

## Report Or Deep Dive

Use this shape when the artifact needs to be scanned and shared.

Layout:
- Executive summary at the top.
- Key facts in a compact strip: owner, date, status, scope, risk, confidence.
- Main content grouped by reader intent: what happened, why it matters, evidence, recommendation.
- Timeline or dependency map when sequence matters.
- Tables for risks, decisions, open questions, or action items.

Avoid:
- A long article with decorative cards.
- Burying the recommendation after pages of context.
- Status colors that do not correspond to real statuses.
- Visual sections that only restate prose instead of letting the reader test a model.

## Study Guide

Use this shape when the user wants to learn and remember.

Layout:
- Learning goals.
- Progressive sections from concrete play to intuition to mechanics to edge cases.
- Checkpoints or mini-quizzes with revealable answers.
- A small cheat sheet at the end.

Keep it practical: examples, diagrams, and recall prompts beat paragraphs.
