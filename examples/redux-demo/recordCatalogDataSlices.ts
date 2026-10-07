import { DEMO_SCENARIO_REGISTRY } from "../../src/registries/demoScenarioRegistry";
import { DEMO_DATASET_REGISTRY } from "../../src/registries/demoDatasetRegistry";
import { REDUX_SELECTOR_REGISTRY } from "../../src/registries/reduxSelectorRegistry";
import { REDUX_SLICE_REGISTRY } from "../../src/registries/reduxSliceRegistry";
import { TYPE_CONTRACT_REGISTRY } from "../../src/registries/typeContractRegistry";
import { REGISTRY_REGISTRY } from "../../src/registries/registryRegistry";
import { DEMO_SCENARIOS } from "../../src/demo/scenarios";
import { DEMO_DATA } from "../../src/static-data/demoBundle";

export type RecordCatalogKind =
  "redux" | "selectors" | "types" | "datasets" | "scenarios" | "registries";
export type RecordCatalogItem = {
  id: string;
  name: string;
  importPath?: string;
  meta?: string;
  ordinal?: number;
};

const CATALOGS = {
  redux: REDUX_SLICE_REGISTRY,
  selectors: REDUX_SELECTOR_REGISTRY,
  types: TYPE_CONTRACT_REGISTRY,
  datasets: DEMO_DATASET_REGISTRY,
  scenarios: DEMO_SCENARIO_REGISTRY,
  registries: REGISTRY_REGISTRY,
} as const;

const DATASET_SOURCES: Record<string, readonly unknown[]> = {
  organisations: DEMO_DATA.organisations,
  users: DEMO_DATA.users,
  identities: DEMO_DATA.identities,
  projects: DEMO_DATA.projects,
  events: DEMO_DATA.events,
  commerce: [...DEMO_DATA.vendors, ...DEMO_DATA.bookings],
  finance: [...DEMO_DATA.transactions, DEMO_DATA.financeKpis],
  tasks: DEMO_DATA.tasks,
  ai: [
    ...DEMO_DATA.models,
    ...DEMO_DATA.agents,
    ...DEMO_DATA.evaluations,
    ...DEMO_DATA.aiMessages,
  ],
  notifications: [...DEMO_DATA.notifications, ...DEMO_DATA.activity],
  production: [DEMO_DATA.production],
  catalogs: Object.values(CATALOGS).flat(),
};

function getRecord(
  kind: RecordCatalogKind,
  id: string,
): Record<string, unknown> {
  const records = CATALOGS[kind] as readonly Record<string, unknown>[];
  const index = records.findIndex((entry) => entry.id === id);
  if (index < 0)
    throw new Error(`No ${kind} catalog specimen is registered for ${id}`);
  return { ...records[index], ordinal: records[index]!.ordinal ?? index + 1 };
}

function readableGroup(value: unknown): string {
  return typeof value === "string"
    ? value.replaceAll("_", " ").replaceAll(".", " · ")
    : "MAATAA UI";
}

function previewValue(value: unknown): string {
  try {
    const text = JSON.stringify(value, null, 2);
    return text.length > 900 ? `${text.slice(0, 897)}…` : text;
  } catch {
    return "No serializable sample is registered.";
  }
}

/** Deterministic, read-only specimen for metadata catalogs that do not execute in the explorer. */
export function createRecordCatalogDataSlice(
  kind: RecordCatalogKind,
  item: RecordCatalogItem,
) {
  const record = getRecord(kind, item.id);
  const ordinal = Number(record.ordinal ?? item.ordinal ?? 0);
  const group = readableGroup(
    record.group ??
      record.groupKey ??
      record.module ??
      record.reducerKey ??
      item.meta,
  );
  let detail: string;
  let sample: string;
  let source: string;
  let boundary: string;

  if (kind === "redux") {
    detail = `Reducer key “${String(record.reducerKey)}” declared by the package Redux registry.`;
    sample = previewValue({
      id: record.id,
      reducerKey: record.reducerKey,
      reducerImport: record.importPath,
      authority: "host creates and configures the store",
    });
    source = String(record.importPath ?? "@maataa/ui/redux");
    boundary =
      "This is a contract preview; it does not mount a store, mutate state, or provide application authority.";
  } else if (kind === "selectors") {
    detail = `Derived-state selector “${String(record.name)}” from the registered Redux selector vocabulary.`;
    sample = previewValue({
      id: record.id,
      selector: record.name,
      importPath: "@maataa/ui/redux/selectors",
      input: "host-owned Redux state",
      output: "derived value",
    });
    source = "@maataa/ui/redux/selectors";
    boundary =
      "This is selector metadata only; no selector is invoked and no state result is fabricated.";
  } else if (kind === "types") {
    detail = `Shared TypeScript contract module “${String(record.module)}”.`;
    sample = previewValue({
      id: record.id,
      module: record.module,
      importPath: record.importPath,
      role: "compile-time type contract",
    });
    source = String(record.importPath ?? "@maataa/ui/types");
    boundary =
      "Types are compile-time contracts; this preview does not claim runtime validation or serialize a type as data.";
  } else if (kind === "datasets") {
    const key = String(record.name);
    const rows = DATASET_SOURCES[key] ?? [];
    detail = `${rows.length} deterministic synthetic records currently contribute to this named demo dataset.`;
    sample = previewValue({
      datasetId: record.id,
      name: key,
      firstRecords: rows.slice(0, 2),
    });
    source = `@maataa/ui/static-data · ${key}`;
    boundary =
      "Synthetic package fixtures only; values are not live, complete, or authoritative business data.";
  } else if (kind === "scenarios") {
    const scenario = DEMO_SCENARIOS.find(
      (entry) => entry.id === record.scenarioId,
    );
    if (!scenario)
      throw new Error(
        `No demo scenario implementation is registered for ${String(record.scenarioId)}`,
      );
    detail = scenario.description;
    sample = previewValue({
      registryId: record.id,
      id: scenario.id,
      workspaceTypeId: scenario.workspaceTypeId,
      pageTypeId: scenario.pageTypeId,
      layoutTypeId: scenario.layoutTypeId,
      deviceTypeId: scenario.deviceTypeId,
      generatorId: scenario.generatorId,
      toolId: scenario.toolId,
      aiSpaceId: scenario.aiSpaceId,
    });
    source = "@maataa/ui/demo/scenarios";
    boundary =
      "Scenario selection is a deterministic local demo; it does not connect product backends, tools, or models.";
  } else {
    detail = `${String(record.kind)} registry maintained by ${String(record.authority)}.`;
    sample = previewValue({
      id: record.id,
      name: record.name,
      group: record.group,
      authority: record.authority,
      kind: record.kind,
    });
    source = "@maataa/ui/registries/registryRegistry";
    boundary =
      "Registry metadata documents declared records; it does not independently prove runtime compatibility or release qualification.";
  }

  return {
    recordId: String(record.id),
    name: String(record.name ?? record.module ?? record.scenarioId),
    kind,
    ordinal,
    family: group,
    title: `${String(record.name ?? record.module ?? record.scenarioId)} · ${kind} specimen`,
    detail,
    source,
    sample,
    provenance:
      "Package catalog metadata and deterministic synthetic fixtures" as const,
    boundary,
    reference: `${kind.toUpperCase()}-${String(ordinal).padStart(3, "0")}`,
  };
}
