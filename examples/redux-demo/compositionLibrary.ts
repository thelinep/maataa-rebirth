import { parseCompositionInput } from "../../src/composer/spec";
import { isCompositionData } from "../../src/composer/sceneData";
import type {
  CompositionSpecV1,
  ComposerScene,
} from "../../src/composer/types";

export const COMPOSITION_LIBRARY_KEY = "maataa.composition-library.v2";
export const LEGACY_COMPOSITION_LIBRARY_KEY = "maataa.composition-library.v1";
export const COMPOSITION_LIBRARY_SCHEMA =
  "maataa.composition-library.v2" as const;
export const COMPOSITION_REVISION_LIMIT = 20;
export interface CompositionRevisionV2 {
  revision: number;
  savedAt: string;
  scene: CompositionSpecV1;
}
export interface SavedCompositionV1 {
  id: string;
  name: string;
  savedAt: string;
  revision: number;
  scene: CompositionSpecV1;
  history: CompositionRevisionV2[];
}
export interface CompositionLibraryV1 {
  schemaVersion: typeof COMPOSITION_LIBRARY_SCHEMA;
  items: SavedCompositionV1[];
}
export interface CompositionLibraryLoad {
  library: CompositionLibraryV1;
  migrated: boolean;
  sourceVersion: "v2" | "v1" | "legacy-array" | "empty";
}
export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export function emptyCompositionLibrary(): CompositionLibraryV1 {
  return { schemaVersion: COMPOSITION_LIBRARY_SCHEMA, items: [] };
}

function safeId(value: string) {
  return (
    value
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 48) || "composition"
  );
}

function parseScene(value: unknown): CompositionSpecV1 {
  return parseCompositionInput(JSON.stringify(value));
}

function migrateLegacyItems(value: unknown): CompositionLibraryV1 | undefined {
  if (!Array.isArray(value) || value.length > 100) return undefined;
  try {
    const ids = new Set<string>();
    const items = value.map((candidate, index): SavedCompositionV1 => {
      if (!candidate || typeof candidate !== "object")
        throw new Error("Invalid legacy scene");
      const scene = parseScene(candidate);
      const old = candidate as Partial<ComposerScene>;
      const baseId = safeId(old.id || `legacy-${index + 1}`);
      let id = baseId;
      let suffix = 2;
      while (ids.has(id)) id = `${baseId}-${suffix++}`;
      const name = (old.name || `Migrated composition ${index + 1}`).slice(
        0,
        120,
      );
      ids.add(id);
      return {
        id,
        name,
        savedAt: scene.updatedAt,
        revision: 1,
        scene,
        history: [],
      };
    });
    return { schemaVersion: COMPOSITION_LIBRARY_SCHEMA, items };
  } catch {
    return undefined;
  }
}

function normalizeV1Items(value: unknown): CompositionLibraryV1 | undefined {
  if (!Array.isArray(value) || value.length > 100) return undefined;
  try {
    const ids = new Set<string>();
    const items = value.map((raw, index): SavedCompositionV1 => {
      if (!raw || typeof raw !== "object" || Array.isArray(raw))
        throw new Error("Invalid v1 item");
      const item = raw as Record<string, unknown>;
      if (
        Object.keys(item).some(
          (key) => !["id", "name", "savedAt", "scene"].includes(key),
        )
      )
        throw new Error("Unsupported v1 item field");
      const scene = parseScene(item.scene);
      validMetadata(item, ids, index);
      return {
        id: item.id as string,
        name: item.name as string,
        savedAt: item.savedAt as string,
        revision: 1,
        scene,
        history: [],
      };
    });
    return { schemaVersion: COMPOSITION_LIBRARY_SCHEMA, items };
  } catch {
    return undefined;
  }
}

function validMetadata(
  item: Record<string, unknown>,
  ids: Set<string>,
  index: number,
) {
  if (
    typeof item.id !== "string" ||
    !/^[a-z0-9][a-z0-9-]{1,80}$/.test(item.id) ||
    typeof item.name !== "string" ||
    item.name.trim().length < 1 ||
    item.name.length > 120 ||
    typeof item.savedAt !== "string" ||
    !Number.isFinite(Date.parse(item.savedAt)) ||
    ids.has(item.id)
  )
    throw new Error(
      `Saved item ${index + 1} has missing or duplicate metadata.`,
    );
  ids.add(item.id);
}

