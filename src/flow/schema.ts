// Saved format and pure operations for node-based designers (workflows and scene graphs).
// The format is ours, not the canvas library's, so the renderer can change without a migration.

export const FLOW_SCHEMA_VERSION = "1" as const;
export const FLOW_LIMITS = { maxNodes: 500, maxEdges: 2000, maxLabel: 120, maxId: 80, maxCoordinate: 1_000_000 } as const;

export type FlowKind = "workflow" | "scene";

export interface FlowNodeType {
  type: string;
  label: string;
  /** Short description shown in the palette and read by screen readers. */
  description: string;
  /** Maximum number of nodes of this type, e.g. one start node. */
  max?: number;
  /** Whether edges may start or end here. */
  canSource?: boolean;
  canTarget?: boolean;
}

export interface FlowNodeSpec {
  id: string;
  type: string;
  label: string;
  position: { x: number; y: number };
}

export interface FlowEdgeSpec {
  id: string;
  source: string;
  target: string;
  label?: string;
}

export interface FlowSpecV1 {
  schemaVersion: typeof FLOW_SCHEMA_VERSION;
  kind: FlowKind;
  id: string;
  name: string;
  nodes: FlowNodeSpec[];
  edges: FlowEdgeSpec[];
}

export const WORKFLOW_NODE_TYPES: readonly FlowNodeType[] = [
  { type: "start", label: "Start", description: "Where the workflow begins.", max: 1, canTarget: false },
  { type: "task", label: "Task", description: "Work someone does." },
  { type: "approval", label: "Approval", description: "A person approves or returns the work." },
  { type: "decision", label: "Decision", description: "Choose one of several paths." },
  { type: "handoff", label: "Handoff", description: "Work passes to another team or app." },
  { type: "end", label: "End", description: "Where the workflow finishes.", canSource: false },
];

export const SCENE_NODE_TYPES: readonly FlowNodeType[] = [
  { type: "scene", label: "Scene", description: "A scene in the script." },
  { type: "shot", label: "Shot", description: "A shot within a scene." },
  { type: "character", label: "Character", description: "A character who appears." },
  { type: "location", label: "Location", description: "Where it happens." },
  { type: "prop", label: "Prop", description: "An object the scene needs." },
  { type: "note", label: "Note", description: "A production note." },
];

export const nodeTypesFor = (kind: FlowKind) => (kind === "workflow" ? WORKFLOW_NODE_TYPES : SCENE_NODE_TYPES);

const SAFE_ID = /^[A-Za-z0-9][A-Za-z0-9._:-]*$/;
const isObject = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);
const validId = (v: unknown) => typeof v === "string" && v.length <= FLOW_LIMITS.maxId && SAFE_ID.test(v);
const validLabel = (v: unknown) => typeof v === "string" && v.trim().length > 0 && v.length <= FLOW_LIMITS.maxLabel;
const validCoordinate = (v: unknown) => typeof v === "number" && Number.isFinite(v) && Math.abs(v) <= FLOW_LIMITS.maxCoordinate;

export function createFlow(kind: FlowKind, id: string, name: string): FlowSpecV1 {
  const flow: FlowSpecV1 = { schemaVersion: FLOW_SCHEMA_VERSION, kind, id, name: name.trim(), nodes: [], edges: [] };
  const issues = validateFlowSpec(flow);
  if (issues.length) throw new Error(issues.join(" "));
  return flow;
}

/** True when target can already reach source, i.e. adding source → target would close a loop. */
function createsCycle(edges: readonly FlowEdgeSpec[], source: string, target: string): boolean {
  if (source === target) return true;
  const next = new Map<string, string[]>();
  for (const edge of edges) next.set(edge.source, [...(next.get(edge.source) ?? []), edge.target]);
  const seen = new Set<string>();
  const stack = [target];
  while (stack.length) {
    const current = stack.pop()!;
    if (current === source) return true;
    if (seen.has(current)) continue;
    seen.add(current);
    stack.push(...(next.get(current) ?? []));
  }
  return false;
}

