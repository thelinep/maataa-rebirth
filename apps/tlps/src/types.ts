/** Canonical type vocabulary for TLPS product data and workflow contracts. */

export const TLPS_PRODUCT_IDS = [
  "core-platform",
  "production-os",
  "film-os",
  "campaign-os",
  "atl",
  "btl",
  "ooh-dooh",
  "marketplace",
  "evidence-os",
  "finance-os",
  "investor-hub",
  "event-os",
  "wedding-os",
  "exhibition-spatial",
  "maataa-ai",
  "analytics",
] as const;

export type TlpsProductId = (typeof TLPS_PRODUCT_IDS)[number];

export const TLPS_ROLES = [
  "client",
  "agency",
  "producer",
  "executive-producer",
  "line-producer",
  "head-of-department",
  "crew",
  "cast",
  "talent",
  "vendor",
  "fabricator",
  "finance",
  "legal",
  "evidence-reviewer",
  "sponsor",
  "investor",
  "auditor",
  "tlps-admin",
] as const;

export type TlpsRole = (typeof TLPS_ROLES)[number];

/** Film crew credits supplied by the TLPS product vocabulary. */
export const TLPS_CREW_ROLES = [
  "Line Producer",
  "Production Accountant",
  "Location Manager",
  "Social Publicist",
  "Script Supervisor",
  "Local Casting Director",
  "Camera Operator",
  "Gaffer",
  "Key Grip",
  "Production Sound Mixer",
  "Standby Art Director",
  "Set Designer",
  "Construction Coordinator",
  "Key Scenic",
  "Costume Designer",
  "Key Make-up Artist",
  "Special Effects Supervisor",
  "Film Editor",
  "Negative Cutter",
  "Visual Effects Producer",
  "Sound Designer",
  "Storyboarding",
] as const;
export type TlpsCrewRole = (typeof TLPS_CREW_ROLES)[number];

export const TLPS_CAST_ROLES = [
  "Male Lead Actor",
  "Female Lead Actor",
  "Male Support Actor",
  "Female Support Actor",
  "Male Character Actor",
  "Female Character Actor",
  "Male Child Actor",
  "Female Child Actor",
] as const;
export type TlpsCastRole = (typeof TLPS_CAST_ROLES)[number];

export const TLPS_HOD_ROLES = [
  "Director",
  "Executive Producer",
  "Production Designer",
  "Costume Designer",
  "Director of Photography",
  "Makeup Head",
  "Action Director",
  "Grip Head",
  "Sound Director",
  "Music Director",
  "Choreographer",
  "Special Effects Director",
  "Casting Director",
] as const;
export type TlpsHeadOfDepartmentRole = (typeof TLPS_HOD_ROLES)[number];

export const TLPS_PROJECT_TYPES = [
  "Feature Film",
  "Animation Film",
  "TV Series",
  "Animated Short",
  "Short Film",
  "TV Commercial",
  "Documentary",
  "Web Series",
  "Event",
  "Digital Ad",
  "Music Video",
] as const;
export type TlpsProjectType = (typeof TLPS_PROJECT_TYPES)[number];

/** Opening payment basis/rate period; this vocabulary is not a payment integration. */
export const TLPS_OPENING_PAYMENT_TYPES = [
  "Hourly",
  "Daily",
  "Weekly",
  "Monthly",
  "Contract",
] as const;
export type TlpsOpeningPaymentType =
  (typeof TLPS_OPENING_PAYMENT_TYPES)[number];

export interface TlpsCastAssignment {
  id: string;
  name: string;
  role: TlpsCastRole;
}

export interface TlpsHeadOfDepartmentAssignment {
  id: string;
  name: string;
  role: TlpsHeadOfDepartmentRole;
}

export const TLPS_STATUSES = [
  "draft",
  "submitted",
  "approved",
  "rehearsing",
  "closed-local",
] as const;

export type TlpsStatus = (typeof TLPS_STATUSES)[number];
export type TlpsView = "plan" | "review" | "rehearsal" | "handover";
export type EvidenceKind = "planning" | "rehearsal";
export type TlpsTaskKey = "setup" | "rehearsal" | "wrap";

/** The initial browser-local workflow's editable project header. */
export interface TlpsProject {
  title: string;
  /** Optional first-screen context; local planning input, not generated content. */
  idea?: string;
  createdByRole?: string;
  city: string;
  productionType: TlpsProjectType;
  shootDate: string;
  ceiling: number;
}

export interface TlpsBudgetLine {
  id: string;
  item: string;
  quantity: number;
  rate: number;
}

export interface TlpsCrewAssignment {
  id: string;
  name: string;
  responsibility: string;
  role?: TlpsCrewRole | TlpsHeadOfDepartmentRole;
  openingPaymentType?: TlpsOpeningPaymentType;
}

export interface TlpsLocationCandidate {
  id: string;
  name: string;
  note: string;
}

export interface TlpsScheduleEntry {
  id: string;
  time: string;
  scene: string;
}

export interface TlpsEvidenceRecord {
  id: string;
  name: string;
  kind: EvidenceKind;
  bytes: number;
  sha256: string;
}

