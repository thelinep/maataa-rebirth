import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { createHash } from "node:crypto";
import { validateChat } from "./brahmini-input.mjs";
import { previewProductScaffold, scaffoldDigest, writeProductScaffold } from "./productScaffold.mjs";
import { loadBrahminiEnvironment } from "./brahmini-config.mjs";

loadBrahminiEnvironment({
  localConfigPath: resolve(fileURLToPath(new URL("../../.env.brahmini.local", import.meta.url))),
  rootEnvPath: resolve(fileURLToPath(new URL("../../.env", import.meta.url))),
});

const port = Number(process.env.BRAHMINI_RUNTIME_PORT || 4175);
const ollamaBase = (
  process.env.OLLAMA_BASE_URL || "http://127.0.0.1:11434"
).replace(/\/$/, "");
const allowedOrigins = new Set(
  (
    process.env.BRAHMINI_ALLOWED_ORIGINS ||
    "http://127.0.0.1:4173,http://localhost:4173,http://127.0.0.1:4174,http://localhost:4174"
  )
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean),
);
const defaults = {
  anthropic: process.env.BRAHMINI_ANTHROPIC_MODEL || "claude-sonnet-5-5",
  gemini: process.env.BRAHMINI_GEMINI_MODEL || "gemini-2.5-flash-lite",
};
const generatedAppsDirectory = resolve(fileURLToPath(new URL("../../generated-apps", import.meta.url)));

function json(res, status, value) {
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    "x-content-type-options": "nosniff",
  });
  res.end(JSON.stringify(value));
}

async function bodyJson(req) {
  let body = "";
  for await (const chunk of req) {
    body += chunk;
    if (body.length > 180_000)
      throw Object.assign(new Error("Request is too large (180 KB limit)."), {
        status: 413,
      });
  }
  try {
    return JSON.parse(body || "{}");
  } catch {
    throw Object.assign(new Error("Request body must be valid JSON."), {
      status: 400,
    });
  }
}

async function ollamaModels() {
  const response = await fetch(`${ollamaBase}/api/tags`, {
    signal: AbortSignal.timeout(1500),
  });
  if (!response.ok) throw new Error(`Ollama returned ${response.status}.`);
  const data = await response.json();
  return Array.isArray(data.models)
      ? data.models.map((model) => ({
        id: String(model.name),
        label: String(model.name),
        digest: typeof model.digest === "string" ? model.digest : undefined,
      }))
    : [];
}

async function providerStatus() {
  let ollama = {
    configured: false,
    models: [],
    message: "Ollama is not reachable at the configured local address.",
  };
  try {
    ollama = {
      configured: true,
      models: await ollamaModels(),
      message: "Connected to the local Ollama service.",
    };
  } catch {
    /* Report local runtime as unavailable without leaking host errors. */
  }
  const anthropicKey = Boolean(process.env.ANTHROPIC_API_KEY);
  const geminiKey = Boolean(process.env.GEMINI_API_KEY);
  return [
    {
      id: "ollama",
      label: "Local Ollama",
      configured: ollama.configured,
      models: ollama.models,
      message: ollama.message,
    },
    {
      id: "anthropic",
      label: "Anthropic",
      configured: anthropicKey,
      models: [{ id: defaults.anthropic, label: defaults.anthropic }],
      message: anthropicKey
        ? "Server credential is configured."
        : "Set ANTHROPIC_API_KEY in the runtime environment.",
    },
    {
      id: "gemini",
      label: "Google Gemini",
      configured: geminiKey,
      models: [{ id: defaults.gemini, label: defaults.gemini }],
      message: geminiKey
        ? "Server credential is configured."
        : "Set GEMINI_API_KEY in the runtime environment.",
    },
  ];
}

