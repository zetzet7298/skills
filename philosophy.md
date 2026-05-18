# Interactive HTML Visual Explainers: A Comprehensive Research Reference

## Executive Summary

The internet has developed a rich ecosystem of interactive HTML-based concept explainers that surpass static markdown or text in comprehension, retention, and engagement. This research identifies and categorizes the best real-world examples, examines the underlying techniques, patterns, and tools used to build them, and maps out a reference base for designing a "Visual Learner Skill" — a system capable of producing interactive HTML visualizations from any topic description. The field spans from academic "explorable explanations" to data journalism, interactive AI tools, and LLM-generated single-file apps.

***

## The Core Philosophy: Explorable Explanations

The movement toward interactive HTML learning was crystallized by Bret Victor's 2011 essay *Explorable Explanations*, which argued that text should not be consumed passively but used as *an environment to think in*. Victor distinguished three complementary approaches:[1]

- **Reactive documents** — readers adjust assumptions and see consequences update immediately (like a live spreadsheet)
- **Explorable examples** — abstract concepts made concrete through direct manipulation
- **Contextual information** — just-in-time supporting knowledge, not front-loaded exposition

Victor argued that interactivity is most powerful for explaining *processes, systems, and models* — not every concept. Text explains abstract ideas; graphs show broad relationships; animations show temporal change; interactives reveal how systems behave. This four-category framework is the most practical design filter for deciding *when* to use each medium in a visual explainer.[2]

Nicky Case, one of the most prolific practitioners of this tradition, elaborates further: always "start on the ground" — give the reader a concrete interactive experience *before* any theory. In *Parable of the Polygons*, you drag shapes before learning about segregation theory. In *The Evolution of Trust*, you play a game before learning game theory.[3][4]

The hub for this movement is **explorabl.es**, which catalogs over 180 explorable explanations across math, science, social systems, and computer science. The corresponding curated GitHub list `awesome-explorables` identifies the most notable authors: Bret Victor, Nicky Case, Vi Hart, Dan Shiffman, and William Fenton.[5][6]

***

## Hall of Fame: Real-World Interactive HTML Examples

These are the most studied, linked, and source-open exemplars of interactive HTML visual explainers on the internet:

### Nicky Case's Explorable Explanations

**The Parable of the Polygons** (`ncase.me/polygons`) is perhaps the most referenced interactive HTML explainer ever built. It teaches how small individual preferences about neighbors can cause large-scale societal segregation, purely through drag-and-drop simulation. The full source is public domain (CC0), making it an ideal reference for code patterns. Its key mechanics: draggable shapes, real-time satisfaction counters, and a progressive narrative that gates new mechanics behind user understanding.[7]

**The Evolution of Trust** (`ncase.me/trust`) teaches game theory through an interactive prisoner's dilemma tournament. The reader *plays* against each strategy before the theory is explained. Structured as a series of vignettes, each unlocking a new rule. Open-source on GitHub. It demonstrates: character animation with CSS, per-chapter unlocking (cognitive gating), and a narrative that adapts based on the reader's score.[4][8]

**Simulating the World in Emoji** (`ncase.me/simulating`) demonstrates agent-based emergent behavior (wildfire models, predator-prey cycles) where readers adjust sliders and observe that intuitive predictions are usually wrong. This is one of the purest implementations of the "play first, theory second" principle.[9]

### Setosa.io: Explained Visually

**Setosa.io** (`setosa.io/ev/`) describes itself as "an experiment in making hard ideas intuitive" directly inspired by Bret Victor. Its visualizations are built with D3.js and AngularJS. Key examples:[10]

- **Principal Component Analysis** (`setosa.io/ev/principal-component-analysis/`) — users drag data points and watch live PCA axes recalculate. Praised as the best interactive PCA demo on the internet.[11]
- **Image Kernels** (`setosa.io/ev/image-kernels/`) — hover over any pixel to see the convolution computation live, across blur/sharpen/edge-detect kernels. Directly applicable to explaining CNNs.[12]
- **Markov Chains** (`setosa.io/ev/markov-chains/`) — animated balls traverse a state machine whose transition probabilities the reader controls. Victor Powell and Lewis Lehe are the authors.[13]
- **Conditional Probability** (`setosa.io/ev/conditional-probability/`) — balls drop through shelves and the reader drags shelves to change P(A), P(B), and P(A∩B), with all formulas updating live.[14]

All Setosa examples combine: an animated simulation, draggable/interactive parameters, and a flowing text explanation that stays synchronized with the visual state.

### Distill.pub: Interactive ML Research

**Distill.pub** is an academic journal entirely dedicated to interactive, visual explanations of machine learning. Every article is an HTML page with live demos. Key examples:[15]