export interface TlpsActivityEvent {
  action: string;
  at: string;
}

export interface TlpsDraft {
  schemaVersion: 1;
  project: TlpsProject;
  budget: TlpsBudgetLine[];
  crew: TlpsCrewAssignment[];
  locations: TlpsLocationCandidate[];
  schedule: TlpsScheduleEntry[];
  status: TlpsStatus;
  approvalNote: string;
  tasks: Record<TlpsTaskKey, boolean>;
  evidence: TlpsEvidenceRecord[];
  activity: TlpsActivityEvent[];
}

export const TLPS_CURRENCY_CODES = ["INR", "USD", "EUR", "GBP"] as const;
export type TlpsCurrencyCode = (typeof TLPS_CURRENCY_CODES)[number];

export const TLPS_RESOURCE_KINDS = [
  "cast",
  "crew",
  "location",
  "equipment",
  "vendor",
  "transport",
  "accommodation",
  "catering",
] as const;
export type TlpsResourceKind = (typeof TLPS_RESOURCE_KINDS)[number];

export type TlpsSourceKind =
  "user-entered" | "synthetic" | "catalogue" | "provider";

export type TlpsAvailabilityStatus =
  "unknown" | "candidate" | "available" | "unavailable" | "needs-confirmation";

/** Resource availability must retain its source and observation time. */
export interface TlpsResourceReference {
  id: string;
  kind: TlpsResourceKind;
  name: string;
  source: TlpsSourceKind;
  sourceLabel?: string;
  sourceUrl?: string;
  availability: TlpsAvailabilityStatus;
  checkedAt?: string;
  locationLabel?: string;
  notes?: string;
}

export const TLPS_BUDGET_CATEGORIES = [
  "development",
  "cast",
  "crew",
  "location",
  "equipment",
  "art-department",
  "travel-logistics",
  "production",
  "post-production",
  "marketing-release",
  "insurance-compliance",
  "contingency",
  "other",
] as const;
export type TlpsBudgetCategory = (typeof TLPS_BUDGET_CATEGORIES)[number];

export type TlpsBudgetSource =
  | "manual-estimate"
  | "synthetic-rate-card"
  | "catalogue-indication"
  | "provider-quote";

export interface TlpsBudgetEstimateLine {
  id: string;
  category: TlpsBudgetCategory;
  description: string;
  quantity: number;
  unit: string;
  unitRate: number;
  currency: TlpsCurrencyCode;
  source: TlpsBudgetSource;
  sourceReference?: string;
  assumptions: string[];
  resourceId?: string;
}

export interface TlpsBudgetEstimate {
  id: string;
  projectId: string;
  title: string;
  currency: TlpsCurrencyCode;
  lines: TlpsBudgetEstimateLine[];
  contingencyRate?: number;
  status: "draft" | "in-review" | "reviewed";
  createdAt: string;
  provenance: TlpsGenerationProvenance;
}

export type TlpsScriptFormat = "fountain" | "fdx" | "pdf" | "docx";

export interface TlpsScriptDocument {
  id: string;
  projectId: string;
  title: string;
  format: TlpsScriptFormat;
  version: string;
  importedAt?: string;
  sourceName?: string;
  sourceSha256?: string;
  synopsis?: string;
  scenes: TlpsScriptScene[];
}

export interface TlpsScriptScene {
  id: string;
  sceneNumber?: string;
  slugline: string;
  locationId?: string;
  castIds: string[];
  crewNeeds: string[];
  equipmentNeeds: string[];
  pageEighths?: number;
  dayNight?: "day" | "night" | "dawn" | "dusk" | "unknown";
  notes?: string;
}

export type TlpsGenerationProvider =
  "human" | "local-model" | "cloud-model" | "rule-based" | "synthetic-fixture";

export interface TlpsGenerationProvenance {
  provider: TlpsGenerationProvider;
  model?: string;
  generatedAt: string;
  sourceDocumentIds: string[];
  warnings: string[];
}

export type MagicWriterTask = "develop" | "revise" | "outline" | "dialogue";

export interface MagicWriterRequest {
  projectId: string;
  script: TlpsScriptDocument;
  task: MagicWriterTask;
  instruction: string;
  includeResourcePlan: boolean;
  includeBudgetEstimate: boolean;
}

export interface MagicWriterResult {
  script: TlpsScriptDocument;
  suggestions: string[];
  resourceNeeds: TlpsResourceReference[];
  budgetEstimate?: TlpsBudgetEstimate;
  provenance: TlpsGenerationProvenance;
}

export interface MagicLPImportRequest {
  projectId: string;
  sourceName: string;
  format: TlpsScriptFormat;
  sourceSha256: string;
  scriptText?: string;
  currency: TlpsCurrencyCode;
}

export interface MagicLPBreakdown {
  script: TlpsScriptDocument;
  resources: TlpsResourceReference[];
  budget: TlpsBudgetEstimate;
  unresolvedItems: string[];
  provenance: TlpsGenerationProvenance;
}
