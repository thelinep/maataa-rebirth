# MAATAA AI UI Architecture

```text
AI SPACE
   │
   ├── GENERATORS
   ├── TOOLS
   └── STUDIOS / WORKSPACES
          ↓
      AI WORKFLOW
          ↓
  AGENT / MODEL / TOOL
          ↓
 PROMPT / ROUTER / CONNECTOR
          ↓
 CONTEXT / KNOWLEDGE / RAG / MEMORY / DATA
          ↓
 EVALUATION / SAFETY
          ↓
 EVIDENCE / PROVENANCE
          ↓
 OBSERVABILITY
```

`@maataa/ui` implements visual/editor surfaces, atomic regions, registries and composition metadata only. It does **not** execute models or agents, call external tools, store secrets, authorize users, or become an AI runtime. Host/platform services own those responsibilities.

## Brahmini demo host

The Redux demo now includes an optional Brahmini Workbench as a separate local host runtime. It provides MAATAA help/document lookup, idea-to-product agent handoffs, an ecosystem council, and locally stored working notes. Agent identities have task prompts and can be assigned to a model provider; a user starts each run explicitly. Agent outputs are proposals and reviewable drafts: this runtime does not write to the repository, execute generated code, deploy products, or fine-tune model weights.

The local runtime can call Ollama on the workstation and server-configured Anthropic or Google Gemini APIs. Provider requests pass through `examples/redux-demo/brahmini-runtime.mjs`; cloud keys stay in the local Node process and are never sent to browser code. This is a local demonstration boundary, not a production multi-tenant service. A production deployment needs authenticated server-side secrets, authorization, persistence, rate limits, retention policy, telemetry controls, and explicit tool permissions.

Run the bundled UI and local proxy with `pnpm brahmini:dev`. For cloud providers, place `ANTHROPIC_API_KEY` and/or `GEMINI_API_KEY` in the ignored `.env.brahmini.local` file or the ignored root `.env`; the runtime reads only those two cloud keys from root `.env`. Process environment variables take precedence, followed by `.env.brahmini.local`, then root `.env`. For local inference, start Ollama and install the chosen model; `OLLAMA_BASE_URL` can select a local endpoint. No key or prompt is persisted by the runtime. The browser may save explicit Brahmini working notes and provider assignments in local storage.

## Factual-correctness surfaces

The AI evaluation vocabulary explicitly includes Grounding Eval, Citation Eval, Hallucination Eval, Factuality Eval and Unsupported Claim Detection, along with evidence and provenance surfaces.
