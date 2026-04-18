#!/usr/bin/env node

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { installKhuymAntigravity } from "./install_khuym_antigravity.mjs";

function withTempDir(run) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "khuym-antigravity-install-"));
  try {
    run(root);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

test("workspace install writes Antigravity assets into repo-local .agents and global mcp config", () => {
  withTempDir((root) => {
    const home = path.join(root, "home");
    const repo = path.join(root, "repo");
    fs.mkdirSync(home, { recursive: true });
    fs.mkdirSync(repo, { recursive: true });

    const result = installKhuymAntigravity({ scope: "workspace", repoRoot: repo, homeRoot: home });
    assert.equal(result.status, "installed");
    assert.ok(fs.existsSync(path.join(repo, ".agents", "skills", "using-khuym", "SKILL.md")));
    assert.ok(fs.existsSync(path.join(repo, ".agents", "mcp.json")));
    assert.ok(fs.existsSync(path.join(home, ".gemini", "antigravity", "mcp_config.json")));
  });
});

test("global install writes Antigravity assets into ~/.gemini/antigravity", () => {
  withTempDir((root) => {
    const home = path.join(root, "home");
    fs.mkdirSync(home, { recursive: true });

    const result = installKhuymAntigravity({ scope: "global", repoRoot: root, homeRoot: home });
    assert.equal(result.status, "installed");
    assert.ok(fs.existsSync(path.join(home, ".gemini", "antigravity", "skills", "using-khuym", "SKILL.md")));
    assert.ok(fs.existsSync(path.join(home, ".gemini", "antigravity", "mcp.json")));
    assert.ok(fs.existsSync(path.join(home, ".gemini", "antigravity", "mcp_config.json")));
  });
});

test("dry run reports target paths without writing files", () => {
  withTempDir((root) => {
    const home = path.join(root, "home");
    const repo = path.join(root, "repo");
    fs.mkdirSync(home, { recursive: true });
    fs.mkdirSync(repo, { recursive: true });

    const result = installKhuymAntigravity({ scope: "workspace", repoRoot: repo, homeRoot: home, dryRun: true });
    assert.equal(result.status, "dry_run");
    assert.equal(result.plan.workspaceRoot, repo);
    assert.equal(fs.existsSync(path.join(repo, ".agents")), false);
  });
});
