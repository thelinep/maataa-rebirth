import { describe, expect, it } from "vitest";
import { validateChat } from "../examples/redux-demo/brahmini-input.mjs";

const valid = {
  provider: "ollama",
  model: "qwen2.5-coder:7b",
  system: "Keep host authority explicit.",
  messages: [{ role: "user", content: "Build a draft." }],
};

describe("Brahmini runtime request bounds", () => {
  it("preserves complete accepted prompt and message content", () => {
    expect(validateChat(valid)).toEqual(valid);
  });

  it("rejects rather than silently truncates oversized content and history", () => {
    expect(() =>
      validateChat({ ...valid, system: "x".repeat(24_001) }),
    ).toThrow(/no context is dropped/);
    expect(() =>
      validateChat({
        ...valid,
        messages: [{ role: "user", content: "x".repeat(12_001) }],
      }),
    ).toThrow(/shorten it before sending/);
    expect(() =>
      validateChat({
        ...valid,
        messages: Array.from({ length: 17 }, () => valid.messages[0]),
      }),
    ).toThrow(/does not silently discard/);
  });

  it("rejects empty or malformed provider requests with an HTTP status", () => {
    try {
      validateChat({ provider: "unknown", model: "", messages: [] });
      throw new Error("Expected validation to fail");
    } catch (error) {
      expect(error).toMatchObject({ status: 400 });
    }
  });
});
