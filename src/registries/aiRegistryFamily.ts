export const AI_REGISTRY_FAMILY = [
  {
    "ordinal": 1,
    "id": "REGISTRY.AI.MODEL",
    "name": "Model Registry",
    "authority": "host-or-platform",
    "kind": "catalog"
  },
  {
    "ordinal": 2,
    "id": "REGISTRY.AI.MODEL_CAPABILITY",
    "name": "Model Capability Registry",
    "authority": "host-or-platform",
    "kind": "catalog"
  },
  {
    "ordinal": 3,
    "id": "REGISTRY.AI.MODEL_VERSION",
    "name": "Model Version Registry",
    "authority": "host-or-platform",
    "kind": "catalog"
  },
  {
    "ordinal": 4,
    "id": "REGISTRY.AI.AGENT",
    "name": "Agent Registry",
    "authority": "host-or-platform",
    "kind": "catalog"
  },
  {
    "ordinal": 5,
    "id": "REGISTRY.AI.AGENT_VERSION",
    "name": "Agent Version Registry",
    "authority": "host-or-platform",
    "kind": "catalog"
  },
  {
    "ordinal": 6,
    "id": "REGISTRY.AI.PROMPT",
    "name": "Prompt Registry",
    "authority": "host-or-platform",
    "kind": "catalog"
  },
  {
    "ordinal": 7,
    "id": "REGISTRY.AI.PROMPT_TEMPLATE",
    "name": "Prompt Template Registry",
    "authority": "host-or-platform",
    "kind": "catalog"
  },
  {
    "ordinal": 8,
    "id": "REGISTRY.AI.TOOL",
    "name": "AI Tool Registry",
    "authority": "host-or-platform",
    "kind": "catalog"
  },
  {
    "ordinal": 9,
    "id": "REGISTRY.AI.FUNCTION",
    "name": "Function Registry",
    "authority": "host-or-platform",
    "kind": "catalog"
  },
  {
    "ordinal": 10,
    "id": "REGISTRY.AI.CONNECTOR",
    "name": "Connector Registry",
    "authority": "host-or-platform",
    "kind": "catalog"
  },
  {
    "ordinal": 11,
    "id": "REGISTRY.AI.MCP_SERVER",
    "name": "MCP Server Registry",
    "authority": "host-or-platform",
    "kind": "catalog"
  },
  {
    "ordinal": 12,
    "id": "REGISTRY.AI.KNOWLEDGE_SOURCE",
    "name": "Knowledge Source Registry",
    "authority": "host-or-platform",
    "kind": "catalog"
  },
  {
    "ordinal": 13,
    "id": "REGISTRY.AI.KNOWLEDGE_INDEX",
    "name": "Knowledge Index Registry",
    "authority": "host-or-platform",
    "kind": "catalog"
  },
  {
    "ordinal": 14,
    "id": "REGISTRY.AI.EMBEDDING_MODEL",
    "name": "Embedding Model Registry",
    "authority": "host-or-platform",
    "kind": "catalog"
  },
  {
    "ordinal": 15,
    "id": "REGISTRY.AI.RETRIEVER",
    "name": "Retriever Registry",
    "authority": "host-or-platform",
    "kind": "catalog"
  },
  {
    "ordinal": 16,
    "id": "REGISTRY.AI.RERANKER",
    "name": "Reranker Registry",
    "authority": "host-or-platform",
    "kind": "catalog"
  },
  {
    "ordinal": 17,
    "id": "REGISTRY.AI.DATASET",
    "name": "Dataset Registry",
    "authority": "host-or-platform",
    "kind": "catalog"
  },
  {
    "ordinal": 18,
    "id": "REGISTRY.AI.EVALUATION",
    "name": "Evaluation Registry",
    "authority": "host-or-platform",
    "kind": "catalog"
  },
  {
    "ordinal": 19,
    "id": "REGISTRY.AI.EVALUATOR",
    "name": "Evaluator Registry",
    "authority": "host-or-platform",
    "kind": "catalog"
  },
  {
    "ordinal": 20,
    "id": "REGISTRY.AI.RUBRIC",
    "name": "Rubric Registry",
    "authority": "host-or-platform",
    "kind": "catalog"
  },
  {
    "ordinal": 21,
    "id": "REGISTRY.AI.GUARDRAIL",
    "name": "Guardrail Registry",
    "authority": "host-or-platform",
    "kind": "catalog"
  },
  {
    "ordinal": 22,
    "id": "REGISTRY.AI.SAFETY_POLICY",
    "name": "Safety Policy Registry",
    "authority": "host-or-platform",
    "kind": "catalog"
  },
  {
    "ordinal": 23,
    "id": "REGISTRY.AI.ROUTER",
    "name": "Router Registry",
    "authority": "host-or-platform",
    "kind": "catalog"
  },
  {
    "ordinal": 24,
    "id": "REGISTRY.AI.WORKFLOW",
    "name": "AI Workflow Registry",
    "authority": "host-or-platform",
    "kind": "catalog"
  },
  {
    "ordinal": 25,
    "id": "REGISTRY.AI.CONTEXT_POLICY",
    "name": "Context Policy Registry",
    "authority": "host-or-platform",
    "kind": "catalog"
  },
  {
    "ordinal": 26,
    "id": "REGISTRY.AI.MEMORY_POLICY",
    "name": "Memory Policy Registry",
    "authority": "host-or-platform",
    "kind": "catalog"
  },
  {
    "ordinal": 27,
    "id": "REGISTRY.AI.OUTPUT_SCHEMA",
    "name": "Output Schema Registry",
    "authority": "host-or-platform",
    "kind": "catalog"
  },
  {
    "ordinal": 28,
    "id": "REGISTRY.AI.PROVIDER",
    "name": "AI Provider Registry",
    "authority": "host-or-platform",
    "kind": "catalog"
  },
  {
    "ordinal": 29,
    "id": "REGISTRY.AI.RUNTIME_BINDING",
    "name": "AI Runtime Binding Registry",
    "authority": "host-or-platform",
    "kind": "catalog"
  },
  {
    "ordinal": 30,
    "id": "REGISTRY.AI.OBSERVABILITY_METRIC",
    "name": "AI Observability Metric Registry",
    "authority": "host-or-platform",
    "kind": "catalog"
  },
  {
    "ordinal": 31,
    "id": "REGISTRY.AI.COST_POLICY",
    "name": "AI Cost Policy Registry",
    "authority": "host-or-platform",
    "kind": "catalog"
  },
  {
    "ordinal": 32,
    "id": "REGISTRY.AI.EVIDENCE",
    "name": "AI Evidence Registry",
    "authority": "host-or-platform",
    "kind": "catalog"
  }
] as const;
export type AIRegistryDefinition = (typeof AI_REGISTRY_FAMILY)[number];
