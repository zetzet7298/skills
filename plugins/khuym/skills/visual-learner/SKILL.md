---
name: visual-learner
description: Create self-contained interactive HTML visual explainers that turn difficult topics, concepts, code, math, systems, or arguments into memorable explorable artifacts. Use when Codex should research a topic, choose an interaction model, and build an artifact with simulations, diagrams, charts, sliders, hover inspection, scrollytelling, or small game mechanics so readers can explore and understand the message.
metadata:
  dependencies: []
---

# Visual Learner

Create an interactive HTML explainer that lets the reader understand by doing. Prefer a portable single-file artifact unless the user asks for a larger app. The artifact must behave like an instrument, simulator, map, or game board; a beautiful article with buttons is not enough.

## Workflow

1. Identify the learning goal in one sentence: what should the reader remember or be able to explain after the artifact?
2. Research the topic enough to avoid shallow metaphors. For current facts, libraries, APIs, laws, prices, or examples, browse primary or official sources and cite them in the final response.
3. Choose the smallest fitting explainer shape:
   - **Reactive document** for assumptions, formulas, tradeoffs, policy, finance, or scientific claims.
   - **Explorable example** for algorithms, math, physics, architecture, and causal mechanisms.
   - **Simulation** for feedback loops, emergent behavior, queues, networks, social dynamics, and probabilistic systems.
   - **Scrollytelling** for stepwise arguments, timeline narratives, or data journalism.
   - **Small game** for strategy, incentives, negotiation, memory, classification, or concepts where consequences teach better than prose.
4. Define the load-bearing model before layout: state variables, rules/formulas, reader actions, visual consequences, and the intended surprise or memory hook.
5. Design from concrete to abstract. Start with a direct interaction in the first viewport; introduce terms only after the reader has manipulated or observed the system.
6. Build the artifact. Default to one `.html` file with inline CSS and JS, no build step, and CDN dependencies only when they materially reduce risk.
7. Verify the artifact in a browser when possible. Check desktop and mobile layout, no overlapping text, meaningful interaction states, accessible labels, and nonblank visuals.
8. Final response: link the artifact path, summarize the explainer model, list verification performed, and mention any source or test gaps.

## Load-Bearing Interaction Doctrine

Every primary control must alter the concept model, not merely swap copy. A scenario choice should set assumptions, move the simulation, change the path, alter the score, reveal a different causal chain, or reframe the task with visible consequences. If an interaction can be removed without weakening understanding, remove it or make it meaningful.

Before writing CSS, specify:

- **Reader mission**: the concrete challenge the reader can try in 10-30 seconds.
- **Model state**: the few variables that represent the concept.
- **Rules**: formulas, transitions, constraints, or local rules that turn state into outcomes.
- **Visual encoding**: how state changes position, motion, size, color, topology, labels, or score.
- **Inspection path**: how the reader sees the formula, rule, local detail, or evidence behind a mark.
- **Takeaway trigger**: the moment where the reader sees why the naive mental model fails or becomes incomplete.

## Artifact Requirements

- Include a visible interactive surface, not only explanatory prose.
- Keep prose synchronized with state: sliders, choices, and simulation results must update labels, formulas, annotations, or conclusions.
- Make important visual elements inspectable with hover, focus, click, or touch-friendly detail panels.
- Layer complexity: default view must be easy; advanced details require a deliberate reader action.
- Use stable responsive dimensions for canvases, SVGs, boards, charts, controls, and counters.
- Prefer semantic HTML controls (`button`, `input`, `select`, `details`) and keyboard-reachable interactions.
- Avoid decorative-only graphics. Every visual should reveal structure, motion, contrast, consequence, or state.
- Make the final message explicit inside the artifact through the experience, not through a long conclusion.
- Label illustrative models honestly. If numbers are invented for teaching, call them a toy model and expose the formula or assumptions.
- Put the main model, game, simulator, or manipulative diagram in the first viewport. Avoid hero-first layouts unless the hero itself is the interactive learning surface.
- Include a reset, preset, or replay path when the model has state.
- Use generated notes, exports, or summaries only after the reader has interacted with the model; they are outcomes, not the core explainer.

## Reference Map

- Read [philosophy-and-research.md](references/philosophy-and-research.md) when choosing pedagogy or explaining why interactivity fits.
- Read [pattern-catalog.md](references/pattern-catalog.md) to choose mechanics and interaction patterns.
- Read [library-selection.md](references/library-selection.md) before selecting D3, SVG, Canvas, Chart.js, Vega-Lite, Plotly, Three.js, or no library.
- Read [html-artifact-contract.md](references/html-artifact-contract.md) before implementation and again for verification.

## Quality Bar

Treat the artifact as a learning instrument. A good result has a surprising concrete experience, a small set of meaningful controls, a clear causal model, inspectable assumptions, and a remembered takeaway. If the topic cannot benefit from interaction, say so and produce the strongest visual/static explanation instead.
