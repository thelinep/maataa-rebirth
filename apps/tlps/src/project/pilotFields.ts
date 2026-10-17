import type { TlpsCollection } from "../services/tlpsDataApi";
export type PilotField = {
  key: string;
  label: string;
  type?: "number" | "date" | "text";
  options?: readonly string[];
  optional?: boolean;
};
const f = (key: string, label: string, optional = false): PilotField => ({
  key,
  label,
  optional,
});
export const PILOT_FIELDS: Record<TlpsCollection, readonly PilotField[]> = {
  profiles: [
    f("title", "Project title"),
    { key: "stage", label: "Stage", options: ["idea"] },
    f("city", "City", true),
  ],
  onboarding: [
    f("audience", "Audience"),
    f("idea", "Project idea"),
    {
      key: "journey",
      label: "Journey",
      options: ["I2S", "I2R", "I2B", "undecided"],
    },
    {
      key: "automation",
      label: "Working style",
      options: ["guided", "assisted", "manual", "undecided"],
    },
  ],
  "workplace-records": [
    f("areaId", "Registered area ID"),
    f("workspaceId", "Registered workplace ID"),
    {
      key: "status",
      label: "Status",
      options: ["draft", "review", "rehearsal", "handover"],
    },
    f("brief", "Workplace brief"),
  ],
  "budget-items": [
    f("label", "Estimate name"),
    { key: "quantity", label: "Quantity", type: "number" },
    { key: "unitAmountMinor", label: "Unit estimate in paise", type: "number" },
    { key: "currency", label: "Currency", options: ["INR"] },
  ],
  "crew-assignments": [
    f("name", "Name"),
    f("role", "Responsibility"),
    f("department", "Department", true),
    f("notes", "Notes", true),
  ],
  locations: [
    f("name", "Location name"),
    f("city", "City", true),
    f("notes", "Notes", true),
  ],
  "schedule-items": [
    f("title", "Schedule item"),
    { key: "date", label: "Date", type: "date" },
    {
      key: "startMinute",
      label: "Start minute after midnight",
      type: "number",
    },
    { key: "endMinute", label: "End minute after midnight", type: "number" },
    f("locationId", "Location record ID", true),
  ],
  evidence: [
    f("title", "Evidence title"),
    {
      key: "kind",
      label: "Reference type",
      options: ["note", "checklist", "document", "image"],
    },
    f("sourceRef", "Document or evidence reference"),
    f("sha256", "SHA-256 digest", true),
  ],
  circles: [
    f("name", "Circle name"),
    f("purpose", "Purpose"),
    f("coordinatorReference", "Coordinator reference", true),
    f("rules", "Rules", true),
  ],
  "membership-plans": [
    f("circleId", "Circle record ID"),
    f("name", "Plan name"),
    {
      key: "period",
      label: "Proposed period",
      options: ["undecided", "monthly", "yearly"],
    },
    f("benefits", "Membership benefits"),
  ],
  "investment-interests": [
    f("circleId", "Circle record ID"),
    f("partyReference", "Interested party reference"),
    f("terms", "Non-binding terms", true),
  ],
  "escrow-reviews": [
    f("milestone", "Milestone"),
    f("condition", "Review condition"),
    f("evidenceReference", "Evidence reference", true),
    f("reviewerReference", "Reviewer reference", true),
    f("disputeTerms", "Dispute review notes", true),
  ],
};
export const PILOT_LABELS: Record<TlpsCollection, string> = {
  profiles: "Project profile",
  onboarding: "Onboarding",
  "workplace-records": "Workplaces",
  "budget-items": "Budget estimates",
  "crew-assignments": "Crew",
  locations: "Locations",
  "schedule-items": "Schedule",
  evidence: "Evidence references",
  circles: "Circles",
  "membership-plans": "Membership plans",
  "investment-interests": "Investment interests",
  "escrow-reviews": "Escrow reviews",
};
export function fieldValues(
  kind: TlpsCollection,
  data: Record<string, unknown>,
): Record<string, string> {
  return Object.fromEntries(
    PILOT_FIELDS[kind].map((f) => [
      f.key,
      f.key === "brief"
        ? String(
            (data.values as Record<string, unknown> | undefined)?.brief ?? "",
          )
        : String(data[f.key] ?? f.options?.[0] ?? ""),
    ]),
  );
}
export function fieldPayload(
  kind: TlpsCollection,
  values: Record<string, string>,
): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const f of PILOT_FIELDS[kind]) {
    const v = values[f.key] ?? "";
    if (!v && f.optional) continue;
    result[f.key] = f.type === "number" ? Number(v) : v;
  }
  if (kind === "workplace-records") {
    result.values = { brief: result.brief };
    delete result.brief;
  }
  return result;
}
