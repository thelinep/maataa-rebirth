// Local work areas for every TLPS operating system (OS) entry.
// Five areas open the existing planning workflow; the rest keep a browser-local register of
// synthetic or user-entered records. Nothing here books, pays, contracts or publishes anything.
import { WORKSPACE_TYPES } from "@maataa/ui/registries/workspaceRegistry";
import type { TlpsOsId } from "../operatingSystems";
import { TLPS_AI_SPACE_REGISTRY } from "../registries/aiSpaceRegistry";
import { TLPS_WORKSPACE_TYPES } from "../registries/workspaceRegistry";
import { TLPS_ROLES, type TlpsView } from "../types";

export const TLPS_AREA_STORE_KEY = "tlps.areas.v1";
export const TLPS_AREA_STORE_SCHEMA = "tlps.area-store/1";
export const MAX_AREA_RECORDS = 200;

export type AreaFieldKind = "text" | "number" | "date" | "select";
export interface AreaField {
  key: string;
  label: string;
  kind: AreaFieldKind;
  options?: readonly string[];
  required?: boolean;
  /** Amount in the area's currency; summed in the area summary. */
  money?: boolean;
  placeholder?: string;
}

export interface AreaDefinition {
  id: TlpsOsId;
  /** "workflow" areas open a step of the planning workflow; "register" areas keep their own list. */
  mode: "workflow" | "register";
  target?: TlpsView;
  recordLabel: string;
  fields: readonly AreaField[];
  /** Ordered statuses; the first is the starting status. Every status is a local label only. */
  statuses: readonly string[];
  samples: readonly Record<string, string>[];
  packageWorkspaceGroups: readonly string[];
  tlpsWorkspaceGroups: readonly string[];
  aiSpaceIds: readonly string[];
  boundary: string;
}

export interface AreaRecord {
  id: string;
  values: Record<string, string>;
  status: string;
  sample: boolean;
  updatedAt: string;
}

export interface AreaStore {
  schema: typeof TLPS_AREA_STORE_SCHEMA;
  areas: Partial<Record<TlpsOsId, AreaRecord[]>>;
}

const workflow = (id: TlpsOsId, target: TlpsView, packageWorkspaceGroups: string[], tlpsWorkspaceGroups: string[], aiSpaceIds: string[], boundary: string): AreaDefinition => ({
  id, mode: "workflow", target, recordLabel: "", fields: [], statuses: [], samples: [], packageWorkspaceGroups, tlpsWorkspaceGroups, aiSpaceIds, boundary,
});

const LOCAL = "Local planning record only.";

