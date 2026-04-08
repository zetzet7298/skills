#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
plugin_json="$repo_root/.claude-plugin/plugin.json"
agents_target_root="${AGENTS_SKILLS_DIR:-$HOME/.agents/skills}"
claude_target_root="${CLAUDE_SKILLS_DIR:-$HOME/.claude/skills}"
targets="${SKILLS_SYNC_TARGETS:-agents}"
dry_run=0

usage() {
  echo "Usage: bash scripts/sync-skills.sh [--dry-run] [--target agents|claude|all]" >&2
}

while [[ $# -gt 0 ]]; do
  case "${1}" in
    --dry-run)
      dry_run=1
      shift
      ;;
    --target)
      if [[ $# -lt 2 ]]; then
        usage
        exit 1
      fi
      targets="${2}"
      shift 2
      ;;
    *)
      usage
      exit 1
      ;;
  esac
done

case "${targets}" in
  agents|claude|all)
    ;;
  *)
    usage
    exit 1
    ;;
esac

python3 - "$plugin_json" "$agents_target_root" "$claude_target_root" "$targets" "$dry_run" <<'PY'
from __future__ import annotations

import json
import os
import shutil
import sys
from pathlib import Path

plugin_json = Path(sys.argv[1]).resolve()
agents_target_root = Path(sys.argv[2]).expanduser()
claude_target_root = Path(sys.argv[3]).expanduser()
targets = sys.argv[4]
dry_run = sys.argv[5] == "1"

data = json.loads(plugin_json.read_text(encoding="utf8"))
skills = data.get("skills", [])

target_roots: list[tuple[str, Path]] = []
if targets in {"agents", "all"}:
    target_roots.append(("agents", agents_target_root))
if targets in {"claude", "all"}:
    target_roots.append(("claude", claude_target_root))

actions: list[tuple[str, str, Path, Path]] = []

for skill in skills:
    source = (plugin_json.parent / skill["path"]).resolve()
    if source.name != "SKILL.md":
        raise SystemExit(f"Unexpected skill entrypoint: {source}")
    source_dir = source.parent
    for target_name, target_root in target_roots:
        target_dir = target_root / skill["name"]
        actions.append((target_name, skill["name"], source_dir, target_dir))

if dry_run:
    for target_name, name, source_dir, target_dir in actions:
        print(f"would link [{target_name}] {name}: {target_dir} -> {source_dir}")
    raise SystemExit(0)

for _, target_root in target_roots:
    target_root.mkdir(parents=True, exist_ok=True)

for target_name, name, source_dir, target_dir in actions:
    if target_dir.is_symlink() or target_dir.exists():
        if target_dir.is_dir() and not target_dir.is_symlink():
            shutil.rmtree(target_dir)
        else:
            target_dir.unlink()
    os.symlink(source_dir, target_dir, target_is_directory=True)
    print(f"linked [{target_name}] {name}: {target_dir} -> {source_dir}")
PY
