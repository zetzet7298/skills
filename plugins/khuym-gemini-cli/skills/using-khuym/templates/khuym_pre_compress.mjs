#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

function findRepoRoot(start) {
  let candidate = path.resolve(start || ".");
  while (true) {
    if (fs.existsSync(path.join(candidate, ".khuym", "onboarding.json"))) {
      return candidate;
    }
    if (fs.existsSync(path.join(candidate, ".git"))) {
      return candidate;
    }
    const parent = path.dirname(candidate);
    if (parent === candidate) {
      return candidate;
    }
    candidate = parent;
  }
}

async function readPayload() {
  const chunks = [];
  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }
  const raw = Buffer.concat(chunks).toString("utf8");
  return JSON.parse(raw || "{}");
}

function readIfExists(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return "";
  }
}

export async function main() {
  const payload = await readPayload();
  const repoRoot = findRepoRoot(payload.cwd || ".");
  const parts = [];

  const stateJson = readIfExists(path.join(repoRoot, ".khuym", "state.json"));
  const stateMd = readIfExists(path.join(repoRoot, ".khuym", "STATE.md"));
  const handoff = readIfExists(path.join(repoRoot, ".khuym", "HANDOFF.json"));

  if (stateJson) {
    parts.push(`## .khuym/state.json
${stateJson}`);
  }
  if (stateMd) {
    parts.push(`## .khuym/STATE.md
${stateMd}`);
  }
  if (handoff) {
    parts.push(`## .khuym/HANDOFF.json
${handoff}`);
  }

  const output = { suppressOutput: true };
  if (parts.length > 0) {
    output.systemMessage = `Khuym compression context follows. Re-open these files after compaction if you continue working in this repo.

${parts.join("

")}`;
  }

  process.stdout.write(JSON.stringify(output));
  return 0;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  process.exitCode = await main();
}