export const AREA_DEFINITIONS: Record<TlpsOsId, AreaDefinition> = {
  "production-os": workflow("production-os", "plan", ["EQUIPMENT_LOGISTICS"], ["TLPS_PRODUCTION"], ["AI_SPACE.TLPS_PRODUCTION_AI", "AI_SPACE.TLPS_SCHEDULING_AI"], "Opens the browser-local production plan."),
  "finance-os": workflow("finance-os", "plan", ["FINANCE"], [], ["AI_SPACE.TLPS_BUDGET_AI"], "Budget estimates only. No money moves."),
  "evidence-os": workflow("evidence-os", "rehearsal", ["GOVERNANCE_EVIDENCE"], [], [], "Evidence metadata and SHA-256 digests only; file bytes are not kept."),
  crew: workflow("crew", "plan", ["TEAM"], ["CREW"], [], "Crew responsibilities in the local plan. Nobody is hired or dispatched."),
  location: workflow("location", "plan", ["LOCATION_VENUE"], [], ["AI_SPACE.TLPS_LOCATION_AI"], "Location notes do not prove availability, permission or booking."),
  "film-os": {
    id: "film-os", mode: "register", recordLabel: "Film project",
    fields: [
      { key: "title", label: "Working title", kind: "text", required: true },
      { key: "format", label: "Format", kind: "select", options: ["Feature Film", "Short Film", "Documentary", "Web Series", "TV Series", "Animation Film"], required: true },
      { key: "targetRelease", label: "Target release", kind: "date" },
      { key: "budget", label: "Budget estimate", kind: "number", money: true },
    ],
    statuses: ["Ideation", "Script", "Pre-production", "Production", "Post-production", "Release"],
    samples: [{ title: "Sample · The Projectionist's Daughters", format: "Feature Film", targetRelease: "2027-11-12", budget: "42000000" }, { title: "Sample · River Festival", format: "Documentary", targetRelease: "2027-03-01", budget: "3500000" }],
    packageWorkspaceGroups: ["MEDIA_PRODUCTION"], tlpsWorkspaceGroups: ["TLPS_PRODUCTION"], aiSpaceIds: ["AI_SPACE.TLPS_SCRIPT_AI", "AI_SPACE.TLPS_STORYBOARD_AI"],
    boundary: `${LOCAL} Stages are labels; no distribution, release or rights are recorded.`,
  },
  casting: {
    id: "casting", mode: "register", recordLabel: "Casting entry",
    fields: [
      { key: "role", label: "Role", kind: "select", options: ["Male Lead Actor", "Female Lead Actor", "Male Support Actor", "Female Support Actor", "Male Character Actor", "Female Character Actor", "Male Child Actor", "Female Child Actor"], required: true },
      { key: "candidate", label: "Candidate", kind: "text", required: true, placeholder: "Name or reference" },
      { key: "audition", label: "Audition date", kind: "date" },
      { key: "fee", label: "Fee estimate", kind: "number", money: true },
    ],
    statuses: ["Open", "Shortlisted", "Audition planned", "Selected (local)", "Not selected"],
    samples: [{ role: "Female Lead Actor", candidate: "Sample candidate A", audition: "2027-01-18", fee: "800000" }, { role: "Male Child Actor", candidate: "Sample candidate B", audition: "2027-01-19", fee: "60000" }],
    packageWorkspaceGroups: [], tlpsWorkspaceGroups: ["CASTING"], aiSpaceIds: ["AI_SPACE.TLPS_CASTING_AI"],
    boundary: `${LOCAL} Selection is not an offer or a contract. Minors need guardian consent outside this app.`,
  },
  "equipment-logistics": {
    id: "equipment-logistics", mode: "register", recordLabel: "Equipment or travel need",
    fields: [
      { key: "item", label: "Item", kind: "text", required: true },
      { key: "category", label: "Category", kind: "select", options: ["Camera", "Lighting", "Grip", "Sound", "Transport", "Travel", "Accommodation", "Catering"], required: true },
      { key: "quantity", label: "Quantity", kind: "number" },
      { key: "neededOn", label: "Needed on", kind: "date" },
      { key: "estimate", label: "Estimate", kind: "number", money: true },
    ],
    statuses: ["Needed", "Quote requested", "Held (local note)", "Returned"],
    samples: [{ item: "Sample · ARRI Alexa Mini LF kit", category: "Camera", quantity: "1", neededOn: "2027-02-03", estimate: "450000" }, { item: "Sample · Crew bus, 26 seats", category: "Transport", quantity: "2", neededOn: "2027-02-03", estimate: "90000" }],
    packageWorkspaceGroups: ["EQUIPMENT_LOGISTICS"], tlpsWorkspaceGroups: [], aiSpaceIds: [],
    boundary: `${LOCAL} "Held" is a note; no rental, ticket or room is reserved.`,
  },
  "campaign-os": {
    id: "campaign-os", mode: "register", recordLabel: "Campaign",
    fields: [
      { key: "name", label: "Campaign", kind: "text", required: true },
      { key: "objective", label: "Objective", kind: "select", options: ["Awareness", "Launch", "Engagement", "Footfall", "Sales"], required: true },
      { key: "start", label: "Start", kind: "date" },
      { key: "budget", label: "Budget estimate", kind: "number", money: true },
    ],
    statuses: ["Brief", "Planning", "Client review", "Approved (local)", "Wrapped"],
    samples: [{ name: "Sample · Monsoon tea launch", objective: "Launch", start: "2027-06-15", budget: "12000000" }],
    packageWorkspaceGroups: ["MARKETING"], tlpsWorkspaceGroups: [], aiSpaceIds: [],
    boundary: `${LOCAL} No media is bought and nothing is published.`,
  },
  atl: {
    id: "atl", mode: "register", recordLabel: "ATL placement",
    fields: [
      { key: "medium", label: "Medium", kind: "select", options: ["TV", "Print", "Radio", "Cinema", "Digital video"], required: true },
      { key: "vehicle", label: "Channel or title", kind: "text", required: true },
      { key: "flightStart", label: "Flight start", kind: "date" },
      { key: "estimate", label: "Estimate", kind: "number", money: true },
    ],
    statuses: ["Proposed", "Rate requested", "Client review", "Approved (local)"],
    samples: [{ medium: "TV", vehicle: "Sample · Hindi GEC prime time", flightStart: "2027-06-20", estimate: "6500000" }],
    packageWorkspaceGroups: ["MARKETING"], tlpsWorkspaceGroups: [], aiSpaceIds: [],
    boundary: `${LOCAL} Rates are estimates; no release order is issued.`,
  },
  btl: {
    id: "btl", mode: "register", recordLabel: "BTL activation",
    fields: [
      { key: "activation", label: "Activation", kind: "text", required: true },
      { key: "city", label: "City", kind: "text", required: true },
      { key: "date", label: "Date", kind: "date" },
      { key: "headcount", label: "Promoters", kind: "number" },
      { key: "estimate", label: "Estimate", kind: "number", money: true },
    ],
    statuses: ["Idea", "Planning", "Permissions pending", "Ready (local)", "Done"],
    samples: [{ activation: "Sample · Mall sampling kiosk", city: "Pune", date: "2027-06-22", headcount: "6", estimate: "350000" }],
    packageWorkspaceGroups: ["MARKETING", "EVENT"], tlpsWorkspaceGroups: [], aiSpaceIds: [],
    boundary: `${LOCAL} Venue and municipal permissions are not checked.`,
  },
  "ooh-dooh": {
    id: "ooh-dooh", mode: "register", recordLabel: "Outdoor site",
    fields: [
      { key: "site", label: "Site", kind: "text", required: true },
      { key: "format", label: "Format", kind: "select", options: ["Hoarding", "Bus shelter", "Metro panel", "Digital screen", "Mall display"], required: true },
      { key: "city", label: "City", kind: "text" },
      { key: "flightStart", label: "Flight start", kind: "date" },
      { key: "estimate", label: "Estimate", kind: "number", money: true },
    ],
    statuses: ["Shortlisted", "Availability unknown", "Client review", "Approved (local)"],
    samples: [{ site: "Sample · Western Express Highway 40×20", format: "Hoarding", city: "Mumbai", flightStart: "2027-06-15", estimate: "900000" }],
    packageWorkspaceGroups: ["MARKETING"], tlpsWorkspaceGroups: [], aiSpaceIds: [],
    boundary: `${LOCAL} Site availability is never confirmed here.`,
  },
  marketplace: {
    id: "marketplace", mode: "register", recordLabel: "Listing",
    fields: [
      { key: "service", label: "Service or resource", kind: "text", required: true },
      { key: "category", label: "Category", kind: "select", options: ["Crew", "Equipment", "Location", "Vendor", "Transport", "Catering", "Post-production"], required: true },
      { key: "provider", label: "Provider", kind: "text", placeholder: "Synthetic or user-entered" },
      { key: "rate", label: "Indicative rate", kind: "number", money: true },
    ],
    statuses: ["Candidate", "Needs confirmation", "Compared", "Preferred (local)"],
    samples: [{ service: "Sample · Drone unit with pilot", category: "Equipment", provider: "Sample provider", rate: "75000" }],
    packageWorkspaceGroups: ["MARKETPLACE"], tlpsWorkspaceGroups: [], aiSpaceIds: [],
    boundary: `${LOCAL} Listings are not live supplier data; nothing is ordered.`,
  },
  "investor-hub": {
    id: "investor-hub", mode: "register", recordLabel: "Funding opportunity",
    fields: [
      { key: "project", label: "Project", kind: "text", required: true },
      { key: "instrument", label: "Instrument", kind: "select", options: ["Equity", "Revenue share", "Co-production", "Grant", "Pre-sale"], required: true },
      { key: "ask", label: "Ask", kind: "number", money: true },
      { key: "contact", label: "Investor (reference)", kind: "text" },
    ],
    statuses: ["Draft", "Pitch ready", "Shared (local note)", "Interest noted", "Closed"],
    samples: [{ project: "Sample · The Projectionist's Daughters", instrument: "Co-production", ask: "15000000", contact: "Sample fund" }],
    packageWorkspaceGroups: ["INVESTMENT"], tlpsWorkspaceGroups: [], aiSpaceIds: [],
    boundary: `${LOCAL} Not an offer of securities and not investment advice; no money is raised.`,
  },
  "event-os": {
    id: "event-os", mode: "register", recordLabel: "Event",
    fields: [
      { key: "event", label: "Event", kind: "text", required: true },
      { key: "date", label: "Date", kind: "date", required: true },
      { key: "venue", label: "Venue (note)", kind: "text" },
      { key: "guests", label: "Guests", kind: "number" },
      { key: "budget", label: "Budget estimate", kind: "number", money: true },
    ],
    statuses: ["Brief", "Planning", "Run-of-show draft", "Ready (local)", "Wrapped"],
    samples: [{ event: "Sample · Trailer launch", date: "2027-09-04", venue: "Sample auditorium", guests: "250", budget: "1800000" }],
    packageWorkspaceGroups: ["EVENT", "EVENT_GUEST"], tlpsWorkspaceGroups: [], aiSpaceIds: [],
    boundary: `${LOCAL} Venue notes are not bookings; guests are not invited.`,
  },
  "wedding-os": {
    id: "wedding-os", mode: "register", recordLabel: "Wedding function",
    fields: [
      { key: "fn", label: "Function", kind: "select", options: ["Engagement", "Haldi", "Mehendi", "Sangeet", "Wedding", "Reception"], required: true },
      { key: "date", label: "Date", kind: "date", required: true },
      { key: "venue", label: "Venue (note)", kind: "text" },
      { key: "guests", label: "Guests", kind: "number" },
      { key: "budget", label: "Budget estimate", kind: "number", money: true },
    ],
    statuses: ["Idea", "Planning", "Family review", "Ready (local)", "Done"],
    samples: [{ fn: "Sangeet", date: "2027-12-10", venue: "Sample banquet lawn", guests: "320", budget: "2200000" }, { fn: "Wedding", date: "2027-12-11", venue: "Sample banquet lawn", guests: "450", budget: "4800000" }],
    packageWorkspaceGroups: ["EVENT", "EVENT_GUEST"], tlpsWorkspaceGroups: [], aiSpaceIds: [],
    boundary: `${LOCAL} No vendor, venue or caterer is booked.`,
  },
  "exhibition-spatial": {
    id: "exhibition-spatial", mode: "register", recordLabel: "Space or booth",
    fields: [
      { key: "space", label: "Space", kind: "text", required: true },
      { key: "event", label: "Exhibition", kind: "text" },
      { key: "area", label: "Area (m²)", kind: "number" },
      { key: "buildStart", label: "Build start", kind: "date" },
      { key: "estimate", label: "Fabrication estimate", kind: "number", money: true },
    ],
    statuses: ["Concept", "Layout draft", "Fabricator quote", "Approved (local)", "Dismantled"],
    samples: [{ space: "Sample · Corner booth B-14", event: "Sample film bazaar", area: "36", buildStart: "2027-11-17", estimate: "650000" }],
    packageWorkspaceGroups: ["LOCATION_VENUE", "SPATIAL_3D"], tlpsWorkspaceGroups: [], aiSpaceIds: [],
    boundary: `${LOCAL} Layouts are not structural or fire-safety approvals.`,
  },
  "maataa-ai": {
    id: "maataa-ai", mode: "register", recordLabel: "AI request",
    fields: [
      { key: "request", label: "What do you need?", kind: "text", required: true },
      { key: "assistant", label: "Assistant", kind: "select", options: ["Production AI", "Script AI", "Casting AI", "Scheduling AI", "Storyboard AI", "Location AI", "Budget AI"], required: true },
      { key: "dueOn", label: "Needed by", kind: "date" },
    ],
    statuses: ["Draft", "Ready to send", "Reviewed by a person"],
    samples: [{ request: "Sample · Break scene 12 into shots", assistant: "Storyboard AI", dueOn: "2027-01-10" }],
    packageWorkspaceGroups: ["AI"], tlpsWorkspaceGroups: [], aiSpaceIds: TLPS_AI_SPACE_REGISTRY.map((space) => space.id),
    boundary: `${LOCAL} No model is called from this screen. Use Idea → Script for the Brahmini flow.`,
  },
  analytics: {
    id: "analytics", mode: "register", recordLabel: "Report",
    fields: [
      { key: "report", label: "Report", kind: "text", required: true },
      { key: "metric", label: "Main measure", kind: "select", options: ["Budget vs estimate", "Schedule progress", "Crew coverage", "Campaign reach", "Event attendance"], required: true },
      { key: "period", label: "Period end", kind: "date" },
    ],
    statuses: ["Planned", "Draft", "Reviewed"],
    samples: [{ report: "Sample · Weekly production status", metric: "Schedule progress", period: "2027-02-07" }],
    packageWorkspaceGroups: ["ANALYTICS"], tlpsWorkspaceGroups: [], aiSpaceIds: [],
    boundary: `${LOCAL} Figures come only from this browser's records.`,
  },
  "core-platform": {
    id: "core-platform", mode: "register", recordLabel: "Team member",
    fields: [
      { key: "name", label: "Name", kind: "text", required: true },
      { key: "role", label: "Role", kind: "select", options: TLPS_ROLES, required: true },
      { key: "email", label: "Work email (optional)", kind: "text" },
    ],
    statuses: ["Listed", "Invite drafted", "Active (local)", "Removed"],
    samples: [{ name: "Sample · Producer", role: "producer", email: "" }, { name: "Sample · Line producer", role: "line-producer", email: "" }],
    packageWorkspaceGroups: ["ORGANISATION", "SECURITY_IDENTITY"], tlpsWorkspaceGroups: [], aiSpaceIds: [],
    boundary: `${LOCAL} Listing a person does not create an account or grant access.`,
  },
};

