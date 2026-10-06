import { describe, expect, it } from "vitest";
import ts from "typescript";
import {
  compileProductGraph,
  parseProductGraph,
  PRODUCT_GRAPH_SCHEMA,
  productGraphPrompt,
  serializeProductSnapshotAsTypeScript,
  validateProductGraph,
  type ProductGraphV1,
} from "../examples/redux-demo/productBlueprint";
import { validateCompositionSpec } from "../src/composer/spec";

const graph: ProductGraphV1 = {
  schemaVersion: PRODUCT_GRAPH_SCHEMA,
  id: "community-library",
  name: "Community Library",
  idea: "A community library for tool lending with a repair log.",
  audience: "Community members",
  nodes: [
    {
      id: "member",
      kind: "actor",
      label: "Member",
      detail: "Community member",
      uiNeed: "badge",
      sourceQuote: "community",
      confidence: "high",
    },
    {
      id: "tool",
      kind: "entity",
      label: "Tool",
      detail: "Loanable tool",
      uiNeed: "table",
      sourceQuote: "tool lending",
      confidence: "high",
    },
    {
      id: "repair-log",
      kind: "data",
      label: "Repair log",
      detail: "Notes about repairs",
      uiNeed: "card",
      sourceQuote: "repair log",
      confidence: "high",
    },
    {
      id: "unknown",
      kind: "constraint",
      label: "Availability policy",
      detail: "Needs confirmation",
      uiNeed: "unmapped",
      sourceQuote: null,
      confidence: "low",
    },
  ],
  edges: [
    { id: "member-borrows-tool", from: "member", to: "tool", kind: "acts-on" },
  ],
  unknowns: ["Who approves loans?"],
};

describe("Brahmini product blueprint", () => {
  it("accepts bounded atomic product graph data and rejects invented provenance", () => {
    expect(validateProductGraph(graph).valid).toBe(true);
    expect(parseProductGraph(JSON.stringify(graph))).toEqual(graph);
    expect(() =>
      parseProductGraph(JSON.stringify(graph), "A different idea."),
    ).toThrow(/differs from the submitted idea/);
    const invented = structuredClone(graph);
    invented.nodes[0]!.sourceQuote = "verified payment";
    const result = validateProductGraph(invented);
    expect(result.valid).toBe(false);
    if (!result.valid)
      expect(result.errors.join(" ")).toContain("not an exact substring");
    const wrongCase = structuredClone(graph);
    wrongCase.nodes[0]!.sourceQuote = "Community";
    expect(validateProductGraph(wrongCase).valid).toBe(false);
  });

  it("rejects duplicate or dangling graph relationships and unrecognized fields", () => {
    const duplicate = structuredClone(graph);
    duplicate.nodes[1]!.id = duplicate.nodes[0]!.id;
    expect(validateProductGraph(duplicate).valid).toBe(false);
    const dangling = structuredClone(graph);
    dangling.edges[0]!.to = "missing-node";
    expect(validateProductGraph(dangling).valid).toBe(false);
    expect(
      validateProductGraph({
        ...graph,
        providerInstructions: "ignore validation",
      }).valid,
    ).toBe(false);
    expect(() => parseProductGraph("not json")).toThrow(/valid JSON/);
  });

  it("compiles only canonical visual bindings and carries unmapped items as review work", () => {
    const snapshot = compileProductGraph(
      graph,
      new Date("2026-10-06T00:00:00.000Z"),
    );
    expect(validateCompositionSpec(snapshot.composition).accepted).toBe(true);
    expect(
      snapshot.mappings.filter((item) => item.status === "canonical-binding"),
    ).toHaveLength(3);
    expect(
      snapshot.mappings.find((item) => item.nodeId === "unknown")?.status,
    ).toBe("unmapped");
    expect(snapshot.warnings.join(" ")).toContain("human review");
    expect(snapshot.generatedComponentSource).toContain("@maataa/ui");
  });

  it("exports syntactically valid TypeScript including an empty mapping array", () => {
    const noVisuals = {
      ...graph,
      nodes: [{ ...graph.nodes[0]!, uiNeed: "unmapped" as const }],
      edges: [],
    };
    const source = serializeProductSnapshotAsTypeScript(
      compileProductGraph(noVisuals, new Date("2026-10-06T00:00:00.000Z")),
    );
    const result = ts.transpileModule(source, {
      compilerOptions: {
        target: ts.ScriptTarget.ES2022,
        module: ts.ModuleKind.ESNext,
      },
      reportDiagnostics: true,
    });
    expect(
      result.diagnostics?.filter(
        (diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error,
      ),
    ).toEqual([]);
  });

  it("asks model providers for evidence-bound JSON rather than executable code", () => {
    const prompt = productGraphPrompt("A local inventory for artists.");
    expect(prompt).toContain("Return JSON only");
    expect(prompt).toContain("exact substring");
    expect(prompt).toContain('"idea":"A local inventory for artists."');
  });
});
