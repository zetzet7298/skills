import fs from "node:fs/promises";
import path from "node:path";

async function readIfExists(filePath) {
  try {
    return await fs.readFile(filePath, "utf8");
  } catch {
    return "";
  }
}

export const KhuymHooksPlugin = async ({ directory, client }) => {
  return {
    "experimental.session.compacting": async (_input, output) => {
      const stateJson = await readIfExists(path.join(directory, ".khuym", "state.json"));
      const stateMd = await readIfExists(path.join(directory, ".khuym", "STATE.md"));
      const handoff = await readIfExists(path.join(directory, ".khuym", "HANDOFF.json"));
      const extra = [stateJson && `## .khuym/state.json
${stateJson}`, stateMd && `## .khuym/STATE.md
${stateMd}`, handoff && `## .khuym/HANDOFF.json
${handoff}`].filter(Boolean).join("

");
      if (extra) {
        output.context.push(extra);
      }
    },
    "session.created": async () => {
      if (client?.app?.log) {
        await client.app.log({
          body: {
            service: "khuym-opencode",
            level: "info",
            message: "Khuym OpenCode plugin initialized",
          },
        });
      }
    },
  };
};