const MONEY_LIMIT = 1e13;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export function validateAreaValues(def: AreaDefinition, values: Record<string, string>): string[] {
  const issues: string[] = [];
  for (const field of def.fields) {
    const raw = (values[field.key] ?? "").trim();
    if (!raw) { if (field.required) issues.push(`${field.label} is required.`); continue; }
    if (raw.length > 160) issues.push(`${field.label} must be 160 characters or fewer.`);
    if (field.kind === "number") {
      const n = Number(raw);
      if (!Number.isFinite(n) || n < 0 || n > MONEY_LIMIT) issues.push(`${field.label} must be a number of 0 or more.`);
    }
    if (field.kind === "date" && (!ISO_DATE.test(raw) || Number.isNaN(Date.parse(`${raw}T00:00:00Z`)))) issues.push(`${field.label} must be a valid date.`);
    if (field.kind === "select" && !field.options?.includes(raw)) issues.push(`${field.label} must be one of the listed options.`);
  }
  return issues;
}

let counter = 0;
const newId = (area: TlpsOsId) => `${area}:${Date.now().toString(36)}-${(counter++).toString(36)}`;

export function createAreaRecord(def: AreaDefinition, values: Record<string, string>, options: { sample?: boolean; now?: string } = {}): AreaRecord {
  if (def.mode !== "register") throw new Error(`${def.id} uses the planning workflow, not a register.`);
  const issues = validateAreaValues(def, values);
  if (issues.length) throw new Error(issues.join(" "));
  const clean = Object.fromEntries(def.fields.map((field) => [field.key, (values[field.key] ?? "").trim()]));
  return { id: newId(def.id), values: clean, status: def.statuses[0], sample: options.sample ?? false, updatedAt: options.now ?? new Date().toISOString() };
}

