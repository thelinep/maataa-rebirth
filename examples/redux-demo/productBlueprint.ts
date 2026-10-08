import { COMPOSER_COMPONENT_BINDINGS } from "../../src/composer/componentBindings.generated";
import {
  createComposerBlock,
  DEFAULT_COMPOSER_SCENE,
} from "../../src/composer/defaults";
import { generateComposerJsx } from "../../src/composer/codegen";
import {
  validateCompositionSpec,
  toCompositionSpec,
} from "../../src/composer/spec";
import { isCompositionData } from "../../src/composer/sceneData";
import type {
  ComposerBlock,
  ComposerBlockKind,
  CompositionSpecV1,
} from "../../src/composer/types";

export const PRODUCT_GRAPH_SCHEMA = "maataa.product-graph.v1" as const;
export const PRODUCT_SNAPSHOT_SCHEMA = "maataa.product-snapshot.v1" as const;

export type ProductNodeKind =
  "actor" | "entity" | "action" | "state" | "rule" | "data" | "constraint";
export type ProductUiNeed =
  | "heading"
  | "text"
  | "input"
  | "button"
  | "card"
  | "table"
  | "metric"
  | "badge"
  | "divider"
  | "unmapped";
export type ProductEdgeKind =
  | "owns"
  | "acts-on"
  | "transitions-to"
  | "depends-on"
  | "constrained-by"
  | "informs";
export interface ProductGraphNode {
  id: string;
  kind: ProductNodeKind;
  label: string;
  detail: string;
  uiNeed: ProductUiNeed;
  sourceQuote: string | null;
  confidence: "high" | "medium" | "low";
}
export interface ProductGraphEdge {
  id: string;
  from: string;
  to: string;
  kind: ProductEdgeKind;
}
export interface ProductGraphV1 {
  schemaVersion: typeof PRODUCT_GRAPH_SCHEMA;
  id: string;
  name: string;
  idea: string;
  audience: string;
  nodes: ProductGraphNode[];
  edges: ProductGraphEdge[];
  unknowns: string[];
}
export interface ProductNodeMapping {
  nodeId: string;
  componentId: string | null;
  componentName: string | null;
  importPath: string | null;
  evidence: string;
  status: "canonical-binding" | "unmapped";
}
export interface ProductSnapshotV1 {
  schemaVersion: typeof PRODUCT_SNAPSHOT_SCHEMA;
  graph: ProductGraphV1;
  mappings: ProductNodeMapping[];
  composition: CompositionSpecV1;
  generatedComponentSource: string;
  warnings: string[];
  createdAt: string;
}

const NODE_KINDS = new Set<ProductNodeKind>([
  "actor",
  "entity",
  "action",
  "state",
  "rule",
  "data",
  "constraint",
]);
const UI_NEEDS = new Set<ProductUiNeed>([
  "heading",
  "text",
  "input",
  "button",
  "card",
  "table",
  "metric",
  "badge",
  "divider",
  "unmapped",
]);
const EDGE_KINDS = new Set<ProductEdgeKind>([
  "owns",
  "acts-on",
  "transitions-to",
  "depends-on",
  "constrained-by",
  "informs",
]);
const BLOCK_FOR_NEED: Partial<Record<ProductUiNeed, ComposerBlockKind>> = {
  heading: "heading",
  text: "text",
  input: "input",
  button: "button",
  card: "card",
  table: "table",
  metric: "metric",
  badge: "badge",
  divider: "divider",
};
const ID_PATTERN = /^[a-z0-9][a-z0-9-]{1,63}$/;
const LIMITS = {
  maxText: 4000,
  maxNodes: 80,
  maxEdges: 160,
  maxUnknowns: 40,
  maxMappings: 20,
} as const;

function record(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}
function text(value: unknown, max: number = LIMITS.maxText): value is string {
  return (
    typeof value === "string" && value.trim().length > 0 && value.length <= max
  );
}
function id(value: unknown): value is string {
  return typeof value === "string" && ID_PATTERN.test(value);
}