export function parseCompositionLibrary(
  source: string,
): CompositionLibraryLoad {
  if (source.length > 2_000_000)
    throw new Error("Saved composition library exceeds the 2 MB limit.");
  let input: unknown;
  try {
    input = JSON.parse(source);
  } catch {
    throw new Error("Saved composition library is invalid JSON.");
  }
  if (Array.isArray(input)) {
    const library = migrateLegacyItems(input);
    if (!library)
      throw new Error(
        "Legacy composition library could not be safely migrated.",
      );
    return { library, migrated: true, sourceVersion: "legacy-array" };
  }
  if (
    !isCompositionData(input) ||
    !input ||
    typeof input !== "object" ||
    Array.isArray(input)
  )
    throw new Error("Saved composition library must be safe plain JSON data.");
  const value = input as Record<string, unknown>;
  if (
    Object.keys(value).some((key) => !["schemaVersion", "items"].includes(key))
  )
    throw new Error("Saved composition library has unsupported fields.");
  if (!Array.isArray(value.items) || value.items.length > 100)
    throw new Error("Unsupported composition library version or item count.");
  if (value.schemaVersion === "maataa.composition-library.v1") {
    const library = normalizeV1Items(value.items);
    if (!library)
      throw new Error(
        "Version 1 composition library could not be safely migrated.",
      );
    return { library, migrated: true, sourceVersion: "v1" };
  }
  if (value.schemaVersion !== COMPOSITION_LIBRARY_SCHEMA)
    throw new Error("Unsupported composition library version or item count.");
  const ids = new Set<string>();
  const items = value.items.map((raw, index): SavedCompositionV1 => {
    if (
      !raw ||
      typeof raw !== "object" ||
      Array.isArray(raw) ||
      !isCompositionData(raw)
    )
      throw new Error(`Saved item ${index + 1} is invalid.`);
    const item = raw as Record<string, unknown>;
    if (
      Object.keys(item).some(
        (key) =>
          !["id", "name", "savedAt", "revision", "scene", "history"].includes(
            key,
          ),
      )
    )
      throw new Error(`Saved item ${index + 1} has unsupported fields.`);
    validMetadata(item, ids, index);
    if (
      !Number.isSafeInteger(item.revision) ||
      (item.revision as number) < 1 ||
      !Array.isArray(item.history) ||
      item.history.length > COMPOSITION_REVISION_LIMIT
    )
      throw new Error(`Saved item ${index + 1} has invalid revision history.`);
    const scene = parseScene(item.scene);
    let previous = 0;
    const history = item.history.map(
      (rawRevision, revisionIndex): CompositionRevisionV2 => {
        if (
          !rawRevision ||
          typeof rawRevision !== "object" ||
          Array.isArray(rawRevision) ||
          !isCompositionData(rawRevision)
        )
          throw new Error(
            `Saved item ${index + 1} revision ${revisionIndex + 1} is invalid.`,
          );
        const entry = rawRevision as Record<string, unknown>;
        if (
          Object.keys(entry).some(
            (key) => !["revision", "savedAt", "scene"].includes(key),
          ) ||
          !Number.isSafeInteger(entry.revision) ||
          (entry.revision as number) <= previous ||
          (entry.revision as number) >= (item.revision as number) ||
          typeof entry.savedAt !== "string" ||
          !Number.isFinite(Date.parse(entry.savedAt))
        )
          throw new Error(
            `Saved item ${index + 1} revision ${revisionIndex + 1} has invalid metadata.`,
          );
        previous = entry.revision as number;
        return {
          revision: previous,
          savedAt: entry.savedAt,
          scene: parseScene(entry.scene),
        };
      },
    );
    const expectedHistoryLength = Math.min(
      (item.revision as number) - 1,
      COMPOSITION_REVISION_LIMIT,
    );
    const firstExpectedRevision =
      (item.revision as number) - expectedHistoryLength;
    if (
      history.length !== expectedHistoryLength ||
      history.some(
        (entry, historyIndex) =>
          entry.revision !== firstExpectedRevision + historyIndex,
      )
    )
      throw new Error(
        `Saved item ${index + 1} has incomplete revision history.`,
      );
    return {
      id: item.id as string,
      name: item.name as string,
      savedAt: item.savedAt as string,
      revision: item.revision as number,
      scene,
      history,
    };
  });
  return {
    library: { schemaVersion: COMPOSITION_LIBRARY_SCHEMA, items },
    migrated: false,
    sourceVersion: "v2",
  };
}

