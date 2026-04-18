#!/usr/bin/env node

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_PATH = fileURLToPath(import.meta.url);
const BUNDLE_ROOT = path.dirname(path.dirname(SCRIPT_PATH));
const SOURCE_SKILLS_DIR = path.join(BUNDLE_ROOT, "skills");
const SOURCE_AGENTS_DIR = path.join(BUNDLE_ROOT, "agents");
const SOURCE_PLUGINS_DIR = path.join(BUNDLE_ROOT, "plugins");
const SOURCE_CONFIG = path.join(BUNDLE_ROOT, "opencode.json");

function parseArgs(argv) {
  const args = {
    scope: "workspace",
    repoRoot: process.cwd(),
    dryRun: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--scope") {
      args.scope = argv[index + 1];
      index += 1;
      continue;
    }
    if (arg.startsWith("--scope=")) {
      args.scope = arg.slice("--scope=".length);
      continue;
    }
    if (arg === "--repo-root") {
      args.repoRoot = argv[index + 1];
      index += 1;
      continue;
    }
    if (arg.startsWith("--repo-root=")) {
      args.repoRoot = arg.slice("--repo-root=".length);
      continue;
    }
    if (arg === "--dry-run") {
      args.dryRun = true;
      continue;
    }
    if (arg === "--help" || arg === "-h") {
      process.stdout.write(
        [
          "Usage: install_khuym_opencode.mjs [--scope workspace|global] [--repo-root <path>] [--dry-run]",
          "",
          "Installs the Khuym OpenCode bundle into workspace or global OpenCode scope.",
        ].join("\n"),
      );
      process.exit(0);
    }
    throw new Error(`Unknown argument: ${arg}`);
  }

  if (!["workspace", "global"].includes(args.scope)) {
    throw new Error(`Unsupported scope: ${args.scope}`);
  }

  return args;
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function copyDir(sourceDir, targetDir) {
  ensureDir(targetDir);
  for (const entry of fs.readdirSync(sourceDir, { withFileTypes: true })) {
    const sourcePath = path.join(sourceDir, entry.name);
    const targetPath = path.join(targetDir, entry.name);
    if (entry.isDirectory()) {
      copyDir(sourcePath, targetPath);
      continue;
    }
    fs.copyFileSync(sourcePath, targetPath);
  }
}

function uniqueStrings(values) {
  return [...new Set(values.filter((value) => typeof value === "string" && value.trim()))];
}

function mergeOpencodeJson(targetPath, scope) {
  const existing = fs.existsSync(targetPath)
    ? JSON.parse(fs.readFileSync(targetPath, "utf8"))
    : {};
  const incoming = JSON.parse(fs.readFileSync(SOURCE_CONFIG, "utf8"));
  const merged = {
    ...existing,
    $schema: existing.$schema || incoming.$schema,
  };

  if (scope === "workspace") {
    merged.instructions = uniqueStrings([...(existing.instructions || []), ...(incoming.instructions || [])]);
  } else if (existing.instructions) {
    merged.instructions = existing.instructions;
  }

  ensureDir(path.dirname(targetPath));
  fs.writeFileSync(targetPath, `${JSON.stringify(merged, null, 2)}\n`, "utf8");
}

function buildPlan(args) {
  const workspaceRoot = path.resolve(args.repoRoot);
  const homeRoot = path.resolve(args.homeRoot || os.homedir());
  const globalRoot = path.join(homeRoot, ".config", "opencode");
  const opencodeRoot = args.scope === "global"
    ? globalRoot
    : path.join(workspaceRoot, ".opencode");

  return {
    scope: args.scope,
    workspaceRoot,
    homeRoot,
    opencodeRoot,
    skillsDir: path.join(opencodeRoot, "skills"),
    agentsDir: path.join(opencodeRoot, "agents"),
    pluginsDir: path.join(opencodeRoot, "plugins"),
    configPath: args.scope === "global"
      ? path.join(globalRoot, "opencode.json")
      : path.join(workspaceRoot, "opencode.json"),
  };
}

export function installKhuymOpenCode(options = {}) {
  const plan = buildPlan({
    scope: options.scope || "workspace",
    repoRoot: options.repoRoot || process.cwd(),
    homeRoot: options.homeRoot,
  });

  if (options.dryRun) {
    return { status: "dry_run", plan };
  }

  copyDir(SOURCE_SKILLS_DIR, plan.skillsDir);
  copyDir(SOURCE_AGENTS_DIR, plan.agentsDir);
  copyDir(SOURCE_PLUGINS_DIR, plan.pluginsDir);
  mergeOpencodeJson(plan.configPath, plan.scope);

  return { status: "installed", plan };
}

export function main(argv = process.argv.slice(2)) {
  const args = parseArgs(argv);
  const result = installKhuymOpenCode(args);
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  return 0;
}

if (process.argv[1] && path.resolve(process.argv[1]) === SCRIPT_PATH) {
  process.exitCode = main();
}
