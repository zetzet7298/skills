# Visual Style

Good visual learning artifacts are calm, legible, structured, and appealing. Beauty is not garnish here: visual quality makes the user trust the explanation, stay oriented, and remember the model.

## Taste Principles

- Pick an aesthetic direction before styling details. "Clean", "modern", and "professional" are not directions.
- Name the memorable anchor: the one visual idea the user should remember after closing the file.
- Build hierarchy in grayscale first. Size, weight, spacing, and position should carry structure; color should enhance meaning.
- Use composition as explanation. Timelines should feel sequential, maps should feel spatial, comparisons should make contrast obvious, and state machines should make transitions traceable.
- Prefer one strong learning surface over many decorative cards. If every section is a card, nothing is special.
- Match density to task: generous space for conceptual learning, controlled density for dashboards, traces, code maps, and comparison matrices.

## Direction Picker

Use the subject matter to pick one direction and execute it consistently:

| Direction | Good For | Visual Moves |
|---|---|---|
| Editorial | research summaries, product strategy, docs, essays | strong serif headings, restrained rules, generous margins, pull quotes |
| Workbench | code tours, systems, debugging, operational reports | dense panels, monospace accents, trace lines, compact controls |
| Atlas | architecture maps, dependency diagrams, workflows | spatial canvas, labeled regions, paths, legends, zoom-like hierarchy |
| Studio | design critique, creative strategy, frontend guidance | asymmetric layout, art-board framing, richer palette, before/after surfaces |
| Field Guide | study guides, taxonomy, concept learning | specimen-like cards, annotations, glossary chips, calm natural palette |
| Console | incident reports, logs, state machines, terminal-like flows | dark surface, high-contrast traces, status colors, timeline rhythm |

## Typography

Documents and explainers:
- Use a distinctive heading face from local/system stacks when possible, with a highly readable body face.
- Body text around 16-18px, line-height 1.5-1.65.
- Comfortable reading width around 60-75ch for prose.
- Wider layouts only when the content needs columns, diagrams, or tables.

Tools and editors:
- Use a crisp sans stack and reserve monospace for data, code, commands, IDs, and measured values.
- Dense but organized layout.
- Controls near the thing they affect.
- Stable dimensions so labels and dynamic state do not shift the whole UI.

Avoid defaulting to the familiar AI look: generic centered hero, purple gradient, identical rounded cards, and unexamined Inter/system-ui everywhere. Use existing project tokens when the artifact explains a real project.

## Color

Use color for meaning:
- status
- severity
- category
- selected path
- before/after
- ownership or system boundary

Use a 60-30-10 balance: dominant background/surface, secondary structure, and one assertive accent. Avoid one-note palettes, decorative gradient blobs, and default card-heavy AI dashboards. If a project has existing tokens, read them and use those instead of inventing a new style.

Design light and dark intentionally if both are present. Do not simply invert colors; verify contrast for text, labels, lines, and status marks.

## Composition

- Put the learning object above the supporting prose. The user should see the model before reading the explanation.
- Use asymmetry, scale contrast, tabs, or anchored regions when they clarify relationships.
- Keep diagram nodes stable in size; text should wrap or scale gracefully instead of expanding the whole graph.
- Put legends beside the visual they explain, not at the bottom of the page.
- Make the primary path visually louder than optional branches.
- Use whitespace as grouping. Proximity usually beats borders.

## Motion And Interaction

- Motion must explain state, sequence, feedback, or continuity.
- Prefer CSS transitions and transforms/opacity. Avoid animating layout properties.
- Respect `prefers-reduced-motion`.
- Use hover/focus states to reveal explanations, but never hide essential information behind hover only.
- If the artifact is interactive, include a round-trip export such as "copy as markdown", "copy as JSON", or "copy as prompt".

## CSS Baseline

Use this as a starting point when no project style exists. Adjust the palette and typography to the chosen direction instead of treating this as a brand.

```css
:root {
  --bg: #f7f4ee;
  --surface: #fffdf8;
  --surface-raised: #ffffff;
  --ink: #171717;
  --muted: #69645c;
  --rule: #ded7ca;
  --accent: #0f6b5f;
  --accent-ink: #ffffff;
  --ok: #247a3d;
  --warn: #a45f13;
  --danger: #b42318;
  --serif: Charter, "Iowan Old Style", "New York", Georgia, serif;
  --sans: "Avenir Next", Avenir, "Segoe UI", Helvetica, Arial, sans-serif;
  --mono: ui-monospace, "SF Mono", Menlo, monospace;
  --radius: 8px;
  --shadow: 0 18px 60px rgba(23, 23, 23, 0.10);
}
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #101113;
    --surface: #17191d;
    --surface-raised: #202329;
    --ink: #f4efe7;
    --muted: #b8b0a5;
    --rule: #34373f;
    --accent: #58c4ad;
    --accent-ink: #071310;
    --shadow: 0 18px 60px rgba(0, 0, 0, 0.35);
  }
}
```

## Polish Checks

- The artifact has a named aesthetic direction and memorable anchor.
- The core model is visible within five seconds.
- Hierarchy still works if viewed in grayscale.
- Text does not overflow buttons, labels, or diagram nodes.
- Mobile layout stacks intentionally.
- Tables remain readable on narrow screens.
- Interactive controls have visible focus states.
- Motion has a learning purpose and a reduced-motion path.
- Status colors are paired with labels or icons, never color alone.
- Corners, shadows, and borders follow one visual system.
- Print or screenshot still communicates the core idea.
