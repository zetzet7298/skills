# Teaching Game Patterns

Use this map to turn a topic into a playable model. Pick the mechanic that makes
the concept's real structure visible.

## Pattern Map

| Topic shape | Good game shape | Player verbs | What must be visible |
| --- | --- | --- | --- |
| Feedback loops or emergent systems | Sandbox simulation or management game | tune, release, route, contain | local rules causing global outcomes |
| Algorithms or protocols | Step puzzle, robot programmer, routing game | order, branch, optimize, debug | trace, invariants, failure point |
| Probability or statistics | Forecasting game, risk table, experiment runner | bet, sample, predict, compare | distribution, variance, base rate |
| Economics or incentives | Market, negotiation, resource-allocation game | trade, price, cooperate, defect | incentives, payoff matrix, externalities |
| Security, ops, or debugging | Incident-room detective game | inspect, isolate, patch, prioritize | evidence trail, blast radius, tradeoff |
| Workflows or tutorials | Workshop, assembly line, or mission sequence | assemble, choose, validate, ship | prerequisites, handoffs, checkpoints |
| Math formulas or parameters | Tuning challenge with live graph or gauges | adjust, balance, minimize, maximize | formula terms, sensitivity, constraints |
| Mental models or frameworks | Scenario board with branching consequences | classify, diagnose, decide, reflect | criteria, edge cases, outcome deltas |
| Social dynamics or trust | Repeated-interaction strategy game | cooperate, punish, forgive, signal | memory, reputation, long-run payoff |
| Programming concepts | Build-a-machine or live-state puzzle | compose, execute, refactor, test | state changes, errors, control flow |

## Anti-Patterns

- Multiple-choice quiz with badges only.
- Avatar, map, or points that do not affect the concept model.
- Lore that explains less than a clean diagram would.
- Long tutorial before the first action.
- Levels that add content but not a new rule, constraint, or insight.
- Randomness without a replay, seed, trace, or explanation path.

## Level Shape

Use this progression when unsure:

1. **Intuition round:** one action, immediate visible consequence.
2. **Constraint round:** add the rule that makes the naive solution fail.
3. **Transfer round:** same concept in a different surface or scenario.
4. **Pressure round:** add time, limited resources, competing objectives, or
   incomplete information.
5. **Reflection round:** replay, compare strategies, and show the named concept.

## Game Studio Brief Hints

- For most 2D teaching games, ask Game Studio for Phaser with a DOM HUD.
- For spatial systems, grids, routing, or agents, prefer Phaser scenes with
  inspectable cells, entities, or paths.
- For parameter-heavy concepts, pair the game board with a compact live chart or
  gauge in the HUD.
- For 3D concepts, use Three.js only when depth, geometry, lighting, or embodied
  navigation carries the lesson.
