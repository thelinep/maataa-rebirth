import { describe, expect, it } from "vitest";
import { LAYOUT_TYPES } from "../src/registries/layoutRegistry";
import { createLayoutDataSlice, LAYOUT_SLICE_PROFILES } from "../examples/redux-demo/layoutDataSlices";

describe("canonical layout data slices", () => {
  it("maps every layout record to a unique, deterministic, bounded synthetic slice", () => {
    const slices = LAYOUT_TYPES.map((layout) => createLayoutDataSlice(layout));
    expect(slices).toHaveLength(100);
    expect(new Set(slices.map((slice) => slice.layoutId))).toHaveProperty("size", 100);
    expect(new Set(slices.map((slice) => slice.reference)).size).toBe(100);
    for (const [index, slice] of slices.entries()) {
      expect(slice.reference).toBe(`LY-${String(index + 1).padStart(3, "0")}`);
      expect(slice.regions.length).toBeGreaterThan(0);
      expect(slice.regions.every((region) => region.value && region.note)).toBe(true);
      expect(slice.provenance).toBe("Synthetic layout fixture");
      expect(slice.boundary).toContain("No live application state");
      expect(slice).toEqual(createLayoutDataSlice(LAYOUT_TYPES[index]!));
    }
  });

  it("covers all registry families and keeps family-specific fixtures meaningful", () => {
    const families = new Set(LAYOUT_TYPES.map((layout) => layout.groupKey));
    expect(families.size).toBe(18);
    expect([...families].sort()).toEqual(Object.keys(LAYOUT_SLICE_PROFILES).sort());
    const planning = createLayoutDataSlice(LAYOUT_TYPES.find((layout) => layout.id === "LAYOUT.PLANNING.KANBAN")!);
    expect(planning.regions.map((region) => region.title)).toEqual(["Backlog", "This week", "Review", "Scheduled next"]);
    expect(planning.regions.map((region) => region.value)).toContain("Prepare location brief");
    const spatial = createLayoutDataSlice(LAYOUT_TYPES.find((layout) => layout.id === "LAYOUT.CANVAS_SPATIAL.MAPWORKSPACE")!);
    expect(spatial.domain).toBe("canvas_spatial");
    expect(spatial.regions.map((region) => region.value)).toContain("Mountain Road · sample location");
  });

  it("fails closed when an unknown family has no data-slice profile", () => {
    expect(() => createLayoutDataSlice({ ...LAYOUT_TYPES[0]!, groupKey: "UNMAPPED" })).toThrow("No layout data slice is registered");
  });
});
