import { describe, expect, it } from "vitest";
import {
  canonicalPackageBoundaries,
  canonicalPackageBoundaryStatus,
  findPrimitiveRegistryItem,
  getPrimitiveRegistryCoverage,
  masterPrimitiveRegistry,
  masterPrimitiveRegistryItemCount,
} from "./masterPrimitiveRegistry";

describe("master primitive registry", () => {
  it("contains the complete 57-category, 901-entry source inventory", () => {
    expect(masterPrimitiveRegistry).toHaveLength(57);
    expect(masterPrimitiveRegistryItemCount).toBe(901);
    expect(
      masterPrimitiveRegistry.reduce((count, category) => count + category.items.length, 0)
    ).toBe(901);
  });

  it("keeps UI primitives distinct from required product foundations", () => {
    const coverage = getPrimitiveRegistryCoverage();
    expect(coverage).toEqual({
      total: 901,
      implemented: 61,
      planned: 813,
      requiredFoundations: 27,
    });
    expect(
      masterPrimitiveRegistry[56].items.every((item) => item.status === "required-foundation")
    ).toBe(true);
    expect(masterPrimitiveRegistry[56].layer).toBe("platform-foundation");
  });

  it("records the general canvas and implemented 3D surface without overclaiming simulation", () => {
    expect(findPrimitiveRegistryItem("Canvas")[0]).toMatchObject({
      status: "implemented",
    });
    expect(findPrimitiveRegistryItem("Scene3D")[0]).toMatchObject({ status: "implemented" });
    expect(findPrimitiveRegistryItem("Material")[0]).toMatchObject({ status: "implemented" });
    expect(findPrimitiveRegistryItem("DigitalTwin")[0]).toMatchObject({ status: "planned" });
    expect(findPrimitiveRegistryItem("Grid").map((item) => item.status)).toEqual([
      "implemented",
      "planned",
    ]);
  });

  it("reports the extracted MAATAA packages and catalog-only TLPS packages", () => {
    expect(canonicalPackageBoundaryStatus).toBe(
      "packages-extracted-with-canvas-and-3d-domain-surfaces"
    );
    expect(canonicalPackageBoundaries).toContain("@tlps/domain-primitives");
  });
});
