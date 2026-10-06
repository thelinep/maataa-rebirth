import { DEVICE_REGISTRY, type DeviceDefinition } from "../../src/registries/deviceRegistry";
import { GENERATOR_REGISTRY } from "../../src/registries/generatorRegistry";
import { TOOL_REGISTRY } from "../../src/registries/toolRegistry";
import { AI_SPACE_REGISTRY } from "../../src/registries/aiSpaceRegistry";
import { VIEWPORT_REGISTRY } from "../../src/registries/viewportRegistry";

type GroupedCatalogRecord = Readonly<{
  id: string;
  name: string;
  ordinal: number;
  groupLabels: readonly string[];
}>;

function slug(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function lookup<T extends { id: string }>(records: readonly T[], id: string, family: string): T {
  const record = records.find((entry) => entry.id === id);
  if (!record) throw new Error(`No ${family} data slice is registered for ${id}`);
  return record;
}

function groupedFamilies(record: GroupedCatalogRecord): readonly string[] {
  return record.groupLabels.length ? record.groupLabels : ["Uncategorized"];
}

/** Device registry facts plus a distinct, synthetic screen composition for every device. */
export function createDeviceDataSlice(device: DeviceDefinition) {
  const record = lookup(DEVICE_REGISTRY, device.id, "device");
  const deviceOrdinal = DEVICE_REGISTRY.findIndex((entry) => entry.id === record.id) + 1;
  const viewport = VIEWPORT_REGISTRY.find((entry) => entry.id === record.defaultViewport);
  const family = record.group.replaceAll("_", " ").toLowerCase();
  const sampleTitle = `${record.name} sample surface`;
  return {
    recordId: record.id,
    family: record.group,
    domain: slug(record.group),
    title: sampleTitle,
    summary: `Illustrative ${family} screen content inside the registry-declared device frame.`,
    viewportName: viewport?.name ?? "Viewport dimensions not registered",
    width: viewport?.width ?? null,
    height: viewport?.height ?? null,
    orientation: record.defaultOrientation,
    inputModalities: record.inputModalities,
    capabilities: record.capabilities,
    safeArea: record.safeArea,
    regions: [
      { title: "Primary surface", label: record.name, value: `Sample ${family} workspace`, note: "Synthetic content · not connected to an application" },
      { title: "Supporting context", label: "Current task", value: `Review the ${record.name.toLowerCase()} preview`, note: "Illustrative interaction · no task is executed" },
      { title: "Device capabilities", label: "Declared inputs", value: record.inputModalities.join(" · "), note: `${record.capabilities.length} registry-declared capabilities · behavior not qualified` },
    ],
    reference: `DV-${String(deviceOrdinal).padStart(3, "0")}`,
    provenance: "Synthetic device fixture" as const,
    boundary: "The viewport is simulated; responsive behavior, hardware, sensors, network, and operating-system integrations are not qualified.",
  };
}

/** Record-bound local outline; this displays a fixture and never calls a generator. */
export function createGeneratorDataSlice(id: string) {
  const generator = lookup(GENERATOR_REGISTRY as readonly GroupedCatalogRecord[], id, "generator");
  const families = groupedFamilies(generator);
  const family = families[0]!;
  return {
    recordId: generator.id,
    ordinal: generator.ordinal,
    family,
    familyGroups: families,
    domain: slug(family),
    title: `${generator.name} outline`,
    summary: `A local, illustrative input and output outline for the ${family} catalog family.`,
    inputLabel: `${generator.name} brief`,
    initialInput: `Prepare an illustrative ${generator.name.toLowerCase()} for review`,
    outputShape: `${generator.name} · sample sections, review notes, and a draft handoff`,
    reference: `GEN-${String(generator.ordinal).padStart(3, "0")}`,
    provenance: "Synthetic generator fixture" as const,
    boundary: "No file is generated; no model or provider is called, and no generator implementation run is claimed.",
  };
}

/** Record-bound tool contract example with execution and authority explicitly disabled. */
export function createToolDataSlice(id: string) {
  const tool = lookup(TOOL_REGISTRY as readonly GroupedCatalogRecord[], id, "tool");
  const families = groupedFamilies(tool);
  const family = families[0]!;
  return {
    recordId: tool.id,
    ordinal: tool.ordinal,
    family,
    familyGroups: families,
    domain: slug(family),
    title: `${tool.name} tool outline`,
    summary: `An illustrative ${family} input and result shape bound to this tool record.`,
    input: JSON.stringify({ tool: tool.id, operation: `preview ${tool.name.toLowerCase()}`, mode: "illustrative", requestSent: false }, null, 2),
    output: JSON.stringify({ result: "illustrative only", toolExecuted: false, sideEffects: false }, null, 2),
    reference: `TOOL-${String(tool.ordinal).padStart(3, "0")}`,
    provenance: "Synthetic tool fixture" as const,
    boundary: "Tool execution is disabled; no host permission is granted, no request is sent, and no side effects occur.",
  };
}

/** Record-bound AI-space context and response outline; it never invokes a model or tools. */
export function createAISpaceDataSlice(id: string) {
  const space = lookup(AI_SPACE_REGISTRY as readonly GroupedCatalogRecord[], id, "AI-space");
  const families = groupedFamilies(space);
  const family = families[0]!;
  return {
    recordId: space.id,
    ordinal: space.ordinal,
    family,
    familyGroups: families,
    domain: slug(family),
    title: `${space.name} session outline`,
    summary: `A synthetic session fixture for the ${family} catalog family.`,
    task: `Review a sample ${space.name} request`,
    context: `${family} context · local synthetic fixture · no files or external sources attached`,
    tools: "No model, retrieval source, or tool is connected to this preview.",
    output: `Illustrative ${space.name} response shape · not generated`,
    reference: `AI-${String(space.ordinal).padStart(3, "0")}`,
    provenance: "Synthetic AI-space fixture" as const,
    boundary: "No model was called, source retrieved, citation verified, or tool action performed.",
  };
}