export function nextStatus(def: AreaDefinition, status: string): string | null {
  const index = def.statuses.indexOf(status);
  return index >= 0 && index < def.statuses.length - 1 ? def.statuses[index + 1] : null;
}

export function sampleRecords(def: AreaDefinition): AreaRecord[] {
  return def.samples.map((values) => createAreaRecord(def, values, { sample: true }));
}

export function emptyAreaStore(): AreaStore {
  return { schema: TLPS_AREA_STORE_SCHEMA, areas: {} };
}

/** Parse stored data defensively: unknown areas, invalid records and extra keys are dropped. */
export function readAreaStore(raw: string | null): AreaStore {
  if (!raw) return emptyAreaStore();
  let parsed: unknown;
  try { parsed = JSON.parse(raw); } catch { return emptyAreaStore(); }
  if (typeof parsed !== "object" || parsed === null || (parsed as AreaStore).schema !== TLPS_AREA_STORE_SCHEMA) return emptyAreaStore();
  const source = (parsed as AreaStore).areas ?? {};
  const store = emptyAreaStore();
  for (const def of Object.values(AREA_DEFINITIONS)) {
    if (def.mode !== "register") continue;
    const list = (source as Record<string, unknown>)[def.id];
    if (!Array.isArray(list)) continue;
    const records = list.slice(0, MAX_AREA_RECORDS).flatMap((item): AreaRecord[] => {
      if (typeof item !== "object" || item === null) return [];
      const record = item as Partial<AreaRecord>;
      if (typeof record.id !== "string" || typeof record.status !== "string" || !def.statuses.includes(record.status)) return [];
      if (typeof record.values !== "object" || record.values === null) return [];
      const values = Object.fromEntries(def.fields.map((field) => [field.key, String((record.values as Record<string, unknown>)[field.key] ?? "")]));
      if (validateAreaValues(def, values).length) return [];
      return [{ id: record.id, values, status: record.status, sample: record.sample === true, updatedAt: typeof record.updatedAt === "string" ? record.updatedAt : "" }];
    });
    store.areas[def.id] = records;
  }
  return store;
}