/** Strict runtime gate for provider-produced or user-edited product graph JSON. */
export function validateProductGraph(
  input: unknown,
):
  | { valid: true; graph: ProductGraphV1; errors: [] }
  | { valid: false; graph?: undefined; errors: string[] } {
  const errors: string[] = [];
  if (!isCompositionData(input) || !record(input))
    return {
      valid: false,
      errors: [
        "Product graph must be bounded, plain JSON data without unsafe keys or accessors.",
      ],
    };
  const value = input as Record<string, unknown>;
  const rootFields = [
    "schemaVersion",
    "id",
    "name",
    "idea",
    "audience",
    "nodes",
    "edges",
    "unknowns",
  ];
  if (Object.keys(value).some((key) => !rootFields.includes(key)))
    errors.push("Product graph contains unknown top-level fields.");
  if (value.schemaVersion !== PRODUCT_GRAPH_SCHEMA)
    errors.push(`schemaVersion must be ${PRODUCT_GRAPH_SCHEMA}.`);
  if (!id(value.id))
    errors.push("id must be a lowercase slug of 2–64 characters.");
  if (!text(value.name, 120)) errors.push("name must be 1–120 characters.");
  if (!text(value.idea, LIMITS.maxText))
    errors.push("idea must be 1–4,000 characters.");
  if (!text(value.audience, 240))
    errors.push(
      "audience must be 1–240 characters; use 'Unspecified' when unknown.",
    );
  if (
    !Array.isArray(value.nodes) ||
    value.nodes.length < 1 ||
    value.nodes.length > LIMITS.maxNodes
  )
    errors.push(`nodes must contain 1–${LIMITS.maxNodes} entries.`);
  if (!Array.isArray(value.edges) || value.edges.length > LIMITS.maxEdges)
    errors.push(`edges must contain 0–${LIMITS.maxEdges} entries.`);
  if (
    !Array.isArray(value.unknowns) ||
    value.unknowns.length > LIMITS.maxUnknowns ||
    value.unknowns.some((item) => !text(item, 500))
  )
    errors.push(
      `unknowns must contain at most ${LIMITS.maxUnknowns} short questions.`,
    );

  const nodeIds = new Set<string>();
  if (Array.isArray(value.nodes))
    value.nodes.forEach((candidate, index) => {
      if (!record(candidate)) {
        errors.push(`nodes[${index}] must be an object.`);
        return;
      }
      const fields = [
        "id",
        "kind",
        "label",
        "detail",
        "uiNeed",
        "sourceQuote",
        "confidence",
      ];
      if (Object.keys(candidate).some((key) => !fields.includes(key)))
        errors.push(`nodes[${index}] contains unknown fields.`);
      if (!id(candidate.id) || nodeIds.has(candidate.id))
        errors.push(`nodes[${index}].id must be a unique lowercase slug.`);
      else nodeIds.add(candidate.id);
      if (!NODE_KINDS.has(candidate.kind as ProductNodeKind))
        errors.push(`nodes[${index}].kind is unsupported.`);
      if (!text(candidate.label, 160))
        errors.push(`nodes[${index}].label must be 1–160 characters.`);
      if (!text(candidate.detail, 800))
        errors.push(`nodes[${index}].detail must be 1–800 characters.`);
      if (!UI_NEEDS.has(candidate.uiNeed as ProductUiNeed))
        errors.push(`nodes[${index}].uiNeed is unsupported.`);
      if (candidate.sourceQuote !== null && !text(candidate.sourceQuote, 500))
        errors.push(
          `nodes[${index}].sourceQuote must be null or a short exact quote from the idea.`,
        );
      if (
        typeof candidate.sourceQuote === "string" &&
        typeof value.idea === "string" &&
        !value.idea.includes(candidate.sourceQuote)
      )
        errors.push(
          `nodes[${index}].sourceQuote is not an exact substring of the submitted idea.`,
        );
      if (!["high", "medium", "low"].includes(candidate.confidence as string))
        errors.push(`nodes[${index}].confidence is unsupported.`);
    });
  const edgeIds = new Set<string>();
  if (Array.isArray(value.edges))
    value.edges.forEach((candidate, index) => {
      if (!record(candidate)) {
        errors.push(`edges[${index}] must be an object.`);
        return;
      }
      if (
        Object.keys(candidate).some(
          (key) => !["id", "from", "to", "kind"].includes(key),
        )
      )
        errors.push(`edges[${index}] contains unknown fields.`);
      if (!id(candidate.id) || edgeIds.has(candidate.id))
        errors.push(`edges[${index}].id must be a unique lowercase slug.`);
      else edgeIds.add(candidate.id);
      if (
        !nodeIds.has(String(candidate.from)) ||
        !nodeIds.has(String(candidate.to))
      )
        errors.push(`edges[${index}] must reference existing node IDs.`);
      if (!EDGE_KINDS.has(candidate.kind as ProductEdgeKind))
        errors.push(`edges[${index}].kind is unsupported.`);
    });
  if (errors.length) return { valid: false, errors };
  // The checks above validate this untrusted JSON shape and all bounded fields.
  return { valid: true, graph: input as unknown as ProductGraphV1, errors: [] };
}

