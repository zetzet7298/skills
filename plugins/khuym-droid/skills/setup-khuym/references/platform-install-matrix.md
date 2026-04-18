# Khuym Platform Install Matrix

Use this file whenever `setup-khuym` needs exact commands.

## Codex

### Best fit
- Use when the user wants the packaged Codex plugin and local repo marketplace flow.

### Install shape
- Clone the repo locally if they do not already have it.
- Add the repo marketplace file to Codex:
  - `/absolute/path/to/skills/.agents/plugins/marketplace.json`
- Restart Codex if needed.
- Install the `khuym` plugin from that marketplace.

### Notes
- The plugin becomes available in Codex.
- Repo onboarding still happens later through `khuym:using-khuym`.

## Factory Droid

### Best fit
- Use when the user wants the Factory Droid plugin from this repo.

### Install shape
From the repo root:

```bash
droid plugin marketplace add "/absolute/path/to/skills"
droid plugin install "khuym@khuym-skills"
```

Then verify:

```bash
droid plugin list
```

### Notes
- The plugin install is runtime-level.
- Repo onboarding still happens later through `khuym:using-khuym`.

## Kiro

### Best fit
- Use when the user wants Kiro CLI or Kiro IDE support.

### Install shape

This repo supports Kiro through the bundled installer and local-path Power flow.

#### Workspace scope

```bash
node plugins/khuym-kiro/scripts/install_khuym_kiro.mjs --scope workspace --repo-root /absolute/path/to/repo
```

#### Global scope

```bash
node plugins/khuym-kiro/scripts/install_khuym_kiro.mjs --scope global
```

#### Optional Kiro Power UI path
- In Kiro, add a Power from local path
- Select `plugins/khuym-kiro/`

### Notes
- Do not promise one-click GitHub Power install from this repo.
- This repo layout supports Kiro through local path and installer flow.
- Repo onboarding still happens later through `using-khuym`.

## Antigravity

### Best fit
- Use when the user wants Google Antigravity support with native skills and MCP configuration.

### Install shape

This repo supports Antigravity through the bundled installer and Antigravity-native skill roots.

#### Workspace scope

```bash
node plugins/khuym-antigravity/scripts/install_khuym_antigravity.mjs --scope workspace --repo-root /absolute/path/to/repo
```

Writes skills to:
- `/absolute/path/to/repo/.agents/skills`

#### Global scope

```bash
node plugins/khuym-antigravity/scripts/install_khuym_antigravity.mjs --scope global
```

Writes skills to:
- `~/.gemini/antigravity/skills`

### Notes
- The installer merges Khuym MCP servers into `~/.gemini/antigravity/mcp_config.json`.
- Do not describe Antigravity as a Kiro Power or local-path Power flow.
- Repo onboarding still happens later through `using-khuym`.

## Pi

### Best fit
- Use when the user wants Pi coding agent support through Pi's native package and skills system.

### Install shape

This repo supports Pi through a local Pi package at `plugins/khuym-pi/`.

#### Project-local scope

```bash
pi install /absolute/path/to/plugins/khuym-pi -l
```

Writes package references to:
- `.pi/settings.json`

#### Global scope

```bash
pi install /absolute/path/to/plugins/khuym-pi
```

Writes package references to:
- `~/.pi/agent/settings.json`

Then verify:

```bash
pi list
```

### Notes
- Pi loads Khuym skills from the package manifest in `plugins/khuym-pi/package.json`.
- Do not describe Pi as a plugin marketplace flow in this repo.
- Repo onboarding still happens later through `using-khuym`, which manages `.khuym/` plus repo-local `.pi/khuym_*.mjs` support files.

## OpenCode

### Best fit
- Use when the user wants OpenCode support through native `.opencode/` skills, agents, plugins, and `opencode.json` config.

### Install shape

This repo supports OpenCode through the bundled installer at `plugins/khuym-opencode/`.

#### Workspace scope

```bash
node plugins/khuym-opencode/scripts/install_khuym_opencode.mjs --scope workspace --repo-root /absolute/path/to/repo
```

Writes assets to:
- `/absolute/path/to/repo/.opencode/skills`
- `/absolute/path/to/repo/.opencode/agents`
- `/absolute/path/to/repo/.opencode/plugins`

Merges config into:
- `/absolute/path/to/repo/opencode.json`

#### Global scope

```bash
node plugins/khuym-opencode/scripts/install_khuym_opencode.mjs --scope global
```

Writes assets to:
- `~/.config/opencode/skills`
- `~/.config/opencode/agents`
- `~/.config/opencode/plugins`

Merges config into:
- `~/.config/opencode/opencode.json`

Then verify:

```bash
opencode debug config
```

### Notes
- OpenCode auto-loads local plugins from `.opencode/plugins/` and local agents from `.opencode/agents/`.
- Do not describe OpenCode as a marketplace or Pi package flow in this repo.
- Repo onboarding still happens later through `using-khuym`, which manages `.khuym/` plus repo-local `.opencode/khuym_*.mjs` support files.

## Gemini CLI

### Best fit
- Use when the user wants Gemini CLI support through a native extension with bundled skills, hooks, commands, and MCP servers.

### Install shape

This repo supports Gemini CLI through the bundled extension at `plugins/khuym-gemini-cli/`.

#### Runtime install (recommended)

```bash
gemini extensions install /absolute/path/to/plugins/khuym-gemini-cli
```

Installs the extension under:
- `~/.gemini/extensions/khuym-gemini-cli`

#### Local development link (optional)

```bash
gemini extensions link /absolute/path/to/plugins/khuym-gemini-cli
```

Use this when you want edits in the local checkout to reflect immediately without reinstalling.

Then verify:

```bash
gemini extensions list
gemini extensions validate /absolute/path/to/plugins/khuym-gemini-cli
```

### Notes
- Gemini CLI loads bundled `GEMINI.md`, `gemini-extension.json`, `hooks/hooks.json`, `commands/`, and `skills/` from the installed extension.
- Do not describe Gemini CLI as a workspace/global installer or `.gemini/settings.json` merge flow in this repo.
- Repo onboarding still happens later through `using-khuym`, which manages `.khuym/` plus repo-local `.gemini/khuym_*.mjs` support files.

## All 7

Use this order:

1. Codex plugin install
2. Factory Droid plugin install
3. Kiro installer or local-path Power install
4. Antigravity installer
5. Pi package install
6. OpenCode installer
7. Gemini CLI extension install
8. Then hand off to the correct `using-khuym` entrypoint per platform

## Bootstrap handoff

After any platform install, choose the next step based on how much startup work remains:

### Fresh initiative or best-practice startup

- Codex / Factory Droid:
  - `khuym:project-bootstrap`
  - `khuym:project-roadmap`
  - `khuym:using-khuym`
- Kiro / Antigravity / Pi / OpenCode / Gemini CLI:
  - `project-bootstrap`
  - `project-roadmap`
  - `using-khuym`

Use this path when the repo or initiative still needs framing, research, or roadmap setup before entering Khuym proper.

### Already framed work, ready for Khuym

- Codex / Factory Droid: load `khuym:using-khuym`
- Kiro / Antigravity / Pi / OpenCode / Gemini CLI: load `using-khuym`

Use this shorter path when the initiative is already framed and the chosen slice is ready to enter Khuym directly.