async function chatOllama({ model, system, messages }) {
  const response = await fetch(`${ollamaBase}/api/chat`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    signal: AbortSignal.timeout(120_000),
    body: JSON.stringify({
      model,
      stream: false,
      messages: [
        ...(system ? [{ role: "system", content: system }] : []),
        ...messages,
      ],
    }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok)
    throw new Error(data.error || `Ollama returned ${response.status}.`);
  const milliseconds = (value) => Number.isFinite(value) ? Math.round(value / 1_000_000) : undefined;
  return {
    text: data.message?.content || "", model,
    metrics: {
      loadMs: milliseconds(data.load_duration), promptEvalMs: milliseconds(data.prompt_eval_duration),
      generationMs: milliseconds(data.eval_duration), promptTokens: Number.isFinite(data.prompt_eval_count) ? data.prompt_eval_count : undefined,
      completionTokens: Number.isFinite(data.eval_count) ? data.eval_count : undefined,
    },
  };
}

async function chatAnthropic({ model, system, messages }) {
  if (!process.env.ANTHROPIC_API_KEY)
    throw new Error(
      "Anthropic is not configured. Set ANTHROPIC_API_KEY on the local runtime, then restart it.",
    );
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    signal: AbortSignal.timeout(90_000),
    body: JSON.stringify({
      model,
      max_tokens: 3000,
      ...(system ? { system } : {}),
      messages,
    }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok)
    throw new Error(
      data.error?.message || `Anthropic returned ${response.status}.`,
    );
  return {
    text: Array.isArray(data.content)
      ? data.content
          .filter((part) => part.type === "text")
          .map((part) => part.text)
          .join("\n")
      : "",
    model: data.model || model,
  };
}

async function chatGemini({ model, system, messages }) {
  if (!process.env.GEMINI_API_KEY)
    throw new Error(
      "Gemini is not configured. Set GEMINI_API_KEY on the local runtime, then restart it.",
    );
  const contents = messages.map(({ role, content }) => ({
    role: role === "assistant" ? "model" : "user",
    parts: [{ text: content }],
  }));
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-goog-api-key": process.env.GEMINI_API_KEY,
      },
      signal: AbortSignal.timeout(90_000),
      body: JSON.stringify({
        ...(system ? { systemInstruction: { parts: [{ text: system }] } } : {}),
        contents,
        generationConfig: { maxOutputTokens: 3000 },
      }),
    },
  );
  const data = await response.json().catch(() => ({}));
  if (!response.ok)
    throw new Error(
      data.error?.message || `Gemini returned ${response.status}.`,
    );
  const text =
    data.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || "")
      .join("") || "";
  return { text, model };
}

const server = createServer(async (req, res) => {
  const origin = req.headers.origin;
  if (origin && !allowedOrigins.has(origin))
    return json(res, 403, {
      error:
        "This local runtime accepts requests only from the MAATAA demo origin.",
    });
  const url = new URL(
    req.url || "/",
    `http://${req.headers.host || "127.0.0.1"}`,
  );
  try {
    if (req.method === "GET" && url.pathname === "/api/brahmini/status")
      return json(res, 200, { providers: await providerStatus() });
    if (req.method === "POST" && url.pathname === "/api/brahmini/scaffold/preview") {
      const preview = previewProductScaffold(await bodyJson(req));
      return json(res, 200, { ...preview, previewSha256: scaffoldDigest(preview.files) });
    }
    if (req.method === "POST" && url.pathname === "/api/brahmini/scaffold/create") {
      if (!origin || !allowedOrigins.has(origin))
        return json(res, 403, { error: "App folders can only be created from an allowed MAATAA local origin." });
      const result = await writeProductScaffold(await bodyJson(req), generatedAppsDirectory);
      return json(res, 201, result);
    }
    if (req.method === "POST" && url.pathname === "/api/brahmini/chat") {
      const input = validateChat(await bodyJson(req));
      const startedAt = Date.now();
      const promptSha256 = createHash("sha256").update(`${input.system}\n${JSON.stringify(input.messages)}`).digest("hex");
      let modelDigest;
      if (input.provider === "ollama") {
        const localModels = await ollamaModels();
        const selectedModel = localModels.find((item) => item.id === input.model);
        if (!selectedModel)
          throw Object.assign(
            new Error(
              "That model is not listed by the configured Ollama service. Refresh provider status and choose an installed model.",
            ),
            { status: 400 },
          );
        modelDigest = selectedModel.digest;
      } else if (input.model !== defaults[input.provider]) {
        throw Object.assign(
          new Error(
            "Choose the server-configured model shown by provider status.",
          ),
          { status: 400 },
        );
      }
      const result =
        input.provider === "ollama"
          ? await chatOllama(input)
          : input.provider === "anthropic"
            ? await chatAnthropic(input)
            : await chatGemini(input);
      return json(res, 200, { ...result, provider: input.provider, modelDigest, promptSha256, metrics: { ...result.metrics, elapsedMs: Date.now() - startedAt } });
    }
    return json(res, 404, { error: "Unknown Brahmini runtime route." });
  } catch (error) {
    const status = Number(error?.status) || 502;
    let message =
      error instanceof Error ? error.message : "The provider request failed.";
    for (const secret of [
      process.env.ANTHROPIC_API_KEY,
      process.env.GEMINI_API_KEY,
    ].filter(Boolean))
      message = message.replaceAll(secret, "[redacted]");
    return json(res, status, { error: message.slice(0, 800) });
  }
});

server.listen(port, "127.0.0.1", () =>
  process.stdout.write(
    `Brahmini local runtime listening on http://127.0.0.1:${port}\n`,
  ),
);
server.on("error", (error) => {
  process.stderr.write(`Brahmini runtime failed to start: ${error.message}\n`);
  process.exitCode = 1;
});
