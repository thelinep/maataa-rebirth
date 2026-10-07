import { readFileSync } from "node:fs";

const RUNTIME_KEYS = new Set([
  "ANTHROPIC_API_KEY",
  "GEMINI_API_KEY",
  "OLLAMA_BASE_URL",
  "BRAHMINI_RUNTIME_PORT",
  "BRAHMINI_ALLOWED_ORIGINS",
  "BRAHMINI_ANTHROPIC_MODEL",
  "BRAHMINI_GEMINI_MODEL",
]);
const ROOT_ENV_KEYS = new Set(["ANTHROPIC_API_KEY", "GEMINI_API_KEY"]);

function entries(contents, allowlist) {
  return contents.split(/\r?\n/).flatMap((line) => {
    const match = line.trim().match(/^(?:export\s+)?([A-Z][A-Z0-9_]*)\s*=\s*(.*)$/);
    if (!match || !allowlist.has(match[1])) return [];
    const value = match[2].trim().replace(/^(['"])(.*)\1$/, "$2");
    return value && !value.startsWith("#") ? [[match[1], value]] : [];
  });
}

/** Load server-only Brahmini configuration. Process env wins, then the
 * dedicated local file, then cloud credentials from the ignored root .env. */
export function loadBrahminiEnvironment({
  environment = process.env,
  localConfigPath,
  rootEnvPath,
  readFile = readFileSync,
} = {}) {
  const load = (path, allowlist) => {
    if (!path) return;
    try {
      for (const [key, value] of entries(readFile(path, "utf8"), allowlist)) {
        if (!environment[key]) environment[key] = value;
      }
    } catch {
      // Local credentials are optional; provider status reports missing config.
    }
  };

  load(localConfigPath, RUNTIME_KEYS);
  load(rootEnvPath, ROOT_ENV_KEYS);
  return environment;
}
