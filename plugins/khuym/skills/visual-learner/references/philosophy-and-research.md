# Philosophy And Research

Use this reference to reason about pedagogy, concept selection, and memory impact.

## Core Principle

Interactive explainers work when the reader can manipulate a model and compare expectation against outcome. They are strongest for systems, processes, tradeoffs, formulas, networks, simulations, and arguments whose claims depend on visible assumptions.

The goal is not to decorate an explanation. The goal is to externalize the mental model so the reader can poke it, break it, repair it, and remember it.

## Explorable Explanation Model

Bret Victor's explorable explanations frame reading as active inquiry: assertions become visible and editable models, calculations are inspectable, and related context appears when needed. Use three complementary moves:

- **Reactive document**: expose assumptions and computed consequences.
- **Explorable example**: make an abstract rule concrete through manipulation.
- **Contextual information**: reveal definitions, formulas, and caveats only when the reader needs them.

Official source: https://worrydream.com/ExplorableExplanations/

## Concrete Before Abstract

Open with a physical or game-like interaction before formal language. For a math topic, let the reader drag points or change parameters before naming the theorem. For a systems topic, let the reader trigger the loop before diagramming it. For an ethics, economics, or strategy topic, let the reader make a choice and see consequences before giving theory.

The first viewport should be a lab bench, not a cover page. A short title and mission are fine, but the dominant object should be the working model: a board, graph, simulator, trace, manipulative diagram, or game state.

## Load-Bearing Interactivity

Interactivity is load-bearing when it changes what the reader understands. It is decorative when it only changes presentation.

Load-bearing examples:

- Scenario changes alter model assumptions and visibly move outcomes.
- Dragging a point changes a formula, boundary, path, or classification.
- Clicking a node reveals why adjacent nodes react.
- Playing a round creates a result that demonstrates the principle.
- Hovering a mark reveals the exact local rule, value, evidence, or source.
- Reset and replay let the reader compare alternate paths.

Decorative examples:

- Tabs that only swap paragraphs.
- Buttons that change a headline but not the model.
- Cards that look clickable but reveal generic prose.
- Animated shapes that do not encode state.
- Scores or percentages with hidden invented formulas.

Use a decorative interaction only if it supports navigation around a stronger load-bearing model.

Representative examples:

- Parable of the Polygons: https://ncase.me/polygons/
- The Evolution of Trust: https://ncase.me/trust/
- Simulating the World in Emoji: https://ncase.me/simulating/
- Explained Visually: https://setosa.io/ev/
- Seeing Theory: https://seeing-theory.brown.edu/
- Distill: https://distill.pub/

## Memory And Comprehension Heuristics

- **Prediction first**: ask the reader to guess, then reveal the model behavior.
- **Immediate feedback**: update the view within the same interaction frame.
- **Embodied mapping**: use position, size, motion, color, or collision to encode the concept's real structure.
- **Small surprise**: reveal one counterintuitive result early.
- **Repeatable play**: allow reset, randomize, replay, and compare.
- **Progressive names**: introduce terminology after the reader has seen the behavior.
- **Inspectable assumptions**: make formulas, rules, or source evidence visible on demand.
- **Consequence over description**: show what changes when the reader acts, then explain why.

## Toy Models And Truthfulness

Many explainers need simplified numbers. That is fine when the artifact is honest:

- Call it a toy model, sketch model, or illustrative model.
- Expose the formula or local rules.
- Avoid precise-looking claims that imply measurement without data.
- Let the reader change assumptions and see how fragile or robust the takeaway is.
- Distinguish measured facts from teaching estimates.

## When Not To Make It Interactive

Do not force interaction for pure definitions, lists, legal text, or topics where the main challenge is not causal, spatial, temporal, quantitative, procedural, or comparative. In those cases, use a visual map, annotated diagram, table, or short static storyboard.

## Research Notes

Prefer primary and official sources for facts:

- Official docs for libraries and APIs.
- Academic papers or original essays for pedagogy and visualization theory.
- Source-open examples when deriving implementation patterns.
- Current web research for changing libraries, browser APIs, model capabilities, and contemporary examples.

Carry citations into the final response when browsing was used.