export function loadCompositionLibrary(
  storage?: StorageLike,
): CompositionLibraryLoad {
  if (!storage)
    return {
      library: emptyCompositionLibrary(),
      migrated: false,
      sourceVersion: "empty",
    };
  try {
    const current = storage.getItem(COMPOSITION_LIBRARY_KEY);
    if (current) return parseCompositionLibrary(current);
    const legacy = storage.getItem(LEGACY_COMPOSITION_LIBRARY_KEY);
    return legacy
      ? parseCompositionLibrary(legacy)
      : {
          library: emptyCompositionLibrary(),
          migrated: false,
          sourceVersion: "empty",
        };
  } catch {
    return {
      library: emptyCompositionLibrary(),
      migrated: false,
      sourceVersion: "empty",
    };
  }
}

export function writeCompositionLibrary(
  storage: StorageLike,
  library: CompositionLibraryV1,
): void {
  const safe = parseCompositionLibrary(JSON.stringify(library)).library;
  storage.setItem(COMPOSITION_LIBRARY_KEY, JSON.stringify(safe));
}

export function saveComposition(
  library: CompositionLibraryV1,
  scene: ComposerScene,
  name: string,
  now = new Date(),
  replaceId?: string,
): CompositionLibraryV1 {
  const cleanName = name.trim();
  if (!cleanName || cleanName.length > 120)
    throw new Error(
      "Give the composition a name between 1 and 120 characters.",
    );
  const parsed = parseScene(scene);
  const existing = replaceId
    ? library.items.find((item) => item.id === replaceId)
    : undefined;
  if (replaceId && !existing)
    throw new Error(
      "The selected saved composition no longer exists. Choose it again or save a new copy.",
    );
  let id = replaceId ?? `${safeId(cleanName)}-${now.getTime().toString(36)}`;
  if (!replaceId) {
    let suffix = 2;
    while (library.items.some((item) => item.id === id))
      id = `${safeId(cleanName)}-${now.getTime().toString(36)}-${suffix++}`;
  }
  const savedAt = now.toISOString();
  const history = existing
    ? [
        ...existing.history,
        {
          revision: existing.revision,
          savedAt: existing.savedAt,
          scene: existing.scene,
        },
      ]
    : [];
  const item: SavedCompositionV1 = {
    id,
    name: cleanName,
    savedAt,
    revision: existing ? existing.revision + 1 : 1,
    scene: parsed,
    history: history.slice(-COMPOSITION_REVISION_LIMIT),
  };
  const items = existing
    ? library.items.map((entry) => (entry.id === replaceId ? item : entry))
    : [...library.items, item];
  if (items.length > 100)
    throw new Error("The local library is full (100 compositions).");
  return { schemaVersion: COMPOSITION_LIBRARY_SCHEMA, items };
}

export function duplicateComposition(
  library: CompositionLibraryV1,
  itemId: string,
  now = new Date(),
): CompositionLibraryV1 {
  const source = library.items.find((item) => item.id === itemId);
  if (!source) throw new Error("Choose a saved composition to duplicate.");
  return saveComposition(library, source.scene, `${source.name} copy`, now);
}

export function restoreCompositionRevision(
  library: CompositionLibraryV1,
  itemId: string,
  revision: number,
  now = new Date(),
): CompositionLibraryV1 {
  const source = library.items.find((item) => item.id === itemId);
  if (!source) throw new Error("Choose a saved composition first.");
  const snapshot = source.history.find((entry) => entry.revision === revision);
  if (!snapshot)
    throw new Error("That composition revision is no longer available.");
  return saveComposition(library, snapshot.scene, source.name, now, itemId);
}

export function deleteComposition(
  library: CompositionLibraryV1,
  itemId: string,
): CompositionLibraryV1 {
  return {
    ...library,
    items: library.items.filter((item) => item.id !== itemId),
  };
}
