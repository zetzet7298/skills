#!/usr/bin/env node

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const PACKAGE_ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const packageJson = JSON.parse(fs.readFileSync(path.join(PACKAGE_ROOT, "package.json"), "utf8"));

test("package.json declares a local Pi package manifest", () => {
  assert.equal(packageJson.name, "khuym-pi");
  assert.ok(Array.isArray(packageJson.keywords));
  assert.ok(packageJson.keywords.includes("pi-package"));
  assert.deepEqual(packageJson.pi, { skills: ["./skills"] });
});

test("package resources exist", () => {
  assert.ok(fs.existsSync(path.join(PACKAGE_ROOT, "skills", "using-khuym", "SKILL.md")));
  assert.ok(fs.existsSync(path.join(PACKAGE_ROOT, "skills", "setup-khuym", "SKILL.md")));
  assert.ok(fs.existsSync(path.join(PACKAGE_ROOT, "AGENTS.template.md")));
});
