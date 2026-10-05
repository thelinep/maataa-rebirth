import {
  describe,
  expect,
  it,
} from "vitest";

import {
  COMPOSITION_CATALOG_COUNTS,
  selectResponsiveTransformations,
  validateCompositionReferences,
} from "../src/composer/compositionKernel";

import {
  COMPONENT_REGISTRY,
} from "../src/registries/componentRegistry";

import {
  LAYOUT_TYPES,
} from "../src/registries/layoutRegistry";

import {
  PAGE_TYPES,
} from "../src/registries/pageRegistry";

import {
  WORKSPACE_TYPES,
} from "../src/registries/workspaceRegistry";

import {
  DEVICE_REGISTRY,
} from "../src/registries/deviceRegistry";

import {
  REGION_REGISTRY,
} from "../src/registries/regionRegistry";

describe("composition kernel", () => {
  it("resolves canonical composition references", () => {
    const result =
      validateCompositionReferences(
        {
          workspaceTypeId:
            WORKSPACE_TYPES[0]!.id,
          pageTypeId:
            PAGE_TYPES[0]!.id,
          layoutTypeId:
            LAYOUT_TYPES[0]!.id,
        },
        {
          deviceId:
            DEVICE_REGISTRY[0]!.id,
          regionIds: [
            REGION_REGISTRY[0]!.id,
          ],
          componentIds: [
            COMPONENT_REGISTRY[0]!.id,
          ],
          responsiveCondition:
            "mobile",
        },
      );

    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);

    expect(
      result.resolution.workspace?.id,
    ).toBe(
      WORKSPACE_TYPES[0]!.id,
    );

    expect(
      result.resolution.page?.id,
    ).toBe(
      PAGE_TYPES[0]!.id,
    );

    expect(
      result.resolution.layout?.id,
    ).toBe(
      LAYOUT_TYPES[0]!.id,
    );

    expect(
      result.resolution.device?.id,
    ).toBe(
      DEVICE_REGISTRY[0]!.id,
    );

    expect(
      result.resolution.regions[0]?.id,
    ).toBe(
      REGION_REGISTRY[0]!.id,
    );

    expect(
      result.resolution.components[0]?.id,
    ).toBe(
      COMPONENT_REGISTRY[0]!.id,
    );
  });

  it("rejects invented registry identities", () => {
    const result =
      validateCompositionReferences(
        {
          workspaceTypeId:
            "WORKSPACE.DOES_NOT_EXIST",
          pageTypeId:
            "PAGE.DOES_NOT_EXIST",
          layoutTypeId:
            "LAYOUT.DOES_NOT_EXIST",
        },
        {
          deviceId:
            "DEVICE.DOES_NOT_EXIST",
          regionIds: [
            "REGION.DOES_NOT_EXIST",
          ],
          componentIds: [
            "COMPONENT.DOES_NOT_EXIST",
          ],
        },
      );

    expect(result.valid).toBe(false);

    const codes =
      result.errors.map(
        (issue) => issue.code,
      );

    expect(codes).toContain(
      "UNKNOWN_WORKSPACE",
    );

    expect(codes).toContain(
      "UNKNOWN_PAGE",
    );

    expect(codes).toContain(
      "UNKNOWN_LAYOUT",
    );

    expect(codes).toContain(
      "UNKNOWN_DEVICE",
    );

    expect(codes).toContain(
      "UNKNOWN_REGION",
    );

    expect(codes).toContain(
      "UNKNOWN_COMPONENT",
    );
  });

  it("flags duplicate region and component references", () => {
    const regionId =
      REGION_REGISTRY[0]!.id;

    const componentId =
      COMPONENT_REGISTRY[0]!.id;

    const result =
      validateCompositionReferences(
        {
          workspaceTypeId:
            WORKSPACE_TYPES[0]!.id,
          pageTypeId:
            PAGE_TYPES[0]!.id,
          layoutTypeId:
            LAYOUT_TYPES[0]!.id,
        },
        {
          regionIds: [
            regionId,
            regionId,
          ],
          componentIds: [
            componentId,
            componentId,
          ],
        },
      );

    expect(result.valid).toBe(true);

    expect(
      result.warnings.map(
        (issue) => issue.code,
      ),
    ).toContain(
      "DUPLICATE_REGION",
    );

    expect(
      result.warnings.map(
        (issue) => issue.code,
      ),
    ).toContain(
      "DUPLICATE_COMPONENT",
    );
  });

  it("selects registered responsive transformations", () => {
    const transformations =
      selectResponsiveTransformations(
        "mobile",
      );

    expect(
      transformations.length,
    ).toBeGreaterThan(0);

    expect(
      transformations.every(
        (item) =>
          item.condition === "mobile",
      ),
    ).toBe(true);
  });

  it("exposes non-empty canonical catalogs", () => {
    expect(
      COMPOSITION_CATALOG_COUNTS.components,
    ).toBeGreaterThan(0);

    expect(
      COMPOSITION_CATALOG_COUNTS.layouts,
    ).toBeGreaterThan(0);

    expect(
      COMPOSITION_CATALOG_COUNTS.pages,
    ).toBeGreaterThan(0);

    expect(
      COMPOSITION_CATALOG_COUNTS.workspaces,
    ).toBeGreaterThan(0);

    expect(
      COMPOSITION_CATALOG_COUNTS.devices,
    ).toBeGreaterThan(0);

    expect(
      COMPOSITION_CATALOG_COUNTS.regions,
    ).toBeGreaterThan(0);

    expect(
      COMPOSITION_CATALOG_COUNTS
        .responsiveTransformations,
    ).toBeGreaterThan(0);
  });

  it("keeps canonical registry validation explicit", () => {
    const result =
      validateCompositionReferences(
        {
          workspaceTypeId:
            WORKSPACE_TYPES[0]!.id,
          pageTypeId:
            PAGE_TYPES[0]!.id,
          layoutTypeId:
            LAYOUT_TYPES[0]!.id,
        },
      );

    expect(result.valid).toBe(true);
    expect(
      result.resolution.workspace?.id,
    ).toBe(WORKSPACE_TYPES[0]!.id);
  });

});
