import { describe, expect, it } from "vitest";
import { WORKSPACE_TYPES } from "../src/registries/workspaceRegistry";
import { createWorkspaceDataSlice, WORKSPACE_DOMAIN_BY_GROUP } from "../examples/redux-demo/workspaceDataSlices";
import workspaceSliceDocument from "../examples/redux-demo/data/workspace-data-slices.json";

describe("workspace data slices", () => {
  it("provides a distinct synthetic slice for every canonical workspace", () => {
    const slices = WORKSPACE_TYPES.map((workspace) => createWorkspaceDataSlice(workspace));

    expect(WORKSPACE_TYPES).toHaveLength(616);
    expect(slices).toHaveLength(WORKSPACE_TYPES.length);
    expect(slices.every((slice) => slice.workspaceId.length > 0)).toBe(true);
    expect(new Set(slices.map((slice) => slice.reference)).size).toBe(WORKSPACE_TYPES.length);
    for (const [index, slice] of slices.entries()) {
      const workspace = WORKSPACE_TYPES[index]!;
      expect(slice.workspaceId).toBe(workspace.id);
      expect(slice.sections).toHaveLength(2);
      expect(slice.sections[0]?.lines[0]).toBe(workspace.name);
      expect(slice.provenance).toBe("Synthetic fixture");
      expect(slice.sections.flatMap((section) => section.lines).length).toBeGreaterThanOrEqual(6);
    }
  });

  it("covers every workspace group and gives TLPS and event workspaces domain-specific slices", () => {
    const groups = new Set(WORKSPACE_TYPES.map((workspace) => workspace.groupKey));
    expect([...groups].every((group) => Object.hasOwn(WORKSPACE_DOMAIN_BY_GROUP, group))).toBe(true);

    const tlps = createWorkspaceDataSlice(WORKSPACE_TYPES.find((workspace) => workspace.groupKey === "EQUIPMENT_LOGISTICS")!);
    const nevo = createWorkspaceDataSlice(WORKSPACE_TYPES.find((workspace) => workspace.groupKey === "EVENT")!);
    expect(tlps.domain).toBe("production");
    expect(tlps.sections.flatMap((section) => section.lines).join(" ")).toContain("Call-sheet");
    expect(nevo.domain).toBe("event");
    expect(nevo.sections.flatMap((section) => section.lines).join(" ")).toContain("registration fixture");
  });

  it("ships a current JSON slice for every canonical workspace", () => {
    expect(workspaceSliceDocument.schemaVersion).toBe("maataa.workspace-data-slices.v1");
    expect(workspaceSliceDocument.source.total).toBe(WORKSPACE_TYPES.length);
    expect(workspaceSliceDocument.workspaces).toHaveLength(WORKSPACE_TYPES.length);
    expect(new Set(workspaceSliceDocument.workspaces.map((entry) => entry.workspace.id)).size).toBe(WORKSPACE_TYPES.length);

    for (const [index, entry] of workspaceSliceDocument.workspaces.entries()) {
      const workspace = WORKSPACE_TYPES[index]!;
      expect(entry.workspace).toEqual(workspace);
      expect(entry.slice).toEqual(createWorkspaceDataSlice(workspace));
    }
  });
});
