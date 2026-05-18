# HTML Artifact Contract

Use this checklist before and after implementation.

## File Shape

- Produce a named `.html` artifact unless the user requests another format.
- Keep HTML, CSS, and JS in one file by default.
- Use a clear document title and a first-screen interactive surface.
- Include no build step.
- Keep external dependencies limited to CDN scripts or styles that are justified by the topic.

## Structure

Recommended sections:

1. Interactive hook: the reader can act immediately.
2. Model surface: chart, simulation, game board, diagram, or trace.
3. Controls: sliders, buttons, toggles, presets, stepper, or input.
4. State-linked explanation: labels and text update with the model.
5. Detail layer: formula, local rule, source, or advanced view.
6. Takeaway: concise statement grounded in what the reader just did.

The first viewport should contain items 1-4. Do not place the main model below a hero unless the hero itself is the model.

## Implementation Standards

- Use a single `state` object for interactive variables.
- Use one `render()` function or small named render functions that all read from state.
- Keep formulas in named helper functions.
- Avoid magic numbers when they encode a conceptual rule.
- Use CSS custom properties for colors and spacing.
- Keep labels inside stable containers; avoid text overlap at narrow widths.
- Add reset and example presets when the model has many possible states.
- Make presets write into the same state variables as manual controls.
- Keep model calculations separate from rendering so assumptions can be inspected and changed.
- If model values are illustrative, add visible text such as "toy model" and expose the formula.

## Visual Standards

- Map color, shape, motion, and position to meaning.
- Use annotation labels near the visual elements they explain.
- Make control labels concrete, such as `Bias threshold` instead of `Parameter A`.
- Use restrained palettes with enough contrast; do not rely only on hue.
- Avoid decorative blobs, vague gradients, or stock-like imagery unless they support the topic.
- Avoid card grids when a graph, flow, board, or map would teach the relationships better.
- Use generated or searched imagery only when it directly supports the learning surface; never let it push the model below the fold.

## Verification

Open the artifact in a browser or run an equivalent local check when possible.

Verify:

- The page loads without console errors.
- The visual surface is nonblank.
- Every control changes the visual state and any dependent text.
- Scenario/preset controls change model state, not only prose.
- Reset returns to a known state.
- Hover/focus/tap inspection works for the main visual elements.
- Main marks expose values, formulas, local rules, or evidence.
- Desktop and mobile widths do not overlap controls, labels, or content.
- Keyboard navigation reaches primary controls.
- Reduced-motion users are not blocked from understanding the process.

## Anti-Brochure Gate

Before finishing, answer yes to all:

- Would the artifact still be meaningfully worse if the primary controls were removed?
- Can a reader discover something by manipulating the model that is not already obvious from the prose?
- Does the first screen invite action before explanation?
- Are the most precise-looking numbers either sourced or clearly marked as illustrative?
- Is there at least one inspectable visual mark, node, state, or rule?

## Final Response

Report:

- Artifact path.
- The primary pattern used, such as simulation, small game, or reactive document.
- Verification performed.
- Sources used when browsing or topic research influenced facts.
