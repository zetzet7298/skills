# Interactive Editors And Playgrounds

Use when the user needs to manipulate structured information, tune values, compare states, or round-trip a decision back into text.

If the user says "non-technical", "intuitive", "understand", "start using", "teach", or similar, treat the artifact as an interactive cognition surface, not a static explainer. The user should be able to try a realistic case and watch the model change before reading much theory.

## Non-Negotiable Export

Every editor must export the current state. Add this before polishing the interface.

Common exports:
- Copy as markdown for triage, plans, and summaries.
- Copy as JSON for configs, labels, state, or structured decisions.
- Copy as prompt for handing the result to another agent.
- Download CSV for tabular curation.
- Copy a recommended next-step prompt when the artifact teaches a process.

## Required Cognition Loop

Interactive learning artifacts should make this loop visible:

1. User changes input or selects a sample.
2. The SVG/graph/chart updates immediately.
3. A plain-language result explains what happened and why.
4. The user can export the current result back into the workflow.

Also synchronize nearby prose. If a control changes the model, any conclusion, count, lane, risk label, or recommended next step in text must update in the same state transition.

For classification or process tools, show counts and consequences. Example: checked risk flags -> lane chart -> highlighted path -> required artifacts -> copy-ready starter prompt.

## Good Editor Shapes

Triage board:
- Columns for buckets.
- Drag/drop or quick buttons.
- Count by bucket.
- Export grouped markdown.

Parameter tuner:
- Live preview.
- Sliders/inputs for meaningful parameters.
- Presets for comparison.
- Live code/config output with copy button.

Prompt or template workbench:
- Editable template.
- Sample inputs.
- Live rendered output.
- Validation warnings and copy-ready final prompt.

Visual simulator:
- Inline SVG graph, flow, state machine, or chart as the main surface.
- Presets for common user scenarios.
- Controls that visibly change the path, status, counts, or recommendation.
- Side panel that explains the selected node/path in non-technical language.

Dataset/annotation tool:
- One focused item at a time plus list navigation.
- Keyboard shortcuts.
- Labels/tags visible immediately.
- Export includes item IDs and labels.

Avoid:
- Generic products with settings screens.
- Making the user paste data they already gave.
- Any editor without a way back to the workflow.
- Tabs that only swap prose without changing a visual model.
- Sandboxes that say "figure it out" without authored prompts, presets, or guided tasks.
