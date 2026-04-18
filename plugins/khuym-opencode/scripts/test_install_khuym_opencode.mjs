#!/usr/bin/env node

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { installKhuymOpenCode } from "./install_khuym_opencode.mjs";

function withTempDir(run) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "khuym-opencode-install-"));
  try {
    run(root);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

test("workspace install writes OpenCode assets into repo-local .opencode and opencode.json", () => {
  withTempDir((root) => {
    const home = path.join(root, "home");
    const repo = path.join(root, "repo");
    fs.mkdirSync(home, { recursive: true });
    fs.mkdirSync(repo, { recursive: true });

    const result = installKhuymOpenCode({ scope: "workspace", repoRoot: repo, homeRoot: home });
    assert.equal(result.status, "installed");
    assert.ok(fs.existsSync(path.join(repo, ".opencode", "skills", "using-khuym", "SKILL.md")));
    assert.ok(fs.existsSync(path.join(repo, ".opencode", "agents", "khuym-review.md")));
    assert.ok(fs.existsSync(path.join(repo, ".opencode", "plugins", "khuym_hooks.js")));
    assert.ok(fs.existsSync(path.join(repo, "opencode.json")));
  });
});

test("global install writes OpenCode assets into ~/.config/opencode", () => {
  withTempDir((root) => {
    const home = path.join(root, "home");
    fs.mkdirSync(home, { recursive: true });

    const result = installKhuymOpenCode({ scope: "global", repoRoot: root, homeRoot: home });
    assert.equal(result.status, "installed");
    assert.ok(fs.existsSync(path.join(home, ".config", "opencode", "skills", "using-khuym", "SKILL.md")));
    assert.ok(fs.existsSync(path.join(home, ".config", "opencode", "agents", "khuym-review.md")));
    assert.ok(fs.existsSync(path.join(home, ".config", "opencode", "plugins", "khuym_hooks.js")));
    assert.ok(fs.existsSync(path.join(home, ".config", "opencode", "opencode.json")));
  });
});

test("dry run reports target paths without writing files", () => {
  withTempDir((root) => {
    const home = path.join(root, "home");
    const repo = path.join(root, "repo");
    fs.mkdirSync(home, { recursive: true });
    fs.mkdirSync(repo, { recursive: true });

    const result = installKhuymOpenCode({ scope: "workspace", repoRoot: repo, homeRoot: home, dryRun: true });
    assert.equal(result.status, "dry_run");
    assert.equal(result.plan.workspaceRoot, repo);
    assert.equal(fs.existsSync(path.join(repo, ".opencode")), false);
  });
});
