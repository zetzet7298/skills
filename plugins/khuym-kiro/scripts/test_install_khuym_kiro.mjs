#!/usr/bin/env node

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { installKhuymKiro } from "./install_khuym_kiro.mjs";

function withTempDir(run) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "khuym-kiro-install-"));
  try {
    run(root);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

test("workspace install writes Kiro assets into repo-local .kiro", () => {
  withTempDir((root) => {
    const result = installKhuymKiro({ scope: "workspace", repoRoot: root });
    assert.equal(result.status, "installed");
    assert.ok(fs.existsSync(path.join(root, ".kiro", "skills", "using-khuym", "SKILL.md")));
    assert.ok(fs.existsSync(path.join(root, ".kiro", "agents", "khuym-swarm-coordinator.json")));
    assert.ok(fs.existsSync(path.join(root, ".kiro", "steering", "khuym-routing.md")));
    assert.ok(fs.existsSync(path.join(root, ".kiro", "manifest.json")));
    assert.ok(fs.existsSync(path.join(root, ".kiro", "settings", "mcp.json")));
  });
});

test("dry run reports target paths without writing files", () => {
  withTempDir((root) => {
    const result = installKhuymKiro({ scope: "workspace", repoRoot: root, dryRun: true });
    assert.equal(result.status, "dry_run");
    assert.equal(result.plan.root, root);
    assert.equal(fs.existsSync(path.join(root, ".kiro")), false);
  });
});
