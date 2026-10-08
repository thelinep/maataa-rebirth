import type {
  EvidenceKind,
  TlpsDraft,
  TlpsStatus,
} from "./types";
import {
  TLPS_CREW_ROLES,
  TLPS_HOD_ROLES,
  TLPS_OPENING_PAYMENT_TYPES,
  TLPS_PROJECT_TYPES,
} from "./types";

export type { EvidenceKind, TlpsDraft, TlpsStatus, TlpsView } from "./types";

export const tlpsStorageKey = "tlps.planning.workspace.v1";
const assignableCrewRoles: readonly string[] = [
  ...TLPS_CREW_ROLES,
  ...TLPS_HOD_ROLES,
];
export const emptyTlpsDraft: TlpsDraft = {
  schemaVersion: 1,
  project: {
    title: "",
    city: "",
    productionType: "Feature Film",
    shootDate: "",
    ceiling: 500000,
  },
  budget: [],
  crew: [],
  locations: [],
  schedule: [],
  status: "draft",
  approvalNote: "",
  tasks: { setup: false, rehearsal: false, wrap: false },
  evidence: [],
  activity: [],
};

export function sampleTlpsDraft(): TlpsDraft {
  return {
    ...emptyTlpsDraft,
    project: {
      title: "Mountain Light · sample",
      city: "Dehradun · sample",
      productionType: "Feature Film",
      shootDate: "2026-11-12",
      ceiling: 500000,
    },
    budget: [
      {
        id: "budget-camera",
        item: "Camera package · estimate",
        quantity: 2,
        rate: 50000,
      },
      {
        id: "budget-crew",
        item: "Crew and transport · estimate",
        quantity: 1,
        rate: 150000,
      },
    ],
    crew: [
      {
        id: "crew-lead",
        name: "Asha Mehra · sample",
        responsibility: "Production coordination · illustrative",
      },
    ],
    locations: [
      {
        id: "location-sample",
        name: "Dehradun studio · sample",
        note: "Planning candidate only; access and booking are unverified.",
      },
    ],
    schedule: [
      {
        id: "schedule-sample",
        time: "09:00",
        scene: "Setup and lighting rehearsal · sample",
      },
    ],
    activity: [
      { action: "Loaded illustrative sample", at: new Date().toISOString() },
    ],
  };
}

const positive = (value: number) => Number.isSafeInteger(value) && value > 0;
const validDate = (value: string) =>
  /^\d{4}-\d{2}-\d{2}$/.test(value) &&
  !Number.isNaN(Date.parse(value)) &&
  new Date(value).toISOString().slice(0, 10) === value;
export const totalBudget = (draft: TlpsDraft) =>
  draft.budget.reduce((sum, line) => sum + line.quantity * line.rate, 0);

export function planIssues(draft: TlpsDraft): string[] {
  const issues: string[] = [];
  if (!draft.project.title.trim()) issues.push("Add a project title.");
  if (!draft.project.city.trim()) issues.push("Add a production city.");
  if (!validDate(draft.project.shootDate))
    issues.push("Choose a valid shoot date.");
  if (!positive(draft.project.ceiling))
    issues.push("Enter a positive whole-number budget ceiling.");
  if (!draft.budget.length) issues.push("Add at least one budget estimate.");
  if (totalBudget(draft) > draft.project.ceiling)
    issues.push("Estimated costs exceed the budget ceiling.");
  if (!draft.crew.length)
    issues.push("Assign at least one crew responsibility.");
  if (!draft.locations.length) issues.push("Add a location planning note.");
  if (!draft.schedule.length) issues.push("Add a call-sheet entry.");
  return issues;
}

export function closeIssues(draft: TlpsDraft): string[] {
  const issues: string[] = [];
  if (!Object.values(draft.tasks).every(Boolean))
    issues.push("Complete setup, rehearsal, and wrap checks.");
  if (!draft.evidence.some((item) => item.kind === "planning"))
    issues.push("Attach planning evidence metadata.");
  if (!draft.evidence.some((item) => item.kind === "rehearsal"))
    issues.push("Attach rehearsal evidence metadata.");
  return issues;
}

