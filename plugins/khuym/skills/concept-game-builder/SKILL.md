---
name: concept-game-builder
description: >-
  Use when Codex should turn a concept, topic, tutorial, lesson, algorithm,
  system, workflow, or abstract idea into a playable browser game that teaches
  through interaction. Use for planning or implementing educational web games
  with the Game Studio plugin, including concept-to-mechanic translation,
  gameplay loop design, learning progression, and browser-game QA.
metadata:
  dependencies: []
---

# Concept Game Builder

Create a browser game that teaches by making the player act on the concept.
This skill owns the learning design and concept-to-game translation; Game Studio
owns engine choice, runtime implementation, assets, UI, and playtesting.

## Core Workflow

1. State the learning goal in one sentence: what should the player understand,
   predict, or do after playing?
2. Decide whether a game is the right medium. Use a game when the topic has
   decisions, constraints, feedback loops, failure states, strategy, incentives,
   sequencing, systems, or tradeoffs. If the request needs an explorable article
   more than a game, route to `visual-learner` instead.
3. Start concrete. Put a playable challenge in the first viewport before
   definitions, lectures, or long explanations.
4. Convert the concept into a playable model:
   - player verbs
   - state variables
   - rules and constraints
   - visible consequences
   - success and failure conditions
   - inspectable explanations after action
5. Use Game Studio for production planning and implementation:
   - Load `game-studio:game-studio` or `$game-studio` after the learning model is
     clear.
   - Default to a 2D Phaser route unless the user asks for 3D, Three.js, React
     Three Fiber, or a specific engine.
   - Route HUD and overlays through `game-studio:game-ui-frontend` when present.
   - Route browser QA through `game-studio:game-playtest` before calling the game
     done.
6. Build or plan the smallest complete game that teaches the topic. Prefer one
   polished core loop over many disconnected minigames.

## Game Design Contract

Define these before writing code:

- **Player mission:** a 10-30 second challenge the player can attempt with no
  prior vocabulary.
- **Learning model:** the concept's variables, rules, and relationships.
- **Misconception:** the naive idea the game should test or overturn.
- **Player verbs:** actions that map directly to the concept, such as allocate,
  route, tune, trade, predict, combine, debug, classify, or negotiate.
- **Feedback:** how the game shows consequences through motion, score, state,
  resources, failure, or changed world behavior.
- **Progression:** 3-5 levels, rounds, or scenarios that add one concept at a
  time.
- **Explanation timing:** explain after the player acts; keep text synchronized
  with the current game state.
- **Inspection path:** hover, focus, click, pause, replay, or detail panels that
  reveal the rule, formula, trace, or evidence behind the result.

## Game Studio Handoff

When handing the plan to Game Studio, include this compact brief:

```markdown
Learning goal:
Core loop:
Player verbs:
Concept model:
Progression:
UI/HUD needs:
Asset style:
Target runtime:
Playtest checks:
```

For implementation tasks, continue through Game Studio rather than inventing a
separate stack. Use its specialist routing for Phaser, Three.js, React Three
Fiber, UI, assets, and playtesting. If Game Studio is unavailable in the current
session, follow its defaults manually: 2D Phaser first, DOM HUD for menus and
learning panels, responsive controls, and browser playtest verification.

## Quality Rules

- Do not make a quiz with decorative motion and call it a game. The answer
  choices must change game state, strategy, or consequences.
- Do not hide the concept behind lore. Theme should make the model easier to
  remember, not replace the model.
- Do not front-load exposition. Let the player do something first, then name the
  concept.
- Keep the first build small enough to finish and playtest in one session.
- Make win, loss, replay, reset, and pause states explicit.
- Keep touch, keyboard, and responsive layouts viable from the start.
- Expose toy-model assumptions when the numbers are illustrative.
- Verify with an actual browser when possible; check that the game renders,
  responds to input, avoids overlapping text, and teaches the intended takeaway.

## Reference

Read [teaching-game-patterns.md](references/teaching-game-patterns.md) when
choosing mechanics for a topic or when the first concept-to-game mapping feels
too literal.