- **Feature Visualization** — hoverable activation grids that reveal what neurons "see"[16]
- **The Building Blocks of Interpretability** — click any neuron to see attribution flow through a neural net[17]
- **Exploring Neural Networks with Activation Atlases** — millions of activations projected into a browsable 2D map[15]
- **Grand Tour** — a live animated high-dimensional data projector[18]

Distill's pattern: embed a live Python/JavaScript model directly in the browser, then use interactive controls to let readers probe its behavior. The text narrates what the reader is seeing.

### Transformer Explainer & AnimatedLLM

**Transformer Explainer** (described at HuggingFace) runs a live GPT-2 model in the browser — readers type text and watch attention heads, feed-forward activations, and token probabilities update in real-time. This is the gold standard for "visual LLM onboarding."[19]

**AnimatedLLM** (`animatedllm.github.io`) provides step-by-step animated visualizations of LLM internals (tokenization, prediction, training) using pre-computed traces. Runs entirely client-side with no server dependency. It occupies a "pedagogically interesting" middle ground between raw matrix operations and the opaque chat interface.[20]

### Jay Alammar: The Illustrated Series

Jay Alammar's **Illustrated Transformer** (`jalammar.github.io/illustrated-transformer/`) uses carefully crafted static SVG diagrams with embedded GIF animations to explain attention mechanisms step-by-step. While not fully interactive, it demonstrates that well-sequenced animated SVGs with clear annotations can explain extraordinarily complex topics (multi-head attention, positional encoding) to non-experts.[21]

### Pudding.cool & Scrollytelling

**The Pudding** (`pudding.cool`) publishes "visual essays" — scrollytelling data journalism that uses D3.js charts triggered by scroll position. As the reader scrolls, charts animate, highlight, or transform to follow the narrative. The Pudding's technical stack: vanilla JS/D3, Intersection Observer API for scroll triggers, and mobile-first responsive design. They have published their scrollytelling methodology openly.[22][23]

Key examples from broader data journalism:[24]
- **Bloomberg's Heat Map** — interactive city maps for climate data
- **NYT Snow Fall** — the original scrollytelling masterpiece (2012)[25]
- **Sweden Climate Panorama** — scatterplots, maps, timelines, all scroll-driven[24]

### Seeing Theory (Brown University)

**Seeing Theory** (`seeing-theory.brown.edu`) is an interactive probability and statistics textbook built entirely in D3.js and HTML. It covers basic probability, compound probability, distributions, statistical inference, and regression — each with animated, interactive experiments. It is one of the most complete academic-to-interactive-HTML conversion projects available.

***

## Anatomy of an Effective Visual Explainer

Based on analysis across these examples, effective interactive HTML explainers share a consistent set of structural patterns:

### 1. The Hook (Concrete Experience First)
Every best-in-class explainer opens with something you can *do* immediately — drag, click, type, slide — before any terminology is introduced. This is the "start on the ground" principle. The hook should be:[3]
- Achievable with zero prior knowledge
- Immediately surprising or counter-intuitive (Nicky Case's fire simulation)[9]
- Short enough to complete in 10–30 seconds

### 2. Reactive Variables & Live Formulas
Bret Victor's original "reactive document" prototype allows numbers in text to be scrubbed by clicking and dragging. When a number changes, all dependent text, charts, and conclusions update automatically. This transforms passive reading into active hypothesis testing. Implementation: Tangle.js (Victor's library) or custom `input[type=range]` sliders bound to DOM update functions.[1]

### 3. Progressive Disclosure / Cognitive Gating
Content is gated so readers cannot skip ahead past concepts they haven't engaged with. Earth A Primer won't let you proceed until you complete the assigned task. The Pudding uses scroll gates. This mirrors how textbooks sequence prerequisite knowledge, but enforces it interactively.[2]

### 4. Synchronized Text + Visual State
The explanatory text and the visualization always reflect the same state. When a slider changes, both the chart AND the prose label update. This eliminates the "look here, now look here" friction of traditional documents. Idyll formalized this as a "reactive variable" system in its markup language.[26]

### 5. Tooltips & Hover-Reveal
Every visible data point should show its exact value, formula, or explanation on hover. Setosa's image kernel demo is the canonical example: hovering any pixel shows the full convolution arithmetic. This provides infinite depth without cluttering the main view.[12]

### 6. Layered Complexity (Simple → Detailed View)
AnimatedLLM explicitly implements "simple view" and "detailed view" for each component. Distill's Building Blocks lets users click to drill deeper into any layer of a neural net. The default view is always comprehensible; the detailed view rewards curiosity.[17][20]

***

## Technical Stack Reference

### Visualization Libraries