export function readTlpsDraft(raw: string | null): TlpsDraft {
  if (!raw || raw.length > 1_000_000) return emptyTlpsDraft;
  try {
    const parsed = JSON.parse(raw) as TlpsDraft;
    if (
      parsed.schemaVersion !== 1 ||
      !parsed.project ||
      ![
        "draft",
        "submitted",
        "approved",
        "rehearsing",
        "closed-local",
      ].includes(parsed.status)
    )
      return emptyTlpsDraft;
    if (
      ![
        "budget",
        "crew",
        "locations",
        "schedule",
        "evidence",
        "activity",
      ].every((key) => Array.isArray(parsed[key as keyof TlpsDraft]))
    )
      return emptyTlpsDraft;
    if (
      !["title", "city", "shootDate"].every(
        (key) =>
          typeof parsed.project[key as keyof TlpsDraft["project"]] === "string",
      ) ||
      !positive(parsed.project.ceiling)
    )
      return emptyTlpsDraft;
    const productionType = parsed.project.productionType;
    if (
      productionType !== undefined &&
      !TLPS_PROJECT_TYPES.includes(productionType)
    )
      return emptyTlpsDraft;
    if (
      ![
        parsed.budget,
        parsed.crew,
        parsed.locations,
        parsed.schedule,
        parsed.evidence,
      ].every((rows) => rows.length <= 100) ||
      parsed.activity.length > 200
    )
      return emptyTlpsDraft;
    if (
      !parsed.tasks ||
      !["setup", "rehearsal", "wrap"].every(
        (key) =>
          typeof parsed.tasks[key as keyof TlpsDraft["tasks"]] === "boolean",
      )
    )
      return emptyTlpsDraft;
    const validText = (value: unknown) =>
      typeof value === "string" &&
      value.trim().length > 0 &&
      value.length <= 1000;
    if (
      !parsed.budget.every(
        (line) =>
          validText(line.id) &&
          validText(line.item) &&
          positive(line.quantity) &&
          positive(line.rate) &&
          positive(line.quantity * line.rate),
      )
    )
      return emptyTlpsDraft;
    if (
      !parsed.crew.every(
        (person) =>
          validText(person.id) &&
          validText(person.name) &&
          validText(person.responsibility) &&
          (person.role === undefined ||
            assignableCrewRoles.includes(person.role)) &&
          (person.openingPaymentType === undefined ||
            TLPS_OPENING_PAYMENT_TYPES.includes(person.openingPaymentType)),
      )
    )
      return emptyTlpsDraft;
    if (
      !parsed.locations.every(
        (location) =>
          validText(location.id) &&
          validText(location.name) &&
          validText(location.note),
      )
    )
      return emptyTlpsDraft;
    if (
      !parsed.schedule.every(
        (entry) =>
          validText(entry.id) &&
          validText(entry.scene) &&
          /^([01]\d|2[0-3]):[0-5]\d$/.test(entry.time),
      )
    )
      return emptyTlpsDraft;
    if (
      !parsed.evidence.every(
        (item) =>
          validText(item.id) &&
          validText(item.name) &&
          ["planning", "rehearsal"].includes(item.kind) &&
          positive(item.bytes) &&
          item.bytes <= 2_000_000 &&
          /^[a-f0-9]{64}$/.test(item.sha256),
      )
    )
      return emptyTlpsDraft;
    if (
      !parsed.activity.every(
        (event) =>
          validText(event.action) && !Number.isNaN(Date.parse(event.at)),
      )
    )
      return emptyTlpsDraft;
    for (const collection of [
      parsed.budget,
      parsed.crew,
      parsed.locations,
      parsed.schedule,
      parsed.evidence,
    ])
      if (new Set(collection.map((row) => row.id)).size !== collection.length)
        return emptyTlpsDraft;
    if (parsed.status !== "draft" && planIssues(parsed).length)
      return emptyTlpsDraft;
    if (
      ["approved", "rehearsing", "closed-local"].includes(parsed.status) &&
      !validText(parsed.approvalNote)
    )
      return emptyTlpsDraft;
    if (parsed.status === "closed-local" && closeIssues(parsed).length)
      return emptyTlpsDraft;
    return {
      ...parsed,
      project: {
        ...parsed.project,
        // Migrate existing v1 drafts that predate the project-type field.
        productionType: productionType ?? TLPS_PROJECT_TYPES[0],
        // Optional guided-start fields were added without changing the v1 shape.
        ...(typeof parsed.project.idea === "string" && parsed.project.idea.length <= 5000
          ? { idea: parsed.project.idea }
          : {}),
        ...(typeof parsed.project.createdByRole === "string" && parsed.project.createdByRole.length <= 100
          ? { createdByRole: parsed.project.createdByRole }
          : {}),
      },
    };
  } catch {
    return emptyTlpsDraft;
  }
}

export function recordActivity(draft: TlpsDraft, action: string): TlpsDraft {
  return {
    ...draft,
    activity: [
      ...draft.activity,
      { action, at: new Date().toISOString() },
    ].slice(-200),
  };
}
