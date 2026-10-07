import { getRegistryEntry } from "@maataa/registry";

const forbiddenKeys = new Set(["__proto__", "prototype", "constructor"]);

function validateDataOnly(value, seen = new WeakSet(), depth = 0, budget = { nodes: 0 }) {
  if (depth > 32) return { ok: false, reason: "MAX_DEPTH" };
  budget.nodes += 1;
  if (budget.nodes > 5000) return { ok: false, reason: "MAX_NODES" };

  if (value === null || typeof value === "string" || typeof value === "boolean") return { ok: true };
  if (typeof value === "number") return Number.isFinite(value) ? { ok: true } : { ok: false, reason: "NON_FINITE_NUMBER" };
  if (["undefined", "function", "symbol", "bigint"].includes(typeof value)) return { ok: false, reason: `NON_DATA_TYPE:${typeof value}` };
  if (typeof value !== "object") return { ok: false, reason: "UNSUPPORTED_TYPE" };
  if (seen.has(value)) return { ok: false, reason: "CYCLIC_VALUE" };
  seen.add(value);

  const proto = Object.getPrototypeOf(value);
  if (!Array.isArray(value) && proto !== Object.prototype && proto !== null) return { ok: false, reason: "CUSTOM_PROTOTYPE" };

  const descriptors = Object.getOwnPropertyDescriptors(value);
  for (const key of Reflect.ownKeys(descriptors)) {
    if (typeof key !== "string") return { ok: false, reason: "SYMBOL_KEY" };
    if (forbiddenKeys.has(key)) return { ok: false, reason: `FORBIDDEN_KEY:${key}` };
    const descriptor = descriptors[key];
    if (descriptor.get || descriptor.set) return { ok: false, reason: `ACCESSOR_FORBIDDEN:${key}` };
    const child = validateDataOnly(descriptor.value, seen, depth + 1, budget);
    if (!child.ok) return child;
  }
  return { ok: true };
}

export function createRenderPlan(node) {
  if (!node || typeof node !== "object") return { ok: false, reason: "INVALID_NODE" };
  const entry = getRegistryEntry(node.componentId);
  if (!entry) return { ok: false, reason: "UNREGISTERED_COMPONENT" };
  if (node.version && node.version !== entry.version) return { ok: false, reason: "VERSION_MISMATCH" };
  const safety = validateDataOnly(node.props ?? {});
  if (!safety.ok) return { ok: false, reason: "HOSTILE_PAYLOAD", detail: safety.reason };
  return {
    ok: true,
    componentId: entry.componentId,
    version: entry.version,
    props: structuredClone(node.props ?? {}),
    authorityClass: entry.authorityClass,
    headless: entry.headless === true,
    renderAdapter: entry.renderAdapter ?? null
  };
}

export function renderText(plan) {
  if (!plan?.ok) return `[MAATAA render error: ${plan?.reason ?? "UNKNOWN"}]`;
  return `${plan.componentId}@${plan.version}`;
}
