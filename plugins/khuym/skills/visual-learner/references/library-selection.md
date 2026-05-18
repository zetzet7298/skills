# Library Selection

Default to native HTML, CSS, SVG, Canvas, and JavaScript. Add a library only when it makes the artifact more reliable, expressive, or faster to build.

## Selection Matrix

| Need | Prefer | Reason |
| --- | --- | --- |
| Custom diagrams, small charts, formulas | SVG + vanilla JS | Portable, inspectable, easy to synchronize with text |
| Bespoke data visualization, force, drag, zoom, hierarchy | D3 | Low-level control over DOM, SVG, Canvas, scales, layouts, transitions, drag, zoom |
| Simple line/bar/pie/radar charts | Chart.js | Fast setup, responsive canvas charts, good defaults |
| Declarative charts from structured data | Vega-Lite | JSON grammar for interactive multi-view visualizations |
| Data science plots, 3D plots, statistical charts | Plotly.js | Rich scientific chart set and built-in interactions |
| Agent simulation or many moving objects | Canvas | Better performance for frequent redraws |
| 2D game-like rendering with sprites | PixiJS | WebGL renderer for interactive 2D scenes |
| Immersive 3D model or spatial simulation | Three.js | Standard browser 3D engine |
| Network analysis and graph interaction | Cytoscape.js | Purpose-built graph layout and interaction |
| Notebook-like reactive article | Observable/Idyll-style pattern | Useful inspiration, but prefer direct single-file output unless user asks for toolchain |

## Official Sources

- D3 overview and API: https://d3js.org/what-is-d3 and https://d3js.org/api
- D3 drag/zoom/transition: https://d3js.org/d3-drag, https://d3js.org/d3-zoom, https://d3js.org/d3-transition
- Observable Plot marks/scales: https://observablehq.com/plot/features/marks and https://observablehq.com/plot/features/scales
- Vega-Lite docs: https://vega.github.io/vega-lite/docs/
- Vega docs: https://vega.github.io/vega/docs/
- Chart.js docs: https://www.chartjs.org/docs/latest/
- Plotly.js docs: https://plotly.com/javascript/
- Three.js docs: https://threejs.org/docs/
- Cytoscape.js docs: https://js.cytoscape.org/

## Dependency Rules

- Use CDN scripts only when the artifact can still run by opening the HTML file in a browser with network access.
- Pin major versions when possible.
- Do not use React, build tooling, npm, bundlers, or app frameworks unless the user explicitly asks.
- Keep the artifact editable by a future agent: clear state object, named render functions, small pure helpers.
- If offline execution is required, avoid CDN dependencies or vendor the assets with user approval.

## Accessibility And Responsiveness

- Prefer SVG for diagrams that need labels, focus states, and accessibility.
- Prefer Canvas for dense animation, but mirror key state in accessible text.
- Use pointer events that work across mouse and touch.
- Add keyboard controls for games and simulations where practical.
- Respect `prefers-reduced-motion`; provide step controls when animation carries meaning.
