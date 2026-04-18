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
- Repo onboarding still happens later through `using-khuym`.

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
- Repo onboarding still happens later through `using-khuym`.

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

## All 3

Use this order:

1. Codex plugin install
2. Factory Droid plugin install
3. Kiro installer or local-path Power install
4. Then hand off to `using-khuym`

## Bootstrap handoff

After any platform install, the next Khuym step is:

- load `using-khuym`
- if the user wants immediate work, continue into that skill's onboarding/bootstrap flow
