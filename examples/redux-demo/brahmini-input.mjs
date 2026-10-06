/** Reject over-limit prompts rather than silently dropping context. */
export function validateChat(input) {
  const provider = ["ollama", "anthropic", "gemini"].includes(input.provider)
    ? input.provider
    : null;
  const model = typeof input.model === "string" ? input.model.trim() : "";
  const system = typeof input.system === "string" ? input.system : "";
  if (model.length > 160)
    throw Object.assign(
      new Error("Model identifiers must be under 160 characters."),
      { status: 400 },
    );
  if (system.length > 24_000)
    throw Object.assign(
      new Error(
        "System instructions exceed the 24,000 character limit; shorten the request so no context is dropped.",
      ),
      { status: 413 },
    );
  if (!Array.isArray(input.messages) || input.messages.length > 16)
    throw Object.assign(
      new Error(
        "Send between 1 and 16 complete messages; the runtime does not silently discard conversation history.",
      ),
      { status: 413 },
    );
  const messages = input.messages
    .map((message) => {
      const content =
        typeof message?.content === "string" ? message.content : "";
      if (content.length > 12_000)
        throw Object.assign(
          new Error(
            "A message exceeds the 12,000 character limit; shorten it before sending.",
          ),
          { status: 413 },
        );
      return {
        role: message?.role === "assistant" ? "assistant" : "user",
        content,
      };
    })
    .filter((message) => message.content);
  if (!provider || !model || messages.length === 0)
    throw Object.assign(
      new Error(
        "Choose a provider and model, and include at least one message.",
      ),
      { status: 400 },
    );
  return { provider, model, system, messages };
}
