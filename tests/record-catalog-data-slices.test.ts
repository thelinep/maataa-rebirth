import { describe, expect, it } from "vitest";
import { REDUX_SLICE_REGISTRY } from "../src/registries/reduxSliceRegistry";
import { REDUX_SELECTOR_REGISTRY } from "../src/registries/reduxSelectorRegistry";
import { TYPE_CONTRACT_REGISTRY } from "../src/registries/typeContractRegistry";
import { DEMO_DATASET_REGISTRY } from "../src/registries/demoDatasetRegistry";
import { DEMO_SCENARIO_REGISTRY } from "../src/registries/demoScenarioRegistry";
import { REGISTRY_REGISTRY } from "../src/registries/registryRegistry";
import {
  createRecordCatalogDataSlice,
  type RecordCatalogItem,
  type RecordCatalogKind,
} from "../examples/redux-demo/recordCatalogDataSlices";

const catalogs = [
  ["redux", REDUX_SLICE_REGISTRY],
  ["selectors", REDUX_SELECTOR_REGISTRY],
  ["types", TYPE_CONTRACT_REGISTRY],
  ["datasets", DEMO_DATASET_REGISTRY],
  ["scenarios", DEMO_SCENARIO_REGISTRY],
  ["registries", REGISTRY_REGISTRY],
] as const;

describe("record-specific metadata catalog specimens", () => {
  it.each(catalogs)(
    "creates unique truthful specimens for every %s record",
    (kind, records) => {
      const slices = records.map((raw) => {
        const record = raw as unknown as RecordCatalogItem;
        return createRecordCatalogDataSlice(kind as RecordCatalogKind, record);
      });
      expect(slices).toHaveLength(records.length);
      expect(new Set(slices.map((slice) => slice.recordId)).size).toBe(
        records.length,
      );
      expect(new Set(slices.map((slice) => slice.reference)).size).toBe(
        records.length,
      );
      expect(new Set(slices.map((slice) => slice.sample)).size).toBe(
        records.length,
      );
      for (const [index, slice] of slices.entries()) {
        expect(slice.recordId).toBe(records[index]!.id);
        expect(slice.sample).toContain(records[index]!.id);
        expect(slice.boundary.length).toBeGreaterThan(30);
        expect(slice.provenance).toContain("metadata");
      }
    },
  );

  it("shows real deterministic fixture counts and never invents runtime or verification status", () => {
    const dataset = createRecordCatalogDataSlice(
      "datasets",
      DEMO_DATASET_REGISTRY[0]! as unknown as RecordCatalogItem,
    );
    const scenario = createRecordCatalogDataSlice(
      "scenarios",
      DEMO_SCENARIO_REGISTRY[3]! as unknown as RecordCatalogItem,
    );
    const registry = createRecordCatalogDataSlice(
      "registries",
      REGISTRY_REGISTRY[0]! as unknown as RecordCatalogItem,
    );
    expect(dataset.detail).toMatch(/records currently contribute/);
    expect(scenario.detail).toContain("Static film production planning demo");
    expect(registry.sample).toContain('"authority": "@maataa/ui"');
    expect(registry.sample).not.toContain("sha256");
  });

  it("fails closed for a missing catalog record", () => {
    expect(() =>
      createRecordCatalogDataSlice("redux", {
        id: "REDUX_SLICE.UNKNOWN",
        name: "unknown",
      }),
    ).toThrow("No redux catalog specimen");
  });
});
