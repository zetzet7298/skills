---
name: "khuym"
displayName: "Khuym"
description: "Validate-first multi-agent software delivery with planning, validation, swarming, review, and learning capture"
keywords: ["khuym", "planning", "validation", "swarming", "review", "beads", "agent mail"]
---

# Onboarding

## What this bundle provides
This Kiro bundle packages the Khuym workflow as Kiro skills, custom agents, steering, and MCP configuration.

## Install shape
This repository is a multi-platform repo, so the Kiro bundle lives in a subdirectory instead of the repository root.

- For a real install, use the bundled installer:
  - `node plugins/khuym-kiro/scripts/install_khuym_kiro.mjs --scope workspace`
  - `node plugins/khuym-kiro/scripts/install_khuym_kiro.mjs --scope global`
- If you are adding a Power from Kiro UI, install this directory from **Local Path**.
- GitHub one-click Power install is not supported from this repo layout because Kiro expects `POWER.md` at the repository root.

## First use
After installation, start with the `using-khuym` skill.
If the current workspace is not yet onboarded, run the onboarding flow it describes so the repo gets `.khuym/` state files, `AGENTS.md`, and `.kiro/khuym_*.mjs` support scripts.

# When to Load Steering Files
- Any request about the Khuym workflow -> `steering/khuym-routing.md`