export function parseProductGraph(
  source: string,
  expectedIdea?: string,
): ProductGraphV1 {
  if (source.length > 80_000)
    throw new Error("Product graph input exceeds the 80 KB limit.");
  const unfenced = source
    .trim()
    .replace(/^```(?:json)?\s*([\s\S]*?)\s*```$/i, "$1");
  let input: unknown;
  try {
    input = JSON.parse(unfenced);
  } catch {
    throw new Error("Enter valid JSON for the product graph.");
  }
  const result = validateProductGraph(input);
  if (!result.valid) throw new Error(result.errors.join(" "));
  if (
    expectedIdea !== undefined &&
    result.graph.idea.trim() !== expectedIdea.trim()
  )
    throw new Error(
      "The graph idea differs from the submitted idea. Re-extract or restore the original idea before review.",
    );
  return result.graph;
}

function blockForNode(
  node: ProductGraphNode,
  kind: ComposerBlockKind,
): ComposerBlock {
  const block = createComposerBlock(kind, `node-${node.id}`);
  switch (kind) {
    case "heading":
      block.props = { text: node.label, level: 2 };
      break;
    case "text":
      block.props = { text: `${node.label}: ${node.detail}` };
      break;
    case "input":
      block.props = { label: node.label, value: "", placeholder: node.detail };
      break;
    case "button":
      block.props = { label: node.label, variant: "primary" };
      break;
    case "card":
      block.props = { title: node.label, body: node.detail };
      break;
    case "table":
      block.props = { title: node.label };
      break;
    case "metric":
      block.props = {
        label: node.label,
        value: "—",
        helper: "Connect host data",
      };
      break;
    case "badge":
      block.props = { label: node.label, tone: "info" };
      break;
    case "divider":
      block.props = {};
      break;
  }
  return block;
}

export function compileProductGraph(
  graphInput: unknown,
  now = new Date(),
): ProductSnapshotV1 {
  const parsed = validateProductGraph(graphInput);
  if (!parsed.valid) throw new Error(parsed.errors.join(" "));
  const graph = parsed.graph;
  const mappings: ProductNodeMapping[] = [];
  const blocks: ComposerBlock[] = [
    createComposerBlock("heading", "product-title"),
  ];
  let mappedCount = 0;
  for (const node of graph.nodes) {
    const kind = BLOCK_FOR_NEED[node.uiNeed];
    if (!kind || mappedCount >= LIMITS.maxMappings) {
      mappings.push({
        nodeId: node.id,
        componentId: null,
        componentName: null,
        importPath: null,
        evidence: "No supported mapping selected; human review required.",
        status: "unmapped",
      });
      continue;
    }
    const binding = COMPOSER_COMPONENT_BINDINGS[kind];
    blocks.push(blockForNode(node, kind));
    mappings.push({
      nodeId: node.id,
      componentId: binding.componentId,
      componentName: binding.name,
      importPath: binding.path,
      evidence: `src/composer/componentBindings.generated.ts#${kind}`,
      status: "canonical-binding",
    });
    mappedCount += 1;
  }
  const composition = toCompositionSpec({
    ...DEFAULT_COMPOSER_SCENE,
    id: `COMPOSITION.PRODUCT.${graph.id.toUpperCase().replace(/-/g, "_")}`,
    name: `${graph.name} preview`,
    blocks,
    regions: [
      {
        regionId:
          DEFAULT_COMPOSER_SCENE.regions?.[0]?.regionId ??
          "REGION.LAYOUT.LAYOUTCONTENT",
        blockIds: blocks.map((block) => block.id),
      },
    ],
    updatedAt: now.toISOString(),
  });
  const validation = validateCompositionSpec(composition);
  if (!validation.accepted)
    throw new Error(
      `Generated preview composition was rejected: ${validation.errors.join(" ")}`,
    );
  const warnings = [
    "Component matches use canonical MAATAA bindings; semantic fit still needs human review.",
    "The preview uses the recorded MAATAA Composer default workspace/page/layout/device tuple; domain compatibility is not verified.",
    "This is a frontend draft. Business rules, authorization, persistence, integrations, and live data remain host-owned.",
  ];
  if (graph.nodes.some((node) => !node.sourceQuote))
    warnings.push(
      "Some graph nodes have no exact source quote and are model-inferred; confirm or remove them.",
    );
  if (mappings.some((item) => item.status === "unmapped"))
    warnings.push(
      "Some graph nodes have no supported visual mapping; they remain visible in the graph and require a decision.",
    );
  const snapshot: ProductSnapshotV1 = {
    schemaVersion: PRODUCT_SNAPSHOT_SCHEMA,
    graph,
    mappings,
    composition,
    generatedComponentSource: generateComposerJsx(composition),
    warnings,
    createdAt: now.toISOString(),
  };
  return snapshot;
}

