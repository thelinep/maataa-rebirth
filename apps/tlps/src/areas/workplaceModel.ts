import { parseRegisterRecords, type RecordField, type RegisterRecord } from "@maataa/ui/compounds";
import { TLPS_OS_CATALOG } from "../operatingSystems";
import { AREA_DEFINITIONS, workspacesForArea } from "./areaModel";

export const WORKPLACE_SCHEMA = "tlps.workplace-demo.v1";
export const WORKPLACE_STORE_KEY = "tlps.workplace-demos.v1";

const planningFields: readonly RecordField[] = [
  { key: "title", label: "Planning item", kind: "text", required: true },
  { key: "owner", label: "Responsible person", kind: "text", required: true },
  { key: "notes", label: "Planning notes", kind: "textarea", required: true },
];

const tasks: Record<string, readonly [string, string, string]> = {
  "production-os": ["Describe the production brief", "Check people, dates and equipment", "Rehearse the production handover"],
  "film-os": ["Describe the film and format", "Review story and production stages", "Rehearse the film-plan handover"],
  "campaign-os": ["Record the campaign objective", "Review channels and budget estimates", "Rehearse campaign delivery"],
  atl: ["List proposed media placements", "Review rates and audience assumptions", "Rehearse the media-plan handover"],
  btl: ["Describe the local activation", "Review staffing and permission questions", "Rehearse the activation plan"],
  "ooh-dooh": ["List outdoor placement candidates", "Review availability and artwork needs", "Rehearse the outdoor-plan handover"],
  marketplace: ["List resource candidates", "Compare estimates and unknown availability", "Rehearse the resource shortlist"],
  "evidence-os": ["Describe the evidence items", "Review provenance and missing checks", "Rehearse the evidence index"],
  "finance-os": ["List estimated costs", "Review assumptions and funding gaps", "Rehearse the budget handover"],
  "investor-hub": ["Describe the funding proposal", "Review pitch assumptions and questions", "Rehearse the pitch handover"],
  "event-os": ["Describe the event brief", "Review guest needs and run of show", "Rehearse the event plan"],
  "wedding-os": ["List wedding functions", "Review family notes and estimates", "Rehearse the function plan"],
  "exhibition-spatial": ["Describe the spatial concept", "Review layout and fabrication questions", "Rehearse the spatial handover"],
  "maataa-ai": ["Write the assistance request", "Review inputs and intended output", "Rehearse the human review process"],
  analytics: ["Describe the report question", "Review sources and measurement assumptions", "Rehearse the report handover"],
  "core-platform": ["List team access intentions", "Review responsibilities and access scope", "Rehearse the administration checklist"],
  casting: ["List casting roles and candidates", "Review audition plans and consent questions", "Rehearse the casting shortlist"],
  crew: ["List crew responsibilities", "Review department needs and availability questions", "Rehearse the crew handover"],
  location: ["Describe location candidates", "Review access and permission questions", "Rehearse the location shortlist"],
  "equipment-logistics": ["List equipment and travel needs", "Review quantities and estimate assumptions", "Rehearse the logistics handover"],
};

/** Every mapped workspace has a separate demo in each related area. */
export const TLPS_WORKPLACES = TLPS_OS_CATALOG.flatMap((area) => {
  const definition = AREA_DEFINITIONS[area.id];
  return workspacesForArea(definition).map((workspace) => ({
    ...workspace,
    key: `${area.id}:${workspace.id}`,
    areaId: area.id,
    areaName: area.name,
    boundary: definition.boundary,
    recordLabel: definition.recordLabel || "Planning item",
    fields: definition.mode === "register" ? definition.fields : planningFields,
    statuses: definition.mode === "register" ? definition.statuses : ["Draft", "Needs review", "Reviewed (local)"],
    samples: definition.mode === "register" ? definition.samples : [{ title: `Sample · ${workspace.name}`, owner: "Sample plan owner", notes: `${area.detail} Availability and permissions are unverified.` }],
    steps: [...tasks[area.id], "Prepare a local handover"],
  }));
});
export type Workplace = (typeof TLPS_WORKPLACES)[number];
export type WorkplaceRun = { records: RegisterRecord[]; step: number; owner: string; notes: string[] };
export type WorkplaceStore = { schema: typeof WORKPLACE_SCHEMA; runs: Record<string, WorkplaceRun> };
export const emptyWorkplaceRun = (): WorkplaceRun => ({ records: [], step: 0, owner: "", notes: ["", "", "", ""] });
export const emptyWorkplaceStore = (): WorkplaceStore => ({ schema: WORKPLACE_SCHEMA, runs: {} });

export function parseWorkplaceStore(raw: unknown): WorkplaceStore | null {
  if (!raw || typeof raw !== "object" || (raw as WorkplaceStore).schema !== WORKPLACE_SCHEMA) return null;
  const runs = (raw as WorkplaceStore).runs;
  if (!runs || typeof runs !== "object" || Array.isArray(runs)) return null;
  const result = emptyWorkplaceStore();
  for (const workplace of TLPS_WORKPLACES) {
    const run = runs[workplace.key];
    if (!run || typeof run !== "object" || !Number.isInteger(run.step) || run.step < 0 || run.step > 4 || typeof run.owner !== "string" || !Array.isArray(run.notes) || run.notes.length !== 4 || !run.notes.every((note) => typeof note === "string")) continue;
    const records = parseRegisterRecords(run.records, workplace.fields, workplace.statuses);
    if (!records) continue;
    const clean = { records, step: run.step, owner: run.owner.slice(0, 160), notes: run.notes.map((note) => note.slice(0, 2000)) };
    // Corrupt or edited storage cannot restore completion without its local review inputs.
    if (clean.step && (!clean.records.length || !clean.owner.trim() || clean.notes.slice(0, clean.step).some((note) => !note.trim()))) clean.step = 0;
    result.runs[workplace.key] = clean;
  }
  return result;
}

export function advanceWorkplaceRun(run: WorkplaceRun): WorkplaceRun {
  if (run.step >= 4 || !run.records.length || !run.owner.trim() || !run.notes[run.step]?.trim()) return run;
  return { ...run, step: run.step + 1 };
}

export function workplaceHandover(workplace: Workplace, run: WorkplaceRun) {
  return {
    schema: WORKPLACE_SCHEMA,
    exportedAt: new Date().toISOString(),
    workplace: { key: workplace.key, id: workplace.id, name: workplace.name, area: workplace.areaName },
    scope: "browser-local-demo",
    demoComplete: run.step === 4,
    productionReady: false,
    confirmedBookings: false,
    realPayments: false,
    authenticatedApproval: false,
    boundary: workplace.boundary,
    steps: workplace.steps.map((title, index) => ({ title, note: run.notes[index], checkedLocally: index < run.step })),
    owner: run.owner,
    records: run.records,
  };
}