| Library | Best For | Complexity | CDN-Loadable |
|---------|----------|------------|--------------|
| **D3.js** (`d3js.org`) | Custom SVG charts, force graphs, maps, animated transitions | High | Yes |
| **Observable Plot** | Fast declarative charts on top of D3 | Medium | Yes (ESM) |
| **Chart.js** | Standard bar/line/pie charts, quick setup | Low | Yes |
| **Plotly.js** | Scientific charts, 3D, statistical plots | Medium | Yes |
| **Vega-Lite** | Grammar-of-graphics declarative charts | Medium | Yes |
| **SVG + vanilla JS** | Custom diagrams, node graphs, flow charts | Medium | Native |
| **CSS animations** | State transitions, hover effects, loading states | Low | Native |
| **Canvas API** | Particle systems, real-time simulations | High | Native |

D3.js remains the dominant tool for bespoke interactive visualizations. The D3 gallery on Observable contains 160+ forkable examples including animated treemaps, collapsible trees, zoomable sunbursts, bar chart races, and force-directed graphs. The vanilla JS conversion of the D3 gallery makes every example runnable without Observable's notebook environment.[27][28][29]

### Authoring Tools (Low-Code)

| Tool | Approach | Output |
|------|----------|--------|
| **Idyll** (`idyll-lang.org`) | Markdown-like syntax with reactive variables | Compiled HTML/JS bundle[26] |
| **Observable Notebooks** | Cell-based reactive notebooks, D3-first | Published web page[27] |
| **Datawrapper River** | No-code chart builder with open editor | Embeddable chart[30] |
| **Tangle.js** | Reactive inline text variables | Vanilla JS[1] |

**Idyll** is particularly relevant for the visual learner skill concept: it compiles a markdown-like syntax with embedded interactive components into a full HTML page. It was designed specifically for "reducing the effort required to create interactive articles".[31][26]

### The Single-File HTML Pattern

A key finding for LLM-generated explainers is the **single-file HTML pattern**, popularized by Simon Willison (150+ tools built) and endorsed by Andrej Karpathy:[32][33]

- All CSS, JavaScript, and HTML in one `.html` file
- No build step, no React, no npm
- Dependencies loaded from CDN (jsDelivr, cdnjs)
- Portable: copy-paste into any repo, host on GitHub Pages instantly[34]
- LLMs can generate and iterate on these in one shot

Karpathy's viral May 2026 advice: append `"structure your response as HTML"` to any LLM prompt, save as `.html`, open in browser. The result: clean layouts, collapsible accordions, embedded charts, color-coded sections, dark/light mode — all without any extra tooling. He explicitly describes HTML as the preferred *output* format for AI responses, predicting a shift from markdown toward visual, interactive formats.[35][32]

***

## Design Patterns Taxonomy

### Pattern 1: Slider-Driven Chart
**What it is**: An `input[type=range]` slider controls a parameter; a chart redraws on every `input` event.
**Best for**: Showing how a mathematical model responds to a single variable (e.g., Markov chain transition probability).
**Example**: Setosa Markov Chains[13]
**Implementation**: Bind slider's `oninput` to a `redraw()` function that updates SVG paths or bar heights.

### Pattern 2: Drag-to-Simulate
**What it is**: User drags objects on a canvas; simulation state updates in real-time.
**Best for**: Social systems, physics, agent-based models.
**Example**: Nicky Case's Parable of the Polygons[7]
**Implementation**: D3.js drag behavior + force simulation, or canvas mouse events.

### Pattern 3: Scroll-Triggered Narrative (Scrollytelling)
**What it is**: A fixed visualization changes state as the user scrolls through text panels.
**Best for**: Data journalism, multi-step explanations with a storyline.
**Example**: The Pudding essays[22]
**Implementation**: Intersection Observer API to detect when text panels enter viewport, trigger chart state changes.

### Pattern 4: Hover-to-Inspect
**What it is**: Hovering a visual element reveals its internal calculation or metadata.
**Best for**: Dense visualizations (CNN kernels, attention maps, heat maps).
**Example**: Setosa Image Kernels[12]
**Implementation**: SVG `mouseover` events + positioned `<div>` tooltip with `position:fixed`.

### Pattern 5: Click-to-Drill-Down
**What it is**: Clicking an element expands it into a deeper view; clicking again collapses.
**Best for**: Hierarchical data, neural network layers, multi-level concepts.
**Example**: Distill Building Blocks[17]
**Implementation**: D3 zoom transitions or CSS `details/summary` elements for simple cases.

### Pattern 6: Live Code + Output
**What it is**: User types or edits code/parameters in a text area; output renders instantly.
**Best for**: Teaching programming concepts, regex, algorithms.
**Example**: Observable notebooks[27]
**Implementation**: `<textarea>` with `oninput` event + eval/sandboxed execution, or Pyodide for Python.[33]

