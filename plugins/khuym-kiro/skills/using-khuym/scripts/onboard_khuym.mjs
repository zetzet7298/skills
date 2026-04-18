#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  buildDefaultState,
  normalizeKhuymState,
  readGkgReadiness,
  readKhuymState,
  writeKhuymState,
} from "./khuym_state.mjs";
import { buildKhuymDependencyReport } from "./khuym_dependencies.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);
const USING_KHUYM_DIR = path.dirname(path.dirname(SCRIPT_PATH));
const USING_KHUYM_SCRIPTS_DIR = path.dirname(SCRIPT_PATH);
const PLUGIN_ROOT = path.dirname(path.dirname(USING_KHUYM_DIR));
const MANIFEST_PATH = path.join(PLUGIN_ROOT, "manifest.json");
const MCP_SNAPSHOT_PATH = path.join(PLUGIN_ROOT, "mcp.json");
const AGENTS_TEMPLATE_PATH = path.join(PLUGIN_ROOT, "AGENTS.template.md");
const HOOK_TEMPLATES_DIR = path.join(USING_KHUYM_DIR, "templates");
const ONBOARDING_SCHEMA_VERSION = "1.0";
const MIN_NODE_MAJOR = 18;
const MANAGED_SUPPORT_FILES = {
  "khuym_status.mjs": path.join(HOOK_TEMPLATES_DIR, "khuym_status.mjs"),
  "khuym_state.mjs": path.join(USING_KHUYM_SCRIPTS_DIR, "khuym_state.mjs"),
  "khuym_dependencies.mjs": path.join(USING_KHUYM_SCRIPTS_DIR, "khuym_dependencies.mjs"),
};
const MANAGED_BUNDLE_FILES = {
  "manifest.json": MANIFEST_PATH,
  "mcp.json": MCP_SNAPSHOT_PATH,
};

function utcNow() {
  return new Date().toISOString();
}

function ensureParent(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function readTextIfExists(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
}

function loadBundleVersion() {
  return JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8")).version;
}

function readTemplate() {
  return `${fs.readFileSync(AGENTS_TEMPLATE_PATH, "utf8").replace(/\s*$/, "")}\n`;
}

function managedAgentsPresent(text) {
  return text.includes("<!-- KHUYM:START -->") && text.includes("<!-- KHUYM:END -->");
}

function mergeAgentsContent(existing, template) {
  const stripped = existing.trim();
  if (!stripped) {
    return { text: template, status: "created_from_template" };
  }

  if (managedAgentsPresent(existing)) {
    const updated = existing.replace(
      /<!-- KHUYM:START -->[\s\S]*?<!-- KHUYM:END -->\n?/,
      template,
    );
    return { text: `${updated.replace(/\s*$/, "")}\n`, status: "updated_managed_block" };
  }

  const glue = existing.endsWith("\n\n") ? "" : "\n\n";
  return {
    text: `${existing.replace(/\s*$/, "")}${glue}${template}`,
    status: "appended_managed_block",
  };
}

function getNodeRuntimeStatus(version = process.versions.node) {
  const major = Number.parseInt(String(version).split(".")[0] || "0", 10);
  const supported = Number.isFinite(major) && major >= MIN_NODE_MAJOR;
  return {
    command: "node",
    minimum_major: MIN_NODE_MAJOR,
    supported,
    version,
  };
}

function resolveRepoRoot(explicitRoot) {
  if (explicitRoot) {
    return path.resolve(explicitRoot);
  }

  const cwd = path.resolve(process.cwd());
  try {
    const stdout = execFileSync("git", ["rev-parse", "--show-toplevel"], {
      cwd,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });
    return path.resolve(stdout.trim());
  } catch {
    return cwd;
  }
}

function readJsonIfExists(filePath) {
  if (!fs.existsSync(filePath)) {
    return null;
  }
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return null;
  }
}