export function serializeProductSnapshotAsTypeScript(
  snapshot: ProductSnapshotV1,
): string {
  const validated = compileProductGraph(
    snapshot.graph,
    new Date(snapshot.createdAt),
  );
  if (
    JSON.stringify(validated.composition) !==
    JSON.stringify(snapshot.composition)
  )
    throw new Error(
      "Snapshot composition no longer matches its product graph; compile it again before export.",
    );
  const types = `export type ProductNodeKind = ${[...NODE_KINDS].map((item) => JSON.stringify(item)).join(" | ")};\nexport type ProductUiNeed = ${[...UI_NEEDS].map((item) => JSON.stringify(item)).join(" | ")};\nexport interface ProductGraphNode { id: string; kind: ProductNodeKind; label: string; detail: string; uiNeed: ProductUiNeed; sourceQuote: string | null; confidence: "high" | "medium" | "low"; }\nexport interface ProductGraphEdge { id: string; from: string; to: string; kind: ${[...EDGE_KINDS].map((item) => JSON.stringify(item)).join(" | ")}; }\nexport interface ProductGraphV1 { schemaVersion: "${PRODUCT_GRAPH_SCHEMA}"; id: string; name: string; idea: string; audience: string; nodes: ProductGraphNode[]; edges: ProductGraphEdge[]; unknowns: string[]; }\nexport interface ProductNodeMapping { nodeId: string; componentId: string | null; componentName: string | null; importPath: string | null; evidence: string; status: "canonical-binding" | "unmapped"; }\nexport interface ProductSnapshotV1 { schemaVersion: "${PRODUCT_SNAPSHOT_SCHEMA}"; graph: ProductGraphV1; mappings: ProductNodeMapping[]; composition: import("@maataa/ui/composer").CompositionSpecV1; generatedComponentSource: string; warnings: string[]; createdAt: string; }\n`;
  return `${types}\nexport const productSnapshot = ${JSON.stringify(snapshot, null, 2)} as const satisfies ProductSnapshotV1;\n`;
}

export function productGraphPrompt(idea: string): string {
  return `Convert the user's product idea into JSON data matching this exact schema. Return JSON only: no markdown, JSX, TypeScript, or prose. Do not invent facts. Keep each item atomic. sourceQuote must be an exact substring of the idea or null; set confidence low and sourceQuote null for any inference. Use uiNeed only from: heading, text, input, button, card, table, metric, badge, divider, unmapped. Use node kind only from: actor, entity, action, state, rule, data, constraint. Use edge kind only from: owns, acts-on, transitions-to, depends-on, constrained-by, informs. Keep routes, permissions, persistence, integrations, and business authority as unknowns unless the idea explicitly provides evidence. Schema: {"schemaVersion":"${PRODUCT_GRAPH_SCHEMA}","id":"lowercase-slug","name":"short product name","idea":${JSON.stringify(idea)},"audience":"stated audience or Unspecified","nodes":[{"id":"unique-lowercase-slug","kind":"actor|entity|action|state|rule|data|constraint","label":"short label","detail":"one concrete requirement","uiNeed":"one allowed value","sourceQuote":"exact quote or null","confidence":"high|medium|low"}],"edges":[{"id":"unique-lowercase-slug","from":"node-id","to":"node-id","kind":"owns|acts-on|transitions-to|depends-on|constrained-by|informs"}],"unknowns":["open question"]}. Create 4–12 useful nodes, only evidence-backed edges, and list unresolved product facts as unknowns.\n\nUser idea:\n${idea}`;
}
