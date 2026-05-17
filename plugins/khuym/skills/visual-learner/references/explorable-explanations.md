# Explorable Explanations

Use when the artifact should teach by letting the reader manipulate a model, not only read about it.

## Core Doctrine

- Start concrete, end abstract. Give the reader something to do in the first screen: drag, click, choose a sample, move a slider, run a small simulation, or inspect a node.
- The artifact is an environment to think in. Let the reader ask "what if?" and see consequences immediately.
- Author the path. A sandbox alone is not an explanation; provide prompts, presets, staged tasks, and short conclusions.
- Create a small "aha" moment. The first interaction should reveal a consequence, tradeoff, contradiction, or before/after change the reader can feel.
- Keep visual state and text state synchronized. If the model changes, labels, result prose, counts, and exports change too.
- Layer complexity. Default view is simple; details appear on click, focus, hover, or an "advanced" toggle.
- Make the important things inspectable. Nodes, bars, dots, edges, steps, and formulas should reveal values, rationale, or source links.

## Research Anchors

- Bret Victor: reactive documents, active reading, editable assumptions, consequences that update immediately.
- Nicky Case: concrete play first, game-like progression, surprising system behavior before theory.
- Setosa: live diagrams with drag/hover controls and explanatory text synchronized to visual state.
- Distill: composable visual building blocks, drill-down, human-scale representations for complex systems.
- Scrollytelling/data journalism: staged narrative where scroll or step controls transform one persistent visual.
- Single-file HTML workflow: inline CSS/JS, portable artifact, CDN libraries only when their value beats native SVG/JS.

## Medium Decision

Use each medium for the thing it explains best:

| Need | Best Medium |
| --- | --- |
| Abstract principle | Short prose, analogy, glossary |
| Spatial relationship | SVG map, graph, architecture diagram |
| Process over time | Timeline, animation, scrollytelling, stepper |
| Model with variables | Reactive sliders, checkboxes, formulas, chart |
| Classification | Checklist, decision tree, lane chart, export prompt |
| Dense data | Chart with hover/focus inspection |
| User workflow | Simulator with sample inputs and next-step export |

## Required Shape

For an explorable artifact, include:

1. Concrete hook: a sample case or direct manipulation before long explanation.
2. Primary visual model: usually inline SVG; use D3/Chart.js only when the charting complexity justifies CDN use.
3. Reactive controls: sliders, toggles, checkboxes, sample selector, path picker, editable prompt, or drag behavior.
4. Synchronized explanation: nearby text updates from the same state object as the visual.
5. Inspectable details: click/focus/hover surfaces for exact values, formulas, source files, or rationale.
6. Progressive disclosure: simple path first, advanced layers behind controls or staged sections.
7. Export: copy as markdown, JSON, prompt, or CSV so the changed state returns to the user's workflow.

## First Viewport Contract

The first viewport should feel like a lab bench, game board, simulator, or instrument panel. It should not feel like a landing page.

Include:
- A one-sentence mission: "Try to get this request ready to build", "Move points until the axis flips", "Choose risks and watch the lane change".
- A preloaded sample state with controls already visible.
- The SVG/chart/model beside or above the controls.
- A result label that changes immediately.
- A small "why this changed" explanation tied to the current state.

Avoid in the first viewport:
- Giant hero text before the interaction.
- Fact strips that summarize before the reader has played.
- Static preview boards that only describe the process.
- Long source maps or documentation navigation before the model.

## Exemplar Recipes

Choose one explicit recipe before building:

### Nicky Case Style: Playable Mini-System
- User goal: make a simple system succeed or fail.
- Model: game board, score, state machine, or agent grid.
- Interaction: drag, click, replay, or choose strategy.
- Aha: local choices create surprising global outcome.
- Best for: social dynamics, workflow behavior, incentives, failure modes.

### Setosa Style: Manipulable Diagram
- User goal: adjust an input and see the model recalculate.
- Model: SVG chart, graph, state machine, or visual formula.
- Interaction: sliders, draggable points, hover inspection.
- Aha: the diagram visibly changes with the assumption.
- Best for: math, classification, architecture flows, risk models.

### Distill Style: Layered Drilldown
- User goal: click parts of a complex system and understand one layer at a time.
- Model: overview graph with selectable nodes and detail panels.
- Interaction: click-to-highlight, hover-to-inspect, advanced toggle.
- Aha: complexity becomes a set of inspectable building blocks.
- Best for: codebases, ML/AI systems, platform architecture.

### Scrollytelling Style: Guided Transformation
- User goal: follow a short sequence where one persistent visual changes.
- Model: sticky SVG/chart with step panels.
- Interaction: scroll or step buttons.
- Aha: each step transforms the same model, preserving orientation.
- Best for: timelines, incidents, migrations, before/after narratives.

### Reactive Document Style: Assumption Workbench
- User goal: change assumptions and see conclusions update.
- Model: formulas, chart, prose claims, output summary.
- Interaction: scrub numbers, sliders, toggles.
- Aha: conclusions depend on assumptions the reader can see and test.
- Best for: policies, estimates, plans, tradeoffs, budgets.

## Pattern Menu

- Slider-driven chart: one assumption changes bars, lines, labels, and conclusion.
- Drag-to-simulate: user moves objects or points, then sees system-level behavior emerge.
- Scroll stepper: sticky SVG changes as short narrative panels enter view.
- Hover-to-inspect: reveal calculations, metadata, or source links without clutter.
- Click-to-drill-down: selected node expands side-panel details and highlights related edges.
- Reactive text: scrub or edit values in prose and update dependent text/charts.
- Game-as-explainer: small rules, score/state, and a surprising outcome before theory.
- Prompt/workflow simulator: sample prompt -> classification -> artifacts/proof -> copy-ready next prompt.

## Quality Gate

Before finishing, verify:

- The first meaningful action is possible within 10-30 seconds.
- The first viewport contains the interactive model, not only a hero or article intro.
- The core idea is visible without reading every section.
- At least one SVG/chart/graph/simulation changes state from user input.
- Changed state updates visual marks, labels, prose, and export output together.
- Important marks are inspectable by pointer and keyboard/focus where practical.
- The default path is non-technical; jargon appears only after intuition.
- There is an authored mission, preset, or challenge. The reader is not left in an empty sandbox.
- The artifact creates an "aha" moment by revealing a consequence, tradeoff, or naive-path failure.
- Static screenshot still communicates the model, while interaction deepens it.
- Mobile/touch users can operate the core controls.

## Avoid

- A beautiful article with cards but no model to manipulate.
- Decorative SVG that does not encode real meaning.
- Tabs that only swap prose.
- A generic dashboard unrelated to the learning problem.
- Unguided sandboxes that force the reader to invent the lesson.
