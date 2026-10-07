export type BrandDomainId = "maataa" | "siddham" | "tlps" | "nevo" | "investorhub";
export type BrandNodeKind = "thesis" | "asset-reference" | "palette" | "typography" | "principle";
export type BrandNode = {
  id: string;
  kind: BrandNodeKind;
  title: string;
  content: string;
  x: number;
  y: number;
  source: string;
  rights: "unknown" | "provided" | "verified";
  colors?: Record<string, string>;
  fontFamily?: string;
};
export type BrandEdge = { id: string; from: string; to: string; label: string };
export type BrandVersion = {
  id: string;
  name: string;
  createdAt: string;
  nodes: BrandNode[];
  edges: BrandEdge[];
  theme: StudioTheme;
  themeVersionId: string;
  status: "local-draft";
};
export type DomainAssignmentDraft = {
  domain: BrandDomainId;
  brandVersionId: string | null;
  themeVersionId: string | null;
  status: "unassigned" | "draft";
};
export type AcceptedAiChange = {
  provider: string;
  model: string;
  modelDigest?: string;
  promptSha256?: string;
  acceptedAt: string;
  changeCount: number;
};
export type BrandingDocumentV1 = {
  schemaVersion: "maataa.branding-project.v1";
  id: string;
  name: string;
  description: string;
  nodes: BrandNode[];
  edges: BrandEdge[];
  versions: BrandVersion[];
  assignments: DomainAssignmentDraft[];
  acceptedAiChanges: AcceptedAiChange[];
  updatedAt: string;
};

export const BRANDING_STORAGE_KEY = "maataa.branding-studio.document.v1";
export const BRAND_DOMAINS: ReadonlyArray<{ id: BrandDomainId; label: string }> = [
  { id: "maataa", label: "MAATAA Workstation" },
  { id: "siddham", label: "Siddham" },
  { id: "tlps", label: "TLPS" },
  { id: "nevo", label: "NEVO" },
  { id: "investorhub", label: "InvestorHub" },
];
export const BRAND_NODE_KINDS: ReadonlyArray<{ id: BrandNodeKind; label: string }> = [
  { id: "thesis", label: "Brand thesis" },
  { id: "asset-reference", label: "Existing asset reference" },
  { id: "palette", label: "Palette candidates" },
  { id: "typography", label: "Typography direction" },
  { id: "principle", label: "System principle" },
];

const STARTER_COLORS: Record<string, string> = {
  canvas: "#17140f", surface: "#211d17", elevated: "#29231b", text: "#f6efe3", muted: "#bdb2a3",
  border: "#51483a", primary: "#d7ad2e", primaryText: "#211a07", secondary: "#3a3327", success: "#6fbd89",
  warning: "#e8bb58", danger: "#d98279", info: "#77a9de", focus: "#f0c746",
};

