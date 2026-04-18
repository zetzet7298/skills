#!/usr/bin/env node

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_PATH = fileURLToPath(import.meta.url);
const BUNDLE_ROOT = path.dirname(path.dirname(SCRIPT_PATH));
const SOURCE_SKILLS_DIR = path.join(BUNDLE_ROOT, "skills");
const SOURCE_STEERING_DIR = path.join(BUNDLE_ROOT, "steering");
const SOURCE_AGENTS_DIR = path.join(BUNDLE_ROOT, "agents");
const SOURCE_MANIFEST = path.join(BUNDLE_ROOT, "manifest.json");
const SOURCE_MCP = path.join(BUNDLE_ROOT, "mcp.json");
const SOURCE_SUPPORT_FILES = {
  "khuym_status.mjs": path.join(BUNDLE_ROOT, "skills", "using-khuym", "templates", "khuym_status.mjs"),
  "khuym_state.mjs": path.join(BUNDLE_ROOT, "skills", "using-khuym", "scripts", "khuym_state.mjs"),
  "khuym_dependencies.mjs": path.join(BUNDLE_ROOT, "skills", "using-khuym", "scripts", "khuym_dependencies.mjs"),
};

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
          "Usage: install_khuym_kiro.mjs [--scope workspace|global] [--repo-root <path>] [--dry-run]",
          "",
          "Installs the Khuym Kiro bundle into workspace or global .kiro scope.",
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

function mergeMcpJson(targetPath) {
  const existing = fs.existsSync(targetPath)
    ? JSON.parse(fs.readFileSync(targetPath, "utf8"))
    : { mcpServers: {} };
  const incoming = JSON.parse(fs.readFileSync(SOURCE_MCP, "utf8"));
  const merged = {
    ...existing,
    mcpServers: {
      ...(existing.mcpServers || {}),
      ...(incoming.mcpServers || {}),
    },
  };
  ensureDir(path.dirname(targetPath));
  fs.writeFileSync(targetPath, `${JSON.stringify(merged, null, 2)}\n`, "utf8");
}

function writeSupportFiles(targetKiroDir) {
  ensureDir(targetKiroDir);
  for (const [name, sourcePath] of Object.entries(SOURCE_SUPPORT_FILES)) {
    const targetPath = path.join(targetKiroDir, name);
    fs.copyFileSync(sourcePath, targetPath);
    fs.chmodSync(targetPath, 0o755);
  }
  fs.copyFileSync(SOURCE_MANIFEST, path.join(targetKiroDir, "manifest.json"));
  fs.copyFileSync(SOURCE_MCP, path.join(targetKiroDir, "mcp.json"));
}

function buildPlan(args) {
  const root = args.scope === "global" ? os.homedir() : path.resolve(args.repoRoot);
  const kiroDir = path.join(root, ".kiro");
  return {
    scope: args.scope,
    root,
    kiroDir,
    skillsDir: path.join(kiroDir, "skills"),
    steeringDir: path.join(kiroDir, "steering"),
    agentsDir: path.join(kiroDir, "agents"),
    mcpConfigPath: path.join(kiroDir, "settings", "mcp.json"),
  };
}

export function installKhuymKiro(options = {}) {
  const plan = buildPlan({
    scope: options.scope || "workspace",
    repoRoot: options.repoRoot || process.cwd(),
  });

  if (options.dryRun) {
    return {
      status: "dry_run",
      plan,
    };
  }

  copyDir(SOURCE_SKILLS_DIR, plan.skillsDir);
  copyDir(SOURCE_STEERING_DIR, plan.steeringDir);
  copyDir(SOURCE_AGENTS_DIR, plan.agentsDir);
  writeSupportFiles(plan.kiroDir);
  mergeMcpJson(plan.mcpConfigPath);

  return {
    status: "installed",
    plan,
  };
}

export function main(argv = process.argv.slice(2)) {
  const args = parseArgs(argv);
  const result = installKhuymKiro(args);
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  return 0;
}

if (process.argv[1] && path.resolve(process.argv[1]) === SCRIPT_PATH) {
  process.exitCode = main();
}
