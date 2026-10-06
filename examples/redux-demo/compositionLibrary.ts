import { parseCompositionInput } from "../../src/composer/spec";
import { isCompositionData } from "../../src/composer/sceneData";
import type {
  CompositionSpecV1,
  ComposerScene,
} from "../../src/composer/types";

export const COMPOSITION_LIBRARY_KEY = "maataa.composition-library.v1";
export const COMPOSITION_LIBRARY_SCHEMA =
  "maataa.composition-library.v1" as const;
export interface SavedCompositionV1 {
  id: string;
  name: string;
  savedAt: string;
  scene: CompositionSpecV1;
}
export interface CompositionLibraryV1 {
  schemaVersion: typeof COMPOSITION_LIBRARY_SCHEMA;
  items: SavedCompositionV1[];
}
export interface CompositionLibraryLoad {
  library: CompositionLibraryV1;
  migrated: boolean;
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

function migrateLegacyItems(value: unknown): CompositionLibraryV1 | undefined {
  if (!Array.isArray(value) || value.length > 100) return undefined;
  try {
    const items = value.map((candidate, index) => {
      if (!candidate || typeof candidate !== "object")
        throw new Error("Invalid legacy scene");
      const scene = parseCompositionInput(JSON.stringify(candidate) as string);
      const old = candidate as Partial<ComposerScene>;
      return {
        id: safeId(old.id || `legacy-${index + 1}`),
        name: old.name || `Migrated composition ${index + 1}`,
        savedAt: scene.updatedAt,
        scene,
      };
    });
    return { schemaVersion: COMPOSITION_LIBRARY_SCHEMA, items };
  } catch {
    return undefined;
  }
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
    const migrated = migrateLegacyItems(input);
    if (!migrated)
      throw new Error(
        "Legacy composition library could not be safely migrated.",
      );
    return { library: migrated, migrated: true };
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
    Object.keys(value).some((key) => key !== "schemaVersion" && key !== "items")
  )
    throw new Error("Saved composition library has unsupported fields.");
  if (
    value.schemaVersion !== COMPOSITION_LIBRARY_SCHEMA ||
    !Array.isArray(value.items) ||
    value.items.length > 100
  )
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
        (key) => !["id", "name", "savedAt", "scene"].includes(key),
      )
    )
      throw new Error(`Saved item ${index + 1} has unsupported fields.`);
    if (
      typeof item.id !== "string" ||
      !/^[a-z0-9][a-z0-9-]{1,80}$/.test(item.id) ||
      typeof item.name !== "string" ||
      typeof item.savedAt !== "string" ||
      !Number.isFinite(Date.parse(item.savedAt)) ||
      ids.has(item.id)
    )
      throw new Error(
        `Saved item ${index + 1} has missing or duplicate metadata.`,
      );
    if (item.name.trim().length < 1 || item.name.length > 120)
      throw new Error(
        `Saved item ${index + 1} needs a name under 120 characters.`,
      );
    ids.add(item.id);
    return {
      id: item.id,
      name: item.name,
      savedAt: item.savedAt,
      scene: parseCompositionInput(JSON.stringify(item.scene)),
    };
  });
  return {
    library: { schemaVersion: COMPOSITION_LIBRARY_SCHEMA, items },
    migrated: false,
  };
}

export function loadCompositionLibrary(
  storage?: StorageLike,
): CompositionLibraryLoad {
  if (!storage) return { library: emptyCompositionLibrary(), migrated: false };
  try {
    const raw = storage.getItem(COMPOSITION_LIBRARY_KEY);
    return raw
      ? parseCompositionLibrary(raw)
      : { library: emptyCompositionLibrary(), migrated: false };
  } catch {
    return { library: emptyCompositionLibrary(), migrated: false };
  }
}

export function writeCompositionLibrary(
  storage: StorageLike,
  library: CompositionLibraryV1,
): void {
  // Round-trip through the same gate used for imports before persistence.
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
  const parsed = parseCompositionInput(JSON.stringify(scene));
  if (replaceId && !library.items.some((existing) => existing.id === replaceId))
    throw new Error(
      "The selected saved composition no longer exists. Choose it again or save a new copy.",
    );
  let id = replaceId ?? `${safeId(cleanName)}-${now.getTime().toString(36)}`;
  if (!replaceId) {
    let suffix = 2;
    while (library.items.some((existing) => existing.id === id))
      id = `${safeId(cleanName)}-${now.getTime().toString(36)}-${suffix++}`;
  }
  const item = {
    id,
    name: cleanName,
    savedAt: now.toISOString(),
    scene: parsed,
  };
  const items = replaceId
    ? library.items.map((existing) =>
        existing.id === replaceId ? item : existing,
      )
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
  const copyName = `${source.name} copy`;
  return saveComposition(library, source.scene, copyName, now);
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
