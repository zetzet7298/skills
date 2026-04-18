#!/usr/bin/env node

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const PACKAGE_ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const packageJson = JSON.parse(fs.readFileSync(path.join(PACKAGE_ROOT, "package.json"), "utf8"));
const extensionManifest = JSON.parse(fs.readFileSync(path.join(PACKAGE_ROOT, "gemini-extension.json"), "utf8"));
const hooks = JSON.parse(fs.readFileSync(path.join(PACKAGE_ROOT, "hooks", "hooks.json"), "utf8"));

test("package.json describes the Gemini CLI bundle", () => {
  assert.equal(packageJson.name, "khuym-gemini-cli");
  assert.ok(Array.isArray(packageJson.keywords));
  assert.ok(packageJson.keywords.includes("gemini-cli"));
  assert.equal(packageJson.type, "module");
});

test("extension manifest and bundle resources exist", () => {
  assert.equal(extensionManifest.name, "khuym-gemini-cli");
  assert.equal(extensionManifest.contextFileName, "GEMINI.md");
  assert.ok(extensionManifest.mcpServers.gkg);
  assert.ok(fs.existsSync(path.join(PACKAGE_ROOT, "GEMINI.md")));
  assert.ok(fs.existsSync(path.join(PACKAGE_ROOT, "gemini-extension.json")));
  assert.ok(fs.existsSync(path.join(PACKAGE_ROOT, "skills", "using-khuym", "SKILL.md")));
  assert.ok(fs.existsSync(path.join(PACKAGE_ROOT, "skills", "setup-khuym", "SKILL.md")));
  assert.ok(fs.existsSync(path.join(PACKAGE_ROOT, "hooks", "hooks.json")));
  assert.ok(fs.existsSync(path.join(PACKAGE_ROOT, "commands", "khuym", "status.toml")));
});

test("hooks.json wires the expected Gemini lifecycle hooks", () => {
  assert.ok(Array.isArray(hooks.hooks.SessionStart));
  assert.ok(Array.isArray(hooks.hooks.BeforeTool));
  assert.ok(Array.isArray(hooks.hooks.PreCompress));
  assert.ok(Array.isArray(hooks.hooks.SessionEnd));
  assert.equal(hooks.hooks.BeforeTool[0].matcher, "run_shell_command");
});
