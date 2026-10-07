import { describe, expect, it } from "vitest";
import {
  COMPOSITION_LIBRARY_KEY,
  deleteComposition,
  duplicateComposition,
  emptyCompositionLibrary,
  loadCompositionLibrary,
  parseCompositionLibrary,
  restoreCompositionRevision,
  saveComposition,
  writeCompositionLibrary,
  LEGACY_COMPOSITION_LIBRARY_KEY,
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
    expect(first.items[0]!.revision).toBe(1);
    const updated = saveComposition(
      duplicate,
      { ...DEFAULT_COMPOSER_SCENE, name: "Updated scene" },
      "Operations",
      new Date("2026-10-06T00:00:00.002Z"),
      first.items[0]!.id,
    );
    expect(updated.items[0]!.scene.name).toBe("Updated scene");
    expect(updated.items[0]!.revision).toBe(2);
    expect(updated.items[0]!.history.map((entry) => entry.revision)).toEqual([
      1,
    ]);
    const restored = restoreCompositionRevision(
      updated,
      first.items[0]!.id,
      1,
      new Date("2026-10-06T00:00:00.003Z"),
    );
    expect(restored.items[0]!.revision).toBe(3);
    expect(restored.items[0]!.scene.name).toBe(DEFAULT_COMPOSER_SCENE.name);
    expect(restored.items[0]!.history.map((entry) => entry.revision)).toEqual([
      1, 2,
    ]);
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

  it("round-trips through storage and migrates legacy scene arrays", () => {
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
    expect(migrated.library.schemaVersion).toBe(
      "maataa.composition-library.v2",
    );
    expect(migrated.sourceVersion).toBe("legacy-array");
    expect(migrated.library.items[0]?.revision).toBe(1);
  });

  it("migrates v1 libraries from their old storage key and preserves revision 1", () => {
    const storage = memoryStorage();
    const scene = saveComposition(
      emptyCompositionLibrary(),
      DEFAULT_COMPOSER_SCENE,
      "Plan",
    ).items[0]!.scene;
    storage.setItem(
      LEGACY_COMPOSITION_LIBRARY_KEY,
      JSON.stringify({
        schemaVersion: "maataa.composition-library.v1",
        items: [
          {
            id: "plan-1",
            name: "Plan",
            savedAt: "2026-10-06T00:00:00.000Z",
            scene,
          },
        ],
      }),
    );
    const loaded = loadCompositionLibrary(storage);
    expect(loaded.migrated).toBe(true);
    expect(loaded.sourceVersion).toBe("v1");
    expect(loaded.library.items[0]).toMatchObject({
      id: "plan-1",
      revision: 1,
      history: [],
    });
    writeCompositionLibrary(storage, loaded.library);
    expect(storage.values.has("maataa.composition-library.v2")).toBe(true);
  });

  it("bounds revision retention and rejects unsupported future formats", () => {
    let library = saveComposition(
      emptyCompositionLibrary(),
      DEFAULT_COMPOSER_SCENE,
      "Bounded",
    );
    const id = library.items[0]!.id;
    for (let revision = 2; revision <= 25; revision += 1) {
      library = saveComposition(
        library,
        { ...DEFAULT_COMPOSER_SCENE, name: `Revision ${revision}` },
        "Bounded",
        new Date(
          `2026-10-${String(Math.min(revision, 28)).padStart(2, "0")}T00:00:00.000Z`,
        ),
        id,
      );
    }
    expect(library.items[0]!.revision).toBe(25);
    expect(library.items[0]!.history).toHaveLength(20);
    expect(library.items[0]!.history[0]!.revision).toBe(5);
    expect(() =>
      parseCompositionLibrary(
        JSON.stringify({
          schemaVersion: "maataa.composition-library.v3",
          items: [],
        }),
      ),
    ).toThrow(/Unsupported/);
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
          schemaVersion: "maataa.composition-library.v2",
          items: [item, item],
        }),
      ),
    ).toThrow(/duplicate/);
    expect(() =>
      parseCompositionLibrary(
        JSON.stringify({
          schemaVersion: "maataa.composition-library.v2",
          items: [],
          injected: true,
        }),
      ),
    ).toThrow(/unsupported fields/);
  });
});