/** Returns plain-language problems; an empty list means the flow is valid. */
export function validateFlowSpec(value: unknown): string[] {
  if (!isObject(value)) return ["The flow must be an object."];
  const issues: string[] = [];
  if (value.schemaVersion !== FLOW_SCHEMA_VERSION) issues.push(`Unsupported flow schema version ${String(value.schemaVersion)}.`);
  if (value.kind !== "workflow" && value.kind !== "scene") return [...issues, "The flow kind must be workflow or scene."];
  if (!validId(value.id)) issues.push("The flow ID is missing or has unsupported characters.");
  if (!validLabel(value.name)) issues.push("The flow name must be 1–120 characters.");
  if (!Array.isArray(value.nodes) || !Array.isArray(value.edges)) return [...issues, "Nodes and edges must be lists."];
  if (value.nodes.length > FLOW_LIMITS.maxNodes) issues.push(`A flow can have up to ${FLOW_LIMITS.maxNodes} nodes.`);
  if (value.edges.length > FLOW_LIMITS.maxEdges) issues.push(`A flow can have up to ${FLOW_LIMITS.maxEdges} connections.`);
  const types = new Map(nodeTypesFor(value.kind).map((t) => [t.type, t]));
  const nodeIds = new Set<string>();
  const counts = new Map<string, number>();
  for (const node of value.nodes) {
    if (!isObject(node) || !validId(node.id) || !validLabel(node.label) || !isObject(node.position) || !validCoordinate(node.position.x) || !validCoordinate(node.position.y)) { issues.push("A node is missing its ID, label or position."); continue; }
    const id = node.id as string;
    if (nodeIds.has(id)) issues.push(`Node ID ${id} is used twice.`);
    nodeIds.add(id);
    const type = types.get(String(node.type));
    if (!type) { issues.push(`Node ${id} has an unknown type ${String(node.type)}.`); continue; }
    counts.set(type.type, (counts.get(type.type) ?? 0) + 1);
  }
  for (const type of types.values()) if (type.max !== undefined && (counts.get(type.type) ?? 0) > type.max) issues.push(`Only ${type.max} ${type.label} node${type.max === 1 ? "" : "s"} allowed.`);
  const edgeIds = new Set<string>();
  const pairs = new Set<string>();
  const accepted: FlowEdgeSpec[] = [];
  const nodeType = new Map(value.nodes.filter(isObject).map((n) => [n.id as string, types.get(String(n.type))]));
  for (const edge of value.edges) {
    if (!isObject(edge) || !validId(edge.id) || typeof edge.source !== "string" || typeof edge.target !== "string") { issues.push("A connection is missing its ID, source or target."); continue; }
    if (edge.label !== undefined && !validLabel(edge.label)) issues.push(`Connection ${edge.id as string} has an invalid label.`);
    if (edgeIds.has(edge.id as string)) issues.push(`Connection ID ${edge.id as string} is used twice.`);
    edgeIds.add(edge.id as string);
    if (!nodeIds.has(edge.source) || !nodeIds.has(edge.target)) { issues.push(`Connection ${edge.id as string} points to a missing node.`); continue; }
    if (edge.source === edge.target) { issues.push(`Connection ${edge.id as string} connects a node to itself.`); continue; }
    if (nodeType.get(edge.source)?.canSource === false) issues.push(`Connection ${edge.id as string} starts at a node that cannot lead anywhere.`);
    if (nodeType.get(edge.target)?.canTarget === false) issues.push(`Connection ${edge.id as string} ends at a node nothing can lead into.`);
    const pair = `${edge.source}→${edge.target}`;
    if (pairs.has(pair)) issues.push(`Two connections join the same nodes (${pair}).`);
    pairs.add(pair);
    if (value.kind === "workflow" && createsCycle(accepted, edge.source, edge.target)) issues.push(`Connection ${edge.id as string} creates a loop; workflows must not loop.`);
    accepted.push(edge as unknown as FlowEdgeSpec);
  }
  return issues;
}

