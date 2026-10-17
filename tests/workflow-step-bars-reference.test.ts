import { describe, expect, it } from "vitest";
import reference from "../stories/workflow-step-bars.reference-data.json";

describe("workflow step bar reference inventory", () => {
  it("keeps the supplied 27-flow snapshot explicitly provisional and structurally complete", () => {
    expect(reference.status).toBe("reference-example-not-verified");
    expect(reference.groups).toHaveLength(6);
    const flows = reference.groups.flatMap((group) => group.flows);
    expect(flows).toHaveLength(27);
    expect(new Set(flows.map((flow) => flow.id)).size).toBe(flows.length);
    for (const flow of flows) {
      expect(flow.name.trim()).not.toBe("");
      expect(flow.source_reference.trim()).not.toBe("");
      expect(flow.steps.length).toBeGreaterThanOrEqual(2);
      expect(flow.steps.every((step) => step.trim().length > 0)).toBe(true);
    }
  });
});
