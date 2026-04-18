#!/usr/bin/env node

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";

import { applyRepo, checkRepo } from "./onboard_khuym.mjs";
import { buildKhuymDependencyReport } from "./khuym_dependencies.mjs";

function withTempRepo(run) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "khuym-opencode-onboard-"));
  try {
    run(root);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

test("applyRepo creates OpenCode onboarding assets", () => {
  withTempRepo((root) => {
    const result = applyRepo(root);

    assert.equal(result.result.status, "complete");
    assert.equal(result.status, "up_to_date");
    assert.ok(fs.existsSync(path.join(root, "AGENTS.md")));
    assert.ok(fs.existsSync(path.join(root, ".opencode", "khuym_status.mjs")));
    assert.ok(fs.existsSync(path.join(root, ".opencode", "khuym_state.mjs")));
    assert.ok(fs.existsSync(path.join(root, ".opencode", "khuym_dependencies.mjs")));
    assert.ok(fs.existsSync(path.join(root, ".khuym", "onboarding.json")));
    assert.ok(fs.existsSync(path.join(root, ".khuym", "state.json")));
  });
});

test("checkRepo reports onboarding needed before apply", () => {
  withTempRepo((root) => {
    const result = checkRepo(root);
    assert.equal(result.status, "needs_onboarding");
    assert.ok(result.actions.includes("create_AGENTS.md"));
    assert.ok(result.actions.includes("sync_.opencode_khuym_support_scripts"));
  });
});

test("installed khuym_status script reports onboarding and state", () => {
  withTempRepo((root) => {
    applyRepo(root);

    const stdout = execFileSync("node", [path.join(root, ".opencode", "khuym_status.mjs"), "--json"], {
      cwd: root,
      encoding: "utf8",
    });
    const status = JSON.parse(stdout);

    assert.equal(status.onboarding.exists, true);
    assert.equal(status.state_json.exists, true);
    assert.equal(status.state_json.phase, "idle");
    assert.ok(Array.isArray(status.next_reads));
  });
});

test("dependency report reads the OpenCode bundle config template", () => {
  const repoRoot = "/var/www/khuym-skills";
  const skillsRoot = "/var/www/khuym-skills/plugins/khuym-opencode/skills";
  const report = buildKhuymDependencyReport({ repoRoot, skillsRoot, userOpenCodeConfigPath: "/tmp/does-not-exist.json" });

  const bundleSource = report.mcp_sources.find((source) => source.key === "bundle_opencode_config_template");
  assert.ok(bundleSource);
  assert.equal(bundleSource.path, "plugins/khuym-opencode/opencode.json");
});