### Pattern 7: Reactive Text (Tangle-style)
**What it is**: Numbers in prose are directly scrubable — drag left/right on a number to change it; all dependent text and charts update.
**Best for**: Policy documents, financial models, scientific claims where assumptions drive conclusions.
**Example**: Bret Victor's Ten Brighter Ideas[1]
**Implementation**: Custom span elements with mousedown drag listeners and CSS cursor styling.

### Pattern 8: Game-as-Explainer
**What it is**: The entire explainer is structured as a game with win/lose states; theory emerges from gameplay.
**Best for**: Social dynamics, strategy, game theory, economics.
**Example**: The Evolution of Trust[4]
**Implementation**: State machine (chapter progression), score tracking, character animation with CSS transforms.

***

## LLM-Generated HTML Explainers: The Emerging Workflow

The most significant recent development is that modern LLMs can generate high-quality single-file interactive HTML explainers in one shot. The workflow:

1. **Prompt** the LLM to produce a single `.html` file explaining a concept, with interactive elements and no external dependencies except CDN-loaded libraries
2. **Save** the output as `concept.html`
3. **Open** in browser — fully portable, no setup[32][34]

Simon Willison's 150+ HTML tools demonstrate that this approach scales: LLMs (especially Claude and GPT-4 class) can produce working Chart.js, D3.js, or plain SVG visualizations embedded in explanatory text. Key prompt constraints that improve output quality:[33]
- "No React, no build step"
- "All CSS and JS inline, single file"
- "Load [library] from CDN"
- "Include interactive sliders / hover tooltips / animated transitions"
- "Progressive disclosure: simple view by default, advanced view on click"

The Taivo Pungas writeup demonstrates a full LLM-assisted single-file app workflow with Claude, noting that the approach is "addictive" and produces working prototypes in minutes, though global state management degrades for very complex apps.[34]

***

## Key Design Principles for a Visual Learner Skill

Drawing from all sources, these are the non-negotiable principles for generating effective HTML visual explainers:

**1. Start concrete, end abstract.** Open with an interaction, not a definition. The user should *do* something before they *read* anything.[3]

**2. Use the right medium for each idea.** Text for abstract concepts. SVG graphs for spatial relationships. Animation for processes over time. Interactives for systems with feedback loops.[2]

**3. Synchronize text and visualization state.** Any number that appears in prose should be reflected in the chart. Any slider that changes a chart should update nearby labels.[1]

**4. Layer complexity.** Default view is always intelligible. Advanced view requires user action to reveal.[36][20]

**5. Make every data point inspectable.** Every bar, dot, or node should show its exact value on hover.[12]

**6. Gate knowledge progressively.** Don't show chapter 3 mechanics until chapter 2 is understood.[2]

**7. Keep it self-contained.** Single file, CDN dependencies, no server. This maximizes portability and LLM generatability.[34][33]

**8. Mobile-aware from the start.** Avoid `vh` units for scrollytelling; test touch interactions; use device detection for adaptive layouts.[23]

***

## Resources and Starting Points

| Resource | Type | URL |
|----------|------|-----|
| D3 Observable Gallery | 160+ forkable examples | `observablehq.com/@d3/gallery`[27] |
| D3 Graph Gallery | Chart templates with code | `d3-graph-gallery.com`[37] |
| D3 Gallery (Vanilla JS) | Observable examples converted to plain JS | `takanori-fujiwara.github.io/d3-gallery-javascript/`[29] |
| explorabl.es | Hub of 180+ explorable explanations | `explorabl.es`[5] |
| awesome-explorables | Curated GitHub list | `github.com/blob42/awesome-explorables`[6] |
| Setosa Explained Visually | Statistics/ML interactives | `setosa.io/ev/`[38] |
| Distill.pub | Interactive ML research articles | `distill.pub`[15] |
| Simon Willison's HTML Tools | 150+ LLM-generated single-file tools | `tools.simonwillison.net`[33] |
| Idyll Language | Compile-to-web interactive articles | `idyll-lang.org`[39] |
| Seeing Theory | Interactive probability textbook | `seeing-theory.brown.edu` |
| AnimatedLLM | Interactive LLM visualization | `animatedllm.github.io`[20] |
| Transformer Explainer | Live GPT-2 browser demo | HuggingFace[19] |
| ncase.me | All of Nicky Case's explorable explanations | `ncase.me`[40] |
| Worrydream | Bret Victor's canonical essays + demos | `worrydream.com`[41] |
| Pudding.cool | Scrollytelling visual essays | `pudding.cool`[22] |
