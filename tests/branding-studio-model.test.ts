import { describe, expect, it } from "vitest";
import {
  applyAcceptedBrandSuggestions,
  createInitialBrandingDocument,
  parseBrandSuggestions,
  validateBrandDocument,
} from "../examples/redux-demo/brandingStudioModel";

describe("Branding Studio project and review contracts", () => {
  it("starts with an editable source-aware board and draft-only domain targets", () => {
    const document = createInitialBrandingDocument("2026-10-08T00:00:00.000Z");
    expect(validateBrandDocument(document)).toBe(true);
    expect(document.nodes.some(node => node.kind === "asset-reference" && node.rights === "unknown")).toBe(true);
    expect(document.assignments.map(item => item.status)).toEqual(["unassigned", "unassigned", "unassigned", "unassigned", "unassigned"]);
    expect(document.nodes.find(node => node.id === "palette-candidates")?.content).toContain("not approved");
  });

  it("rejects malformed identities, broken connectors, and out-of-bounds nodes", () => {
    const document = createInitialBrandingDocument();
    expect(validateBrandDocument({ ...document, nodes: [...document.nodes, document.nodes[0]] })).toBe(false);
    expect(validateBrandDocument({ ...document, edges: [{ id: "bad-edge", from: "missing", to: "brand-thesis", label: "x" }] })).toBe(false);
    expect(validateBrandDocument({ ...document, nodes: document.nodes.map((node, index) => index ? node : { ...node, x: 101 }) })).toBe(false);
    expect(validateBrandDocument({ ...document, assignments: [{ domain: "tlps", brandVersionId: "invented", themeVersionId: "invented:theme", status: "draft" }] })).toBe(false);
  });

  it("accepts only suggestions for explicitly selected, unchanged fields", () => {
    const document = createInitialBrandingDocument();
    const node = document.nodes[0]!;
    const suggestions = parseBrandSuggestions(JSON.stringify({ suggestions: [{ nodeId: node.id, field: "content", before: node.content, after: "A concise source-aware draft statement.", reason: "Shorter for the board." }] }), document.nodes, [node.id]);
    expect(applyAcceptedBrandSuggestions(document.nodes, suggestions, [node.id])[0]?.content).toBe("A concise source-aware draft statement.");
    expect(() => parseBrandSuggestions(JSON.stringify({ suggestions: [{ nodeId: node.id, field: "content", before: node.content, after: "Unauthorized edit", reason: "" }] }), document.nodes, [])).toThrow(/unselected/);
    expect(() => parseBrandSuggestions(JSON.stringify({ suggestions: [{ nodeId: node.id, field: "title", before: "stale", after: "new", reason: "" }] }), document.nodes, [node.id])).toThrow(/stale/);
  });
});