export function createInitialBrandingDocument(now = new Date().toISOString()): BrandingDocumentV1 {
  const nodes: BrandNode[] = [
    { id: "brand-thesis", kind: "thesis", title: "Shared brand thesis · draft", content: "Describe the shared promise and the audiences each domain serves. Keep domain-specific facts in their own evidence-backed briefs.", x: 5, y: 10, source: "User brief", rights: "unknown" },
    { id: "existing-mark", kind: "asset-reference", title: "Approved mark source", content: "Add a path or link to the approved source asset. No logo is embedded, replaced, or represented as approved here.", x: 38, y: 12, source: "Awaiting owner-provided asset", rights: "unknown" },
    { id: "palette-candidates", kind: "palette", title: "Palette candidates · unapproved", content: "Starter values copied from the current MAATAA preview theme; these are editing samples, not approved domain colors.", x: 70, y: 10, source: "MAATAA local theme starter", rights: "unknown", colors: STARTER_COLORS },
    { id: "type-direction", kind: "typography", title: "Typography direction · draft", content: "Use fonts supplied or licensed by the consuming product. The host's installed font availability must be checked before release.", x: 20, y: 57, source: "Proposed system rule", rights: "unknown", fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif' },
    { id: "shared-principle", kind: "principle", title: "One reviewed source, explicit assignments", content: "A saved draft does not change a domain. Each product must reference an exact reviewed brand version and theme version before a separate authorized release action.", x: 53, y: 58, source: "Architecture decision in brief", rights: "unknown" },
  ];
  const edges: BrandEdge[] = [
    { id: "edge-thesis-mark", from: "brand-thesis", to: "existing-mark", label: "identity" },
    { id: "edge-thesis-palette", from: "brand-thesis", to: "palette-candidates", label: "expression" },
    { id: "edge-palette-type", from: "palette-candidates", to: "type-direction", label: "theme" },
    { id: "edge-type-principle", from: "type-direction", to: "shared-principle", label: "review" },
  ];
  return {
    schemaVersion: "maataa.branding-project.v1",
    id: "brand-project-maataa",
    name: "Shared brand and theme workspace",
    description: "A local authoring draft connecting Brand Kit, Theme Studio, preview, review, and product assignment.",
    nodes,
    edges,
    versions: [],
    assignments: BRAND_DOMAINS.map(({ id }) => ({ domain: id, brandVersionId: null, themeVersionId: null, status: "unassigned" })),
    acceptedAiChanges: [],
    updatedAt: now,
  };
}

export type BrandSuggestion = { nodeId: string; field: "title" | "content"; before: string; after: string; reason: string };

export function validateBrandDocument(value: unknown): value is BrandingDocumentV1 {
  if (!value || typeof value !== "object") return false;
  const doc = value as Partial<BrandingDocumentV1>;
  if (doc.schemaVersion !== "maataa.branding-project.v1" || !Array.isArray(doc.nodes) || !Array.isArray(doc.edges) || !Array.isArray(doc.versions) || !Array.isArray(doc.assignments)) return false;
  const ids = new Set<string>();
  for (const node of doc.nodes) {
    if (!node || typeof node !== "object" || typeof node.id !== "string" || ids.has(node.id) || !BRAND_NODE_KINDS.some(({ id }) => id === node.kind) || typeof node.title !== "string" || typeof node.content !== "string" || !Number.isFinite(node.x) || !Number.isFinite(node.y) || node.x < 0 || node.x > 100 || node.y < 0 || node.y > 100 || typeof node.source !== "string" || !["unknown", "provided", "verified"].includes(node.rights)) return false;
    ids.add(node.id);
  }
  if (doc.edges.some(edge => !edge || !ids.has(edge.from) || !ids.has(edge.to) || edge.from === edge.to)) return false;
  if (doc.versions.some(version => !version || typeof version.id !== "string" || typeof version.themeVersionId !== "string" || !version.theme || !Array.isArray(version.nodes) || !Array.isArray(version.edges) || version.status !== "local-draft")) return false;
  const versionIds = new Set(doc.versions.map(version => version.id));
  const themeVersionIds = new Set(doc.versions.map(version => version.themeVersionId));
  if (doc.assignments.some(item => !BRAND_DOMAINS.some(({ id }) => id === item.domain) || !["unassigned", "draft"].includes(item.status) || (item.status === "unassigned" && (item.brandVersionId !== null || item.themeVersionId !== null)) || (item.status === "draft" && (!item.brandVersionId || !item.themeVersionId || !versionIds.has(item.brandVersionId) || !themeVersionIds.has(item.themeVersionId))))) return false;
  return true;
}

export function applyAcceptedBrandSuggestions(nodes: BrandNode[], suggestions: BrandSuggestion[], selectedContextIds: string[]): BrandNode[] {
  const allowed = new Set(selectedContextIds);
  return nodes.map(node => {
    const changes = suggestions.filter(change => change.nodeId === node.id && allowed.has(node.id) && (change.field === "title" || change.field === "content") && change.before === node[change.field] && typeof change.after === "string");
    return changes.reduce((current, change) => ({ ...current, [change.field]: change.after }), node);
  });
}

export function parseBrandSuggestions(text: string, nodes: BrandNode[], selectedContextIds: string[]): BrandSuggestion[] {
  const cleaned = text.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
  const parsed: unknown = JSON.parse(cleaned);
  if (!parsed || typeof parsed !== "object" || !Array.isArray((parsed as { suggestions?: unknown }).suggestions)) throw new Error("The model response must be a JSON object with a suggestions array.");
  const selected = new Set(selectedContextIds);
  const byId = new Map(nodes.map(node => [node.id, node]));
  return (parsed as { suggestions: unknown[] }).suggestions.map((item, index) => {
    if (!item || typeof item !== "object") throw new Error(`Suggestion ${index + 1} is not an object.`);
    const change = item as Partial<BrandSuggestion>;
    const node = typeof change.nodeId === "string" ? byId.get(change.nodeId) : undefined;
    if (!node || !selected.has(node.id) || (change.field !== "title" && change.field !== "content") || typeof change.before !== "string" || typeof change.after !== "string" || typeof change.reason !== "string") throw new Error(`Suggestion ${index + 1} refers to an invalid or unselected field.`);
    if (node[change.field] !== change.before) throw new Error(`Suggestion ${index + 1} is stale; the source changed after the model received it.`);
    return { nodeId: node.id, field: change.field, before: change.before, after: change.after.slice(0, 4000), reason: change.reason.slice(0, 500) };
  });
}
import type { StudioTheme } from "./themeStudioModel";
