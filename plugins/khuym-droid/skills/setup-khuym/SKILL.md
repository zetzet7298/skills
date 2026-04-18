---
name: setup-khuym
description: Install, bootstrap, or route Khuym on Codex, Factory Droid, Kiro, or all three. Use this whenever the user wants to use Khuym skills but the platform choice, install scope, or bootstrap path is still unsettled. Trigger even when they only say things like "install Khuym here", "set up Khuym", "use Khuym skills in this repo", "which platform should I pick", or "set it up globally/project-wide".
metadata:
  version: '1.0'
  ecosystem: khuym
---

# setup-khuym

Use this skill before `using-khuym` when the user still needs help deciding or installing the runtime surface for Khuym.

`using-khuym` starts the workflow after the platform is ready.
`setup-khuym` gets the platform ready.

## What success looks like

By the end of this skill, the user should have:

1. the correct target platform chosen: `Codex`, `Factory Droid`, `Kiro`, or `all 3`
2. the correct install scope chosen: repo/workspace vs global where that distinction exists
3. exact install commands or UI steps for that platform
4. the next bootstrap step: load `using-khuym`
5. if requested, the next workflow step after bootstrap

## Decision model

Treat this as a two-part decision:

### 1) Platform choice

- If the user explicitly names `Codex`, `Factory`, `Factory Droid`, `Droid`, or `Kiro`, use that.
- If the user asks for comparison, recommend the smallest set that satisfies their workflow.
- If the user wants maximum portability or explicitly asks for multiple runtimes, support `all 3`.
- If the platform is ambiguous, ask the user to choose from `Codex`, `Factory Droid`, `Kiro`, or `all 3`.

### 2) Scope choice

Do not blur install scope with repo onboarding.

- **Codex**: plugin install is effectively user/runtime level; Khuym onboarding still writes repo-local files.
- **Factory Droid**: plugin install is effectively user/runtime level; Khuym onboarding still writes repo-local files.
- **Kiro**: bundle install can be `workspace` or `global`; Khuym onboarding still writes repo-local state when the workflow begins.

Default recommendation:

- if the user wants Khuym only for the current repo, recommend the narrowest repo/workspace-shaped option
- if the user wants Khuym available across many repos, recommend global where the platform supports it

## Required explanation

Always explain this boundary clearly:

- **platform install** makes the Khuym skills available in the tool
- **repo onboarding** prepares the current repository for the Khuym workflow

After install, the next step is still to load `using-khuym`.

## Installation matrix

Read `references/platform-install-matrix.md` before giving commands.

Use it to produce exact steps for:

- Codex local marketplace install
- Factory Droid local marketplace install
- Kiro workspace/global installer flow
- all-3 setup order

## Response contract

When helping the user, answer in this order:

### Chosen platform
- what platform you selected
- why it fits this request

### Chosen scope
- project/workspace/global
- why that scope is appropriate

### Install steps
- exact commands or exact UI path
- repo path placeholders if needed

### Bootstrap next step
- tell them to load `using-khuym`
- if they asked for the full workflow, say that `using-khuym` should then route into the rest of the chain

If the user explicitly says they only want a recommendation, comparison, or platform choice for now, stop after `Chosen platform` and `Chosen scope`. Do not volunteer install commands, bootstrap instructions, or the workflow chain unless they asked for setup.

## Output template

Use a visibly structured answer. Do not collapse everything into freeform prose.

For single-platform requests, use exactly these top-level sections:

```markdown
# Chosen platform
# Chosen scope
# Install steps
# Bootstrap next step
```

For recommendation-only requests where the user explicitly does **not** want installation yet, use exactly:

```markdown
# Chosen platform
# Chosen scope
```

Then stop. Do not add `# Install steps` or `# Bootstrap next step`.

For `all 3` requests, use exactly these top-level sections:

```markdown
# Chosen platform
# Chosen scope
# Install steps
## Codex
## Factory Droid
## Kiro
# Bootstrap next step
```

Inside `# Chosen scope`, explicitly state both:

- **Install scope**
- **Repo onboarding scope**

That distinction is one of the main reasons this skill exists, so do not leave it implicit.

Inside `# Bootstrap next step`, always include:

1. the exact skill name to start with for that platform
2. one short sentence explaining that install does not equal onboarding
3. if the user asked for the full workflow, the routed chain after `using-khuym`

For Codex and Factory Droid requests, prefer the explicit bootstrap skill name `khuym:using-khuym`.

For Kiro requests, prefer the bootstrap skill name `using-khuym`.

## Specific quality bar

Prefer answers that are:

- shorter than a README section
- more structured than a chat ramble
- specific enough that the user can copy commands directly

Do not add optional history, clone instructions, or repo background unless the user asked for them or they are genuinely required.

For recommendation-only requests, do not add install commands "just in case". Scope discipline is part of the skill quality bar.

## Routing after install

Once install is complete:

- if the user asked to begin working immediately, hand off to `using-khuym`
- if they only asked for install/setup, stop after confirming the platform is ready
- if they asked for the full workflow, explicitly say:
  - first `using-khuym`
  - then follow its routing into `exploring`, `planning`, `validating`, `swarming`, `executing`, `reviewing`, and `compounding` as needed

## Guardrails

- Never claim Kiro supports the same marketplace model as Droid/Codex here; it does not in this repo layout.
- Never suggest one-click GitHub Kiro Power install from this repo. This repo supports Kiro via local-path install and the bundled installer.
- Never skip the `using-khuym` handoff after install.
- If the user asks for `all 3`, do not compress the answer into vague prose. Give one section per platform.
- If the user only wants to choose a platform but not install yet, give the recommendation and stop there.

## Quick examples

### Example 1
User: `Install Khuym in Codex for this repo`

You should:
- choose `Codex`
- explain the local marketplace flow
- tell them the next step is `using-khuym`

### Example 2
User: `Should I use Kiro or Factory for Khuym in one repo?`

You should:
- compare `Kiro` vs `Factory Droid`
- recommend the narrower setup that matches the stated need
- explain the scope difference

### Example 3
User: `Set me up on all three and then route the workflow`

You should:
- provide all 3 install sections
- keep commands/platform boundaries explicit
- end by handing off to `using-khuym`
