export const PRODUCT_IDEA_WIZARD_STORAGE_KEY =
  "maataa.brahmini.product-intake.v1";
export const PRODUCT_IDEA_WIZARD_MAX_CHARS = 4_000;

export type ProductDomain = "new" | "tlps" | "nevo" | "other";

export interface ProductIdeaDraft {
  domain: ProductDomain;
  productName: string;
  idea: string;
  audience: string;
  outcome: string;
  workflow: string;
  edgeCases: string;
  dataNeeded: string;
  dataSource: string;
  integrations: string;
  authorityBoundary: string;
  platform: string;
  languages: string;
  accessibility: string;
  pilotOwner: string;
  participants: string;
  successMeasures: string;
  evidence: string;
  openQuestions: string;
}

export interface ProductIdeaWizardSession {
  version: 1;
  currentStep: number;
  draft: ProductIdeaDraft;
  reviewedBrief: string | null;
}

export const PRODUCT_IDEA_WIZARD_STEPS = [
  "Concept",
  "People",
  "Journey",
  "Data",
  "Boundaries",
  "Experience",
  "Pilot",
  "Review",
] as const;

const STRING_FIELDS = [
  "productName",
  "idea",
  "audience",
  "outcome",
  "workflow",
  "edgeCases",
  "dataNeeded",
  "dataSource",
  "integrations",
  "authorityBoundary",
  "platform",
  "languages",
  "accessibility",
  "pilotOwner",
  "participants",
  "successMeasures",
  "evidence",
  "openQuestions",
] as const satisfies readonly (keyof ProductIdeaDraft)[];
type StringField = (typeof STRING_FIELDS)[number];

const FIELD_LABELS: Record<(typeof STRING_FIELDS)[number], string> = {
  productName: "Working name",
  idea: "Idea and problem",
  audience: "Primary users",
  outcome: "Desired outcome",
  workflow: "Main workflow",
  edgeCases: "Failure and recovery cases",
  dataNeeded: "Data needed",
  dataSource: "Data source and authority",
  integrations: "Integrations",
  authorityBoundary: "Actions and approval boundaries",
  platform: "Platforms and environments",
  languages: "Languages and direction",
  accessibility: "Accessibility and device needs",
  pilotOwner: "Pilot owner role",
  participants: "Pilot participants",
  successMeasures: "Pilot success measures",
  evidence: "Supplied facts and source notes",
  openQuestions: "Questions to resolve",
};

export function createEmptyProductIdeaDraft(): ProductIdeaDraft {
  return {
    domain: "new",
    productName: "",
    idea: "",
    audience: "",
    outcome: "",
    workflow: "",
    edgeCases: "",
    dataNeeded: "",
    dataSource: "",
    integrations: "",
    authorityBoundary: "",
    platform: "",
    languages: "",
    accessibility: "",
    pilotOwner: "",
    participants: "",
    successMeasures: "",
    evidence: "",
    openQuestions: "",
  };
}

export function parseProductIdeaWizardSession(
  raw: string | null,
): ProductIdeaWizardSession | null {
  if (!raw) return null;
  try {
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== "object") return null;
    const record = value as Record<string, unknown>;
    if (record.version !== 1 || !record.draft || typeof record.draft !== "object")
      return null;
    const candidate = record.draft as Record<string, unknown>;
    const draft = createEmptyProductIdeaDraft();
    const allowedDomains = new Set<ProductDomain>([
      "new",
      "tlps",
      "nevo",
      "other",
    ]);
    draft.domain = allowedDomains.has(candidate.domain as ProductDomain)
      ? (candidate.domain as ProductDomain)
      : "new";
    for (const key of STRING_FIELDS) {
      if (typeof candidate[key] === "string")
        draft[key] = (candidate[key] as string).slice(0, 2_000);
    }
    const currentStep = Number.isInteger(record.currentStep)
      ? Math.max(
          0,
          Math.min(PRODUCT_IDEA_WIZARD_STEPS.length - 1, record.currentStep as number),
        )
      : 0;
    return {
      version: 1,
      currentStep,
      draft,
      reviewedBrief:
        typeof record.reviewedBrief === "string"
          ? record.reviewedBrief.slice(0, PRODUCT_IDEA_WIZARD_MAX_CHARS + 1)
          : null,
    };
  } catch {
    return null;
  }
}

function supplied(value: string): string {
  const clean = value.trim();
  return clean || "Not supplied yet — keep this as unknown; do not infer it.";
}

export function buildProductIdeaBrief(draft: ProductIdeaDraft): string {
  const domainName =
    draft.domain === "new"
      ? "New domain"
      : draft.domain === "tlps"
        ? "TLPS context"
        : draft.domain === "nevo"
          ? "NEVO context"
          : "Other domain";
  const lines = [
    `# Product intake brief: ${supplied(draft.productName)}`,
    "",
    `Domain label: ${domainName}. This selection labels the request only; it does not import or verify domain facts.`,
    "Evidence status: user-supplied answers are unverified until a named owner confirms them. Empty answers remain unknown.",
    "Data rule: use synthetic examples only; never put secrets, credentials, or real personal records in this brief.",
    "",
    ...STRING_FIELDS.filter((key) => key !== "productName").flatMap((key) => [
      `## ${FIELD_LABELS[key]}`,
      supplied(draft[key]),
      "",
    ]),
    "Host-owned authority must remain explicit. A UI preview, model response, or generated draft is not an approval, integration, transaction, or production result.",
  ];
  return lines.join("\n").trim();
}

export function getProductIdeaOpenQuestions(
  draft: ProductIdeaDraft,
): string[] {
  const keys: readonly StringField[] = [
    "audience",
    "outcome",
    "workflow",
    "dataNeeded",
    "dataSource",
    "integrations",
    "authorityBoundary",
    "pilotOwner",
    "successMeasures",
    "evidence",
  ];
  return keys
    .filter((key) => !draft[key].trim())
    .map((key) => FIELD_LABELS[key]);
}
