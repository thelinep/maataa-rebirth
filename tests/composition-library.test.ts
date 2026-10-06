import { describe, expect, it } from "vitest";
import {
  COMPOSITION_LIBRARY_KEY,
  deleteComposition,
  duplicateComposition,
  emptyCompositionLibrary,
  loadCompositionLibrary,
  parseCompositionLibrary,
  saveComposition,
  writeCompositionLibrary,
  type StorageLike,
} from "../examples/redux-demo/compositionLibrary";
import { DEFAULT_COMPOSER_SCENE } from "../src/composer/defaults";

function memoryStorage(): StorageLike & { values: Map<string, string> } {
  const values = new Map<string, string>();
  return {
    values,
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => {
      values.set(key, value);
    },
  };
}

describe("local composition library", () => {
  it("saves, reloads, duplicates, updates and deletes validated compositions", () => {
    const first = saveComposition(
      emptyCompositionLibrary(),
      DEFAULT_COMPOSER_SCENE,
      "Operations",
      new Date("2026-10-06T00:00:00.000Z"),
    );
    const duplicate = duplicateComposition(
      first,
      first.items[0]!.id,
      new Date("2026-10-06T00:00:00.001Z"),
    );
    expect(duplicate.items).toHaveLength(2);
    expect(duplicate.items[1]!.name).toBe("Operations copy");
    const updated = saveComposition(
      duplicate,
      { ...DEFAULT_COMPOSER_SCENE, name: "Updated scene" },
      "Operations",
      new Date("2026-10-06T00:00:00.002Z"),
      first.items[0]!.id,
    );
    expect(updated.items[0]!.scene.name).toBe("Updated scene");
    expect(
      deleteComposition(updated, duplicate.items[1]!.id).items,
    ).toHaveLength(1);
    expect(() =>
      saveComposition(
        duplicate,
        DEFAULT_COMPOSER_SCENE,
        "Missing",
        new Date(),
        "gone",
      ),
    ).toThrow(/no longer exists/);
  });

  it("round-trips through storage and migrates legacy arrays into schema v1", () => {
    const storage = memoryStorage();
    const library = saveComposition(
      emptyCompositionLibrary(),
      DEFAULT_COMPOSER_SCENE,
      "Plan",
    );
    writeCompositionLibrary(storage, library);
    expect(storage.values.has(COMPOSITION_LIBRARY_KEY)).toBe(true);
    expect(loadCompositionLibrary(storage).library.items[0]?.name).toBe("Plan");
    const migrated = parseCompositionLibrary(
      JSON.stringify([DEFAULT_COMPOSER_SCENE]),
    );
    expect(migrated.migrated).toBe(true);
    expect(migrated.library.items[0]?.scene.schemaVersion).toBe("1");
  });

  it("rejects corrupt, unsupported, duplicate-ID and extra-field library data", () => {
    expect(() => parseCompositionLibrary("{")).toThrow(/invalid JSON/);
    expect(() =>
      parseCompositionLibrary(
        JSON.stringify({ schemaVersion: "future", items: [] }),
      ),
    ).toThrow(/Unsupported/);
    const item = saveComposition(
      emptyCompositionLibrary(),
      DEFAULT_COMPOSER_SCENE,
      "Plan",
    ).items[0]!;
    expect(() =>
      parseCompositionLibrary(
        JSON.stringify({
          schemaVersion: "maataa.composition-library.v1",
          items: [item, item],
        }),
      ),
    ).toThrow(/duplicate/);
    expect(() =>
      parseCompositionLibrary(
        JSON.stringify({
          schemaVersion: "maataa.composition-library.v1",
          items: [],
          injected: true,
        }),
      ),
    ).toThrow(/unsupported fields/);
  });
});
