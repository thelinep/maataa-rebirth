import { describe, expect, it } from "vitest";
import { loadBrahminiEnvironment } from "../examples/redux-demo/brahmini-config.mjs";

describe("Brahmini server configuration", () => {
  it("prefers process environment, then the dedicated local file, then root cloud keys", () => {
    const files: Record<string, string> = {
      local: "GEMINI_API_KEY=dedicated-gemini\nOLLAMA_BASE_URL=http://localhost:11434",
      root: "GEMINI_API_KEY=root-gemini\nANTHROPIC_API_KEY=root-anthropic",
    };
    const environment: Record<string, string> = {
      GEMINI_API_KEY: "process-gemini",
    };

    loadBrahminiEnvironment({
      environment,
      localConfigPath: "local",
      rootEnvPath: "root",
      readFile: path => files[path],
    });

    expect(environment).toEqual({
      GEMINI_API_KEY: "process-gemini",
      OLLAMA_BASE_URL: "http://localhost:11434",
      ANTHROPIC_API_KEY: "root-anthropic",
    });
  });

  it("limits root .env loading to the two server-side cloud credentials", () => {
    const environment: Record<string, string> = {};
    loadBrahminiEnvironment({
      environment,
      rootEnvPath: "root",
      readFile: () => [
        "GEMINI_API_KEY='root-gemini'",
        "ANTHROPIC_API_KEY=root-anthropic",
        "OLLAMA_BASE_URL=http://untrusted-root-config",
        "VITE_GEMINI_API_KEY=must-not-load",
        "OPENAI_API_KEY=must-not-load",
      ].join("\n"),
    });

    expect(environment).toEqual({
      GEMINI_API_KEY: "root-gemini",
      ANTHROPIC_API_KEY: "root-anthropic",
    });
  });

  it("preserves explicit environment values and tolerates absent files", () => {
    const environment: Record<string, string> = {
      GEMINI_API_KEY: "process-gemini",
      ANTHROPIC_API_KEY: "process-anthropic",
    };
    loadBrahminiEnvironment({
      environment,
      localConfigPath: "missing-local",
      rootEnvPath: "missing-root",
      readFile: () => { throw new Error("not found"); },
    });
    expect(environment).toEqual({
      GEMINI_API_KEY: "process-gemini",
      ANTHROPIC_API_KEY: "process-anthropic",
    });
  });
});
