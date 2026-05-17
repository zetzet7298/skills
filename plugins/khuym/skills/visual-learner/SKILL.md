---
name: visual-learner
description: Create beautiful self-contained explorable HTML learning artifacts for non-technical explainers, diagrams, walkthroughs, reports, comparisons, codebase tours, study guides, and lightweight interactive playgrounds. Use when spatial layout, reactive SVG/charts, progressive disclosure, or interaction would teach better than markdown. Stay in chat for short answers, code-only replies, command output, or disposable summaries.
metadata:
  dependencies: []
---

# Visual Learner

Use this skill to turn complex material into something the user can see, scan, manipulate, and revisit. Prefer a single self-contained HTML file when the learning problem has structure: flows, comparisons, timelines, system maps, state changes, lifecycle phases, diagrams, examples, or interactive parameters.

Beauty is part of the learning surface, not decoration. But the pass condition is understanding: the artifact should let the user test a mental model, see consequences, and leave with a reusable next step.

For non-technical, intuitive, "start using", or "help me understand" requests, start with a concrete interaction before theory. The first viewport should be the explorable model itself, not a hero/article intro. Prefer an inline SVG diagram, graph, map, timeline, chart, or state machine with clickable/highlightable nodes, plus controls that let the user try a sample, select a path, toggle assumptions, or see how an input changes the result.

This skill is adapted from the Apache-2.0 `html-artifacts` skill by Greg/dogum, refocused for Codex learning and codebase comprehension.

## Decision

Create an HTML learning artifact when at least one is true:

- The answer needs a diagram, map, timeline, side-by-side comparison, or before/after view.
- The user is trying to understand a system, code path, document, feature, incident, or tradeoff.
- The material would be easier with progressive disclosure: tabs, collapsibles, hover notes, glossary, or anchored sections.
- The user can learn by touching it: sliders, toggles, clickable steps, draggable order, live preview, animation replay.
- The artifact is likely to be shared, kept, or handed to another person or agent.
- The markdown version would exceed roughly 100 lines or force the reader to mentally compare distant sections.

Stay in markdown when the answer is short, terminal-like, code-only, or intentionally lightweight.

## Artifact Rules

Every visual learning artifact must be:

- A single `.html` file with inline CSS and JS unless the user explicitly asks for another format.
- Offline-capable by default: no required network calls at view time.
- Responsive with `<meta name="viewport" content="width=device-width, initial-scale=1">`.
- Purpose-built for the learning task, not a generic dashboard.
- Structured visually: comparisons use columns/tables, flows use diagrams, timelines look like timelines, code paths use maps/traces.
- Visually intentional: choose an aesthetic direction, typography, palette, and composition that support the subject instead of falling back to generic cards.
- Cognitively interactive when the user needs intuition: include a simulator, classifier, decision tree, graph, chart, checklist, live preview, or SVG model that changes state.
- Synchronized: when controls change, update the SVG/chart, labels, result text, and export together.
- Inspectable: important nodes, bars, dots, edges, or steps reveal details on click, focus, or hover.
- Mission-led: give the reader a 10-30 second task with a visible outcome before asking them to read concepts.
- Surprising or corrective when possible: show what goes wrong in the naive/default path, then let the reader fix it.
- Readable within five seconds: title, one-sentence frame, then the learning surface.
- Exportable when interactive. If the user changes state, include "copy as markdown", "copy as JSON", "copy as prompt", or another round-trip output.

## Workflow

1. Identify the learning shape: explorable explanation, concept explainer, codebase walkthrough, comparison, diagram, report, deck, or editor.
2. Read only the matching reference files below.
3. Inspect source material before drawing conclusions. For repo/code explainers, trace real files and link to them.
4. Choose the concrete interaction, reader mission, visual model, and visual direction before writing prose.
5. Save the artifact in the working directory with a descriptive kebab-case `.html` name.
6. Verify the core interaction: controls change visual state, explanatory text, and export output; then verify the file opens or at least validate basic HTML structure when practical.
7. Tell the user the path and summarize what the artifact covers.

## Reference Guide

- Concept explainers, reports, learning guides: read `references/learning-artifacts.md`.
- Explorable explanations and interactive article patterns: read `references/explorable-explanations.md`.
- Codebase tours, PR/code reviews, module maps: read `references/codebase-walkthroughs.md`.
- Flowcharts, architecture maps, SVG figures: read `references/diagrams.md`.
- One-off editors, tuners, playgrounds: read `references/interactive-editors.md`.
- Visual taste, typography, and source-project style matching: read `references/visual-style.md`.

If a task spans multiple shapes, read multiple references. Keep the main file focused on the actual deliverable, not on explaining the design choices.
