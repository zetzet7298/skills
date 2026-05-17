# Diagrams

Use for system flows, architecture maps, timelines, state machines, interaction diagrams, and technical figures.

## Inline SVG

Prefer inline SVG for the primary visual model. It is the best default for diagrams, charts, graphs, timelines, maps, state machines, and non-technical explainers because it stays readable, copyable, editable, and scriptable without network dependencies.

Rules:
- Use `viewBox` for scaling.
- Include `<title>` and `<desc>` for the full SVG, and accessible labels for interactive groups.
- Use readable group structure: `<g class="node" data-id="...">`.
- Use arrows for direction and labels for ambiguous edges. Use marker arrows, dashed lines, or line weight to distinguish path types.
- Highlight the happy path separately from error/retry/optional paths.
- Use shape and labels, not color alone, to distinguish meaning.
- Keep labels short. Put long explanation in side panels, captions, or expandable notes.
- Make important nodes clickable or keyboard-focusable when details exist. Use `data-*` attributes so JS can highlight related edges, update a side panel, or animate the current path.
- Keep diagram text real SVG text, not raster images, so it remains searchable and readable.
- Add visible selected/current state styling. A user should know what they changed and what the model is showing now.

## Interactive Mental Models

Use this shape when the goal is intuitive understanding, especially for non-technical users.

Minimum:
- One SVG model that carries the core concept.
- One control surface that changes the model: sample selector, risk checklist, slider, toggle, path picker, or editable prompt.
- One explanation panel that updates with the selected node/path/result.
- One export action when user choices produce reusable output.
- One quick-start preset so the user can learn without entering their own data first.

Good patterns:
- Classifier: user checks inputs, SVG highlights the chosen lane/path and updates the recommendation.
- System map: user clicks nodes, related files/services light up, side panel explains ownership.
- Timeline: user scrubs or picks phases, SVG highlights what changes over time.
- Comparison graph: user toggles before/after and the SVG shows what moved, appeared, or disappeared.
- Validation ladder: user selects a risk level and the proof chart changes.
- Reactive document: user changes assumptions and all dependent numbers, labels, charts, and conclusions update.

## Flow Or Sequence

Layout:
- Left-to-right for pipelines and data flow.
- Top-to-bottom for time or lifecycle.
- Swimlanes for ownership boundaries.
- Clickable nodes when each step has detail.
- Legend for colors, line styles, and status.

## Timeline

Layout:
- Timestamp column plus event column.
- Cluster related events visually.
- Attach logs, screenshots, or evidence to the timestamp where they matter.
- Include impact and decision points.

Avoid:
- Mermaid-style auto-layout when the result is tangled.
- Diagrams that require prose to understand direction.
- Static boxes that only restate section headings.
- Huge diagrams with every edge case. Abstract rare paths.
