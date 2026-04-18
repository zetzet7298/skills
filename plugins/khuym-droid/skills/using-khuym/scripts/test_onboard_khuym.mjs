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
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "khuym-droid-onboard-"));
  try {
    run(root);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

test("applyRepo creates Factory onboarding assets", () => {
  withTempRepo((root) => {
    const result = applyRepo(root);

    assert.equal(result.result.status, "complete");
    assert.equal(result.status, "up_to_date");
    assert.ok(fs.existsSync(path.join(root, "AGENTS.md")));
    assert.ok(fs.existsSync(path.join(root, ".factory", "settings.json")));
    assert.ok(fs.existsSync(path.join(root, ".factory", "hooks", "khuym_session_start.mjs")));
    assert.ok(fs.existsSync(path.join(root, ".factory", "khuym_status.mjs")));
    assert.ok(fs.existsSync(path.join(root, ".factory", "khuym_state.mjs")));
    assert.ok(fs.existsSync(path.join(root, ".factory", "khuym_dependencies.mjs")));
    assert.ok(fs.existsSync(path.join(root, ".khuym", "onboarding.json")));
    assert.ok(fs.existsSync(path.join(root, ".khuym", "state.json")));

    const settings = JSON.parse(fs.readFileSync(path.join(root, ".factory", "settings.json"), "utf8"));
    assert.ok(settings.hooks.SessionStart);
    assert.ok(settings.hooks.PreToolUse);
    assert.ok(settings.hooks.Stop);
  });
});

test("checkRepo reports onboarding needed before apply", () => {
  withTempRepo((root) => {
    const result = checkRepo(root);
    assert.equal(result.status, "needs_onboarding");
    assert.ok(result.actions.includes("create_AGENTS.md"));
    assert.ok(result.actions.includes("create_.factory/settings.json"));
  });
});

test("installed khuym_status script reports onboarding and state", () => {
  withTempRepo((root) => {
    applyRepo(root);

    const stdout = execFileSync("node", [path.join(root, ".factory", "khuym_status.mjs"), "--json"], {
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

test("session start hook emits additional context", () => {
  withTempRepo((root) => {
    applyRepo(root);

    const hookPath = path.join(root, ".factory", "hooks", "khuym_session_start.mjs");
    const stdout = execFileSync("node", [hookPath], {
      cwd: root,
      input: JSON.stringify({ cwd: root, hook_event_name: "SessionStart", source: "startup" }),
      encoding: "utf8",
    });
    const payload = JSON.parse(stdout);

    assert.equal(payload.hookSpecificOutput.hookEventName, "SessionStart");
    assert.match(payload.hookSpecificOutput.additionalContext, /khuym_status\.mjs/);
  });
});

test("dependency report reads plugin mcp manifest from Factory path", () => {
  const repoRoot = "/var/www/khuym-skills";
  const skillsRoot = "/var/www/khuym-skills/plugins/khuym-droid/skills";
  const report = buildKhuymDependencyReport({ repoRoot, skillsRoot, userFactoryMcpPath: "/tmp/does-not-exist.json" });

  const pluginSource = report.mcp_sources.find((source) => source.key === "plugin_mcp_manifest");
  assert.ok(pluginSource);
  assert.equal(pluginSource.path, "plugins/khuym-droid/mcp.json");
});
