# Brahmini Workbench

Brahmini is the MAATAA demo host's assistant for package help, docs, product planning, and agent collaboration. Its global entry point is available throughout the demo.

## Work areas

- **Help & docs** searches the bundled local documentation first, includes the current MAATAA route as context, and can ask a selected model to answer from matching excerpts.
- **Product Forge** runs a user-selected set of specialist agents in sequence. Each receives prior handoffs. Brahmini then assembles a draft product kit with a brief, routes and flows, data and demo plan, design and accessibility notes, a React starter draft, and acceptance checks.
- **Reviewed product schema** turns an idea into bounded graph JSON, checks exact quoted source text and graph references, maps supported UI needs to canonical component bindings, validates a `CompositionSpecV1`, and offers TypeScript and TSX drafts plus a Sandbox preview. Review the graph and its unknowns before export; unknown or unmapped requirements remain visible for human decisions.
- **Agent council** convenes identities to review current MAATAA catalog counts and propose a sequenced ecosystem evolution plan. These are proposals, not approved roadmap changes.
- **Teach Brahmini** stores product principles and accepted decisions in this browser. The notes are included in future prompts; this is context retrieval, not fine-tuning or a change to model weights.
- **Providers** shows connection status and lets you assign a provider to each agent.

## Provider setup

Run `pnpm brahmini:dev` from the repository root. This starts the Vite demo and its loopback-only Node runtime together. The demo proxy forwards `/api/brahmini` requests to `127.0.0.1:4175`.

Ollama must be running locally. To use a different address, set `OLLAMA_BASE_URL`. To enable a cloud provider, create an ignored `.env.brahmini.local` in the repository root with the provider's server-side key:

```dotenv
ANTHROPIC_API_KEY=your-anthropic-key
GEMINI_API_KEY=your-gemini-key
```

The lines above are placeholders. Keep actual credentials in the ignored local file or the process environment. The browser receives provider status and model names, not keys. Model defaults can be changed with `BRAHMINI_ANTHROPIC_MODEL` and `BRAHMINI_GEMINI_MODEL`. The Ollama default address is `http://127.0.0.1:11434`; available model names and digests are discovered from that running service.

## Data and authority boundary

Prompts are sent only after the user submits a request to the selected connected provider. Local docs are matched in the browser and relevant excerpts are added to the request. No prompt transcript is persisted by the runtime. Working notes and provider assignments are stored in browser local storage. Do not include secrets or sensitive personal data in prompts. Requests beyond the documented limits are rejected rather than silently truncated. Agent handoffs are excerpted to a fixed context budget when needed; full replies remain visible for review. The local runtime reports elapsed time, model/input hashes, and Ollama timing/token statistics when supplied by Ollama; cloud model digests are not claimed.

Generated frontend source is a draft shown for review and download. Brahmini does not edit the checkout, run generated code, deploy, open tickets, or make roadmap commitments. `@maataa/ui` remains a provider-neutral visual package; the local demo host owns this optional runtime.