/** Parses saved JSON defensively. Throws with the problems found. */
export function parseFlowSpec(json: string): FlowSpecV1 {
  if (json.length > 2_000_000) throw new Error("The flow file is too large.");
  let value: unknown;
  try { value = JSON.parse(json); } catch { throw new Error("The flow file is not valid JSON."); }
  const issues = validateFlowSpec(value);
  if (issues.length) throw new Error(issues.join(" "));
  const flow = value as FlowSpecV1;
  return {
    schemaVersion: FLOW_SCHEMA_VERSION, kind: flow.kind, id: flow.id, name: flow.name,
    nodes: flow.nodes.map((n) => ({ id: n.id, type: n.type, label: n.label, position: { x: n.position.x, y: n.position.y } })),
    edges: flow.edges.map((e) => ({ id: e.id, source: e.source, target: e.target, ...(e.label ? { label: e.label } : {}) })),
  };
}

export type FlowResult = { ok: true; flow: FlowSpecV1 } | { ok: false; reason: string };
const commit = (flow: FlowSpecV1): FlowResult => {
  const issues = validateFlowSpec(flow);
  return issues.length ? { ok: false, reason: issues[0] } : { ok: true, flow };
};

const nextId = (prefix: string, taken: Iterable<string>) => {
  const used = new Set(taken);
  let n = 1;
  while (used.has(`${prefix}-${n}`)) n += 1;
  return `${prefix}-${n}`;
};

export function addNode(flow: FlowSpecV1, type: string, position?: { x: number; y: number }, label?: string): FlowResult {
  const def = nodeTypesFor(flow.kind).find((t) => t.type === type);
  if (!def) return { ok: false, reason: `Unknown node type ${type}.` };
  const id = nextId(type, flow.nodes.map((n) => n.id));
  const index = flow.nodes.length;
  const at = position ?? { x: 40 + (index % 4) * 220, y: 40 + Math.floor(index / 4) * 140 };
  return commit({ ...flow, nodes: [...flow.nodes, { id, type, label: label ?? `${def.label} ${id.split("-").pop()}`, position: { x: Math.round(at.x), y: Math.round(at.y) } }] });
}

export function removeNode(flow: FlowSpecV1, id: string): FlowResult {
  if (!flow.nodes.some((n) => n.id === id)) return { ok: false, reason: `No node ${id}.` };
  return commit({ ...flow, nodes: flow.nodes.filter((n) => n.id !== id), edges: flow.edges.filter((e) => e.source !== id && e.target !== id) });
}

export function updateNode(flow: FlowSpecV1, id: string, patch: { label?: string; position?: { x: number; y: number } }): FlowResult {
  if (!flow.nodes.some((n) => n.id === id)) return { ok: false, reason: `No node ${id}.` };
  return commit({ ...flow, nodes: flow.nodes.map((n) => n.id === id ? { ...n, ...(patch.label !== undefined ? { label: patch.label } : {}), ...(patch.position ? { position: { x: Math.round(patch.position.x), y: Math.round(patch.position.y) } } : {}) } : n) });
}

export function connect(flow: FlowSpecV1, source: string, target: string, label?: string): FlowResult {
  const id = nextId("edge", flow.edges.map((e) => e.id));
  return commit({ ...flow, edges: [...flow.edges, { id, source, target, ...(label?.trim() ? { label: label.trim() } : {}) }] });
}

export function disconnect(flow: FlowSpecV1, edgeId: string): FlowResult {
  if (!flow.edges.some((e) => e.id === edgeId)) return { ok: false, reason: `No connection ${edgeId}.` };
  return commit({ ...flow, edges: flow.edges.filter((e) => e.id !== edgeId) });
}

/** Node IDs in an order where every connection points forward. Workflows only (they cannot loop). */
export function executionOrder(flow: FlowSpecV1): string[] {
  const incoming = new Map(flow.nodes.map((n) => [n.id, 0]));
  for (const e of flow.edges) incoming.set(e.target, (incoming.get(e.target) ?? 0) + 1);
  const queue = flow.nodes.filter((n) => incoming.get(n.id) === 0).map((n) => n.id);
  const order: string[] = [];
  while (queue.length) {
    const id = queue.shift()!;
    order.push(id);
    for (const e of flow.edges.filter((edge) => edge.source === id)) {
      incoming.set(e.target, incoming.get(e.target)! - 1);
      if (incoming.get(e.target) === 0) queue.push(e.target);
    }
  }
  return order;
}