function readDependencyHealth(repoRoot) {
  try {
    return buildKhuymDependencyReport({ repoRoot, skillsRoot: path.join(PLUGIN_ROOT, "skills") });
  } catch (error) {
    return {
      checked_at: utcNow(),
      summary: {
        skills_total: 0,
        skills_covered: 0,
        skills_with_declared_dependencies: 0,
        skills_dependency_free: 0,
        skills_uncovered: 0,
        skills_available: 0,
        skills_degraded: 0,
        skills_unavailable: 0,
        declared_dependencies: 0,
        missing_dependencies: 0,
      },
      skills: [],
      uncovered_skills: [],
      missing_dependencies: [],
      mcp_sources: [],
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

function normalizeDependencyTarget(target) {
  if (Array.isArray(target)) {
    return target.filter(Boolean);
  }
  if (typeof target === "string" && target.trim()) {
    return [target.trim()];
  }
  return [];
}

function uniqueSorted(values) {
  return [...new Set(values.filter(Boolean))].sort((left, right) => left.localeCompare(right));
}

function buildDependencyWarningSummary(dependencyHealth) {
  const missingDependencies = Array.isArray(dependencyHealth?.missing_dependencies)
    ? dependencyHealth.missing_dependencies
    : [];

  if (missingDependencies.length === 0) {
    return {
      status: "clear",
      message: "No missing declared dependencies detected.",
      missing_dependencies_count: 0,
      affected_skills: [],
      missing_commands: [],
      missing_mcp_servers: [],
    };
  }

  const missingCommands = missingDependencies
    .filter((dependency) => dependency.kind === "command")
    .map((dependency) => ({
      command: normalizeDependencyTarget(dependency.target)[0] || "",
      affects: uniqueSorted(Array.isArray(dependency.required_by) ? dependency.required_by : []),
      status_impact: uniqueSorted(
        Array.isArray(dependency.missing_effects) ? dependency.missing_effects : [],
      ),
    }));
  const missingMcpServers = missingDependencies
    .filter((dependency) => dependency.kind === "mcp_server")
    .map((dependency) => ({
      servers: normalizeDependencyTarget(dependency.target),
      affects: uniqueSorted(Array.isArray(dependency.required_by) ? dependency.required_by : []),
      status_impact: uniqueSorted(
        Array.isArray(dependency.missing_effects) ? dependency.missing_effects : [],
      ),
    }));
  const affectedSkills = uniqueSorted(
    missingDependencies.flatMap((dependency) =>
      Array.isArray(dependency.required_by) ? dependency.required_by : [],
    ),
  );

  const commandNames = uniqueSorted(missingCommands.map((dependency) => dependency.command));
  const mcpServerNames = uniqueSorted(
    missingMcpServers.flatMap((dependency) => dependency.servers || []),
  );

  return {
    status: "warning",
    message:
      `Dependency warning: ${missingDependencies.length} declared dependencies are missing. ` +
      `Affected skills: ${affectedSkills.join(", ")}. ` +
      `Missing commands: ${commandNames.join(", ") || "none"}. ` +
      `Missing MCP server configuration: ${mcpServerNames.join(", ") || "none"}.`,
    missing_dependencies_count: missingDependencies.length,
    affected_skills: affectedSkills,
    missing_commands: missingCommands,
    missing_mcp_servers: missingMcpServers,
  };
}

function buildRuntimeBlockedPayload(repoRoot, action) {
  const runtime = getNodeRuntimeStatus();
  return {
    repo_root: repoRoot,
    status: "missing_runtime",
    action,
    requires_confirmation: false,
    actions: ["install_supported_node_runtime"],
    message: `Khuym requires Node.js ${MIN_NODE_MAJOR}+ before onboarding can continue. Install Node.js and rerun onboarding.`,
    details: { runtime },
  };
}

function filesNeedUpdate(repoRoot, filesMap) {
  const kiroDir = path.join(repoRoot, ".kiro");
  for (const [name, sourcePath] of Object.entries(filesMap)) {
    const targetPath = path.join(kiroDir, name);
    const source = fs.readFileSync(sourcePath, "utf8");
    if (!fs.existsSync(targetPath) || fs.readFileSync(targetPath, "utf8") !== source) {
      return true;
    }
  }
  return false;
}

function writeManagedFiles(repoRoot, filesMap) {
  const kiroDir = path.join(repoRoot, ".kiro");
  fs.mkdirSync(kiroDir, { recursive: true });
  const written = [];
  for (const [name, sourcePath] of Object.entries(filesMap)) {
    const target = path.join(kiroDir, name);
    fs.copyFileSync(sourcePath, target);
    fs.chmodSync(target, 0o755);
    written.push(path.relative(repoRoot, target));
  }
  return written;
}

function needsStateUpdate(repoRoot) {
  const statePath = path.join(repoRoot, ".khuym", "state.json");
  const existing = normalizeKhuymState(readKhuymState(repoRoot));
  const sourceText = fs.existsSync(statePath) ? fs.readFileSync(statePath, "utf8") : "";
  const normalizedText = `${JSON.stringify(existing, null, 2)}\n`;
  return sourceText !== normalizedText;
}

export function checkRepo(repoRoot) {
  const runtime = getNodeRuntimeStatus();
  if (!runtime.supported) {
    return buildRuntimeBlockedPayload(repoRoot, "check");
  }

  const dependencyHealth = readDependencyHealth(repoRoot);
  const dependencyWarning = buildDependencyWarningSummary(dependencyHealth);
  const gkgReadiness = readGkgReadiness(repoRoot);

  const bundleVersion = loadBundleVersion();
  const agentsPath = path.join(repoRoot, "AGENTS.md");
  const onboardingPath = path.join(repoRoot, ".khuym", "onboarding.json");

  const agentsText = readTextIfExists(agentsPath);
  const agentsExists = agentsText.trim() !== "";
  const managedAgents = agentsExists && managedAgentsPresent(agentsText);
  const onboarding = readJsonIfExists(onboardingPath) || {};

  const actions = [];
  if (!agentsExists) {
    actions.push("create_AGENTS.md");
  } else if (!managedAgents) {
    actions.push("append_khuym_managed_block_to_AGENTS.md");
  }

  if (filesNeedUpdate(repoRoot, MANAGED_SUPPORT_FILES)) {
    actions.push("sync_.kiro_khuym_support_scripts");
  }
  if (filesNeedUpdate(repoRoot, MANAGED_BUNDLE_FILES)) {
    actions.push("sync_.kiro_khuym_bundle_metadata");
  }
  if (needsStateUpdate(repoRoot)) {
    actions.push("write_.khuym/state.json");
  }
  if (onboarding.bundle_version !== bundleVersion) {
    actions.push("write_.khuym/onboarding.json");
  }

  return {
    repo_root: repoRoot,
    status: actions.length === 0 ? "up_to_date" : "needs_onboarding",
    actions,
    requires_confirmation: false,
    details: {
      bundle_version: bundleVersion,
      agents_exists: agentsExists,
      agents_managed_block: managedAgents,
      onboarding_state: Object.keys(onboarding).length > 0 ? onboarding : null,
      runtime,
      dependency_health: dependencyHealth,
      dependency_warning: dependencyWarning,
      gkg_readiness: gkgReadiness,
    },
  };
}

export function applyRepo(repoRoot) {
  const runtime = getNodeRuntimeStatus();
  if (!runtime.supported) {
    return buildRuntimeBlockedPayload(repoRoot, "apply");
  }

  const bundleVersion = loadBundleVersion();
  const template = readTemplate();
  const agentsPath = path.join(repoRoot, "AGENTS.md");
  const onboardingPath = path.join(repoRoot, ".khuym", "onboarding.json");
  const statePath = path.join(repoRoot, ".khuym", "state.json");

  ensureParent(agentsPath);
  ensureParent(onboardingPath);
  ensureParent(statePath);

  const mergedAgents = mergeAgentsContent(readTextIfExists(agentsPath), template);
  fs.writeFileSync(agentsPath, mergedAgents.text, "utf8");

  const supportScripts = writeManagedFiles(repoRoot, MANAGED_SUPPORT_FILES);
  const bundleFiles = writeManagedFiles(repoRoot, MANAGED_BUNDLE_FILES);
  const statePayload = fs.existsSync(statePath)
    ? normalizeKhuymState(readKhuymState(repoRoot))
    : buildDefaultState();
  writeKhuymState(repoRoot, statePayload);

  const onboardingPayload = {
    schema_version: ONBOARDING_SCHEMA_VERSION,
    bundle: "khuym-kiro",
    bundle_version: bundleVersion,
    installed_at: utcNow(),
    status: "complete",
    managed_assets: {
      agents_mode: mergedAgents.status,
      support_scripts: supportScripts,
      bundle_files: bundleFiles,
      state_file: path.relative(repoRoot, statePath),
    },
    notes: [],
  };
  fs.writeFileSync(onboardingPath, `${JSON.stringify(onboardingPayload, null, 2)}\n`, "utf8");

  return {
    ...checkRepo(repoRoot),
    applied: true,
    result: onboardingPayload,
  };
}

function parseCliArgs(argv) {
  const args = { repoRoot: undefined, apply: false };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--repo-root") {
      args.repoRoot = argv[index + 1];
      index += 1;
      continue;
    }
    if (arg.startsWith("--repo-root=")) {
      args.repoRoot = arg.slice("--repo-root=".length);
      continue;
    }
    if (arg === "--apply") {
      args.apply = true;
      continue;
    }
    if (arg === "--help" || arg === "-h") {
      process.stdout.write(
        [
          "Usage: onboard_khuym.mjs [--repo-root <path>] [--apply]",
          "",
          "Checks or applies Khuym repo onboarding for Kiro.",
        ].join("\n"),
      );
      process.exit(0);
    }
    throw new Error(`Unknown argument: ${arg}`);
  }
  return args;
}

export function main(argv = process.argv.slice(2)) {
  const args = parseCliArgs(argv);
  const repoRoot = resolveRepoRoot(args.repoRoot);
  const payload = args.apply ? applyRepo(repoRoot) : checkRepo(repoRoot);
  process.stdout.write(`${JSON.stringify(payload, null, 2)}\n`);
  return payload.status === "missing_runtime" ? 1 : 0;
}

if (process.argv[1] && path.resolve(process.argv[1]) === SCRIPT_PATH) {
  process.exitCode = main();
}
