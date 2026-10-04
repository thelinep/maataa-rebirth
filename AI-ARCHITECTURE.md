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

## Factual-correctness surfaces

The AI evaluation vocabulary explicitly includes Grounding Eval, Citation Eval, Hallucination Eval, Factuality Eval and Unsupported Claim Detection, along with evidence and provenance surfaces.
