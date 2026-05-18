# Pattern Catalog

Choose one primary pattern and at most two supporting patterns. Too many mechanics dilute the learning goal.

For each pattern, make the interaction change the concept model. Do not add controls that merely change text, theme, or section visibility unless they support the main model.

## Slider-Driven Model

Use for formulas, parameters, sensitivity analysis, probability, finance, optimization, and scientific claims.

Mechanics:

- Range inputs control named variables.
- Dependent text, formulas, chart marks, and conclusions update together.
- Add presets for notable cases.
- Show the equation or rule behind the output, at least in a revealable detail panel.
- If a preset exists, it must update the slider values and the visual result, not only the prose.

Implementation fit: vanilla JS + SVG, Chart.js, Observable Plot, Vega-Lite, or D3.

## Drag-To-Understand

Use for geometry, vectors, PCA, graph algorithms, layout, physics, scheduling, queues, and spatial reasoning.

Mechanics:

- Drag points, nodes, blocks, or agents.
- Recompute constraints, distances, forces, or formulas live.
- Show snap lines, ghost positions, or trails for causality.

Implementation fit: SVG pointer events or D3 drag; Canvas for many objects.

## Simulation Sandbox

Use for emergence, feedback loops, epidemic spread, traffic, markets, games, automata, caching, concurrency, and distributed systems.

Mechanics:

- Provide play/pause/step/reset.
- Show counters and local rules.
- Let readers alter one or two parameters, then compare outcomes.
- Show local behavior and aggregate outcome together so the reader sees micro-to-macro causality.

Implementation fit: Canvas for particles/agents; SVG for small state machines; requestAnimationFrame for loops.

## Scrollytelling

Use for narrative sequence, data stories, timelines, transformations, and staged reveal.

Mechanics:

- Keep one sticky visual surface.
- Use sections to advance state.
- Highlight one concept per scroll step.

Implementation fit: Intersection Observer + SVG/Canvas/D3.

## Hover Or Tap To Inspect

Use for dense charts, maps, matrices, kernels, attention maps, code traces, and network graphs.

Mechanics:

- Hover/focus/tap reveals exact values, formulas, local rules, or trace context.
- Keep tooltip content short and anchored.
- Provide a persistent detail panel on touch screens.

Implementation fit: SVG events, D3 selections, native title only for fallback.

## Click-To-Drill

Use for hierarchy, systems architecture, neural networks, causal chains, dependency graphs, and layered processes.

Mechanics:

- Start with a clean overview.
- Click a component to expand a detail layer.
- Preserve orientation with breadcrumbs or a visible back/reset control.

Implementation fit: SVG groups, HTML details, D3 hierarchy, Cytoscape.js for complex graphs.

## Small Game

Use when choices and consequences teach the topic: game theory, incentives, classification, memory, proof strategy, debugging, negotiation, security, or ethics.

Mechanics:

- Define a simple win condition or score.
- Teach one rule per level.
- After each round, reveal the principle the player just experienced.
- Let failure teach. The first round may be intentionally easy to misunderstand if the debrief makes the hidden rule visible.

Implementation fit: vanilla JS state machine, Canvas, SVG board, or DOM buttons.

## Live Code Or Trace

Use for algorithms, parsing, regex, state machines, compilers, and API flows.

Mechanics:

- Let users edit safe inputs, not arbitrary unsandboxed JavaScript.
- Animate the trace step by step.
- Highlight source, state, and output together.

Implementation fit: textarea + parser/trace code; avoid `eval` unless the user explicitly needs a code sandbox and the risk is contained.

## Concept Map With Consequences

Use for repositories, systems, workflows, arguments, and conceptual taxonomies where relationships matter more than raw numbers.

Mechanics:

- Show nodes and edges as the primary surface.
- Selecting a node highlights upstream/downstream consequences.
- Scenario or role presets change which path is emphasized.
- Detail panels explain why the selected relationship matters.

Implementation fit: inline SVG for small maps; D3 or Cytoscape.js for larger graphs.

Avoid turning this into a grid of cards. If the relationships matter, draw the relationships.
