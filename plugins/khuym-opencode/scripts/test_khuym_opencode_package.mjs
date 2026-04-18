#!/usr/bin/env node

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const PACKAGE_ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const packageJson = JSON.parse(fs.readFileSync(path.join(PACKAGE_ROOT, "package.json"), "utf8"));

test("package.json describes the OpenCode bundle", () => {
  assert.equal(packageJson.name, "khuym-opencode");
  assert.ok(Array.isArray(packageJson.keywords));
  assert.ok(packageJson.keywords.includes("opencode"));
  assert.equal(packageJson.type, "module");
});

test("bundle resources exist", () => {
  assert.ok(fs.existsSync(path.join(PACKAGE_ROOT, "opencode.json")));
  assert.ok(fs.existsSync(path.join(PACKAGE_ROOT, "skills", "using-khuym", "SKILL.md")));
  assert.ok(fs.existsSync(path.join(PACKAGE_ROOT, "skills", "setup-khuym", "SKILL.md")));
  assert.ok(fs.existsSync(path.join(PACKAGE_ROOT, "agents", "khuym-review.md")));
  assert.ok(fs.existsSync(path.join(PACKAGE_ROOT, "plugins", "khuym_hooks.js")));
  assert.ok(fs.existsSync(path.join(PACKAGE_ROOT, "AGENTS.template.md")));
});