export function summarizeArea(def: AreaDefinition, records: readonly AreaRecord[]) {
  const byStatus = Object.fromEntries(def.statuses.map((status) => [status, records.filter((record) => record.status === status).length]));
  const moneyFields = def.fields.filter((field) => field.money).map((field) => field.key);
  const moneyTotal = records.reduce((sum, record) => sum + moneyFields.reduce((s, key) => s + (Number(record.values[key]) || 0), 0), 0);
  return { total: records.length, byStatus, moneyTotal, samples: records.filter((record) => record.sample).length };
}

export interface AreaWorkspace { id: string; name: string; archetype: string; source: "tlps" | "package"; aliasOf?: string }

/** Workspaces related to an area: TLPS product workspaces first, then generic package workspaces. */
export function workspacesForArea(def: AreaDefinition): AreaWorkspace[] {
  const tlps = TLPS_WORKSPACE_TYPES.filter((w) => def.tlpsWorkspaceGroups.includes(w.groupKey)).map((w) => ({ id: w.id, name: w.name, archetype: w.archetype, source: "tlps" as const }));
  const pkg = WORKSPACE_TYPES.filter((w) => def.packageWorkspaceGroups.includes(w.groupKey) && !("aliasOf" in w)).map((w) => ({ id: w.id, name: w.name, archetype: w.archetype, source: "package" as const }));
  return [...tlps, ...pkg];
}

export function aiSpacesForArea(def: AreaDefinition) {
  return TLPS_AI_SPACE_REGISTRY.filter((space) => def.aiSpaceIds.includes(space.id));
}
