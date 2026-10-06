export type PageSpecimenRecord = {
  id: string;
  name: string;
  ordinal: number;
  groupId: string;
  groupKey: string;
  groupLabel: string;
};

export type PageSpecimenKind = "marketing" | "content" | "form" | "dashboard" | "records" | "integration" | "operations" | "planner" | "assistant" | "commerce" | "events" | "production" | "learning" | "community" | "state" | "presentation" | "evidence";

type PageGroupProfile = { kind: PageSpecimenKind; purpose: string; sections: readonly [string, string, string]; action: string };

export const PAGE_GROUP_PROFILES: Readonly<Record<string, PageGroupProfile>> = {
  MARKETING_CORPORATE: { kind: "marketing", purpose: "marketing and corporate communication", sections: ["Message", "Audience", "Next step"], action: "Explore the sample message" },
  CONTENT_EDITORIAL: { kind: "content", purpose: "editorial and portfolio content", sections: ["Featured story", "Related reading", "Editorial notes"], action: "Open the sample story" },
  DOCUMENTATION_DEVELOPER: { kind: "content", purpose: "developer documentation and learning material", sections: ["Overview", "Instructions", "Related topics"], action: "Read the sample section" },
  LEGAL_TRUST: { kind: "content", purpose: "trust and policy information", sections: ["Policy summary", "Review details", "Related policies"], action: "Review sample details" },
  AUTHENTICATION: { kind: "form", purpose: "account access and identity flows", sections: ["Account details", "Verification step", "Access help"], action: "Continue sample flow" },
  ONBOARDING: { kind: "form", purpose: "guided setup and preference collection", sections: ["Setup step", "Workspace choices", "Next step"], action: "Continue sample setup" },
  DASHBOARD_OVERVIEW: { kind: "dashboard", purpose: "summary metrics and operational overview", sections: ["Summary metrics", "Recent activity", "Attention items"], action: "Inspect sample activity" },
  ENTITY_CRUD: { kind: "records", purpose: "record creation, review, and maintenance", sections: ["Record summary", "Related records", "Review notes"], action: "Open sample record" },
  SEARCH_DISCOVERY: { kind: "records", purpose: "search and discovery", sections: ["Search context", "Sample results", "Saved filters"], action: "Inspect sample results" },
  DATA_SCHEMA: { kind: "records", purpose: "data browsing and schema inspection", sections: ["Dataset outline", "Fields", "Sample rows"], action: "Inspect sample data" },
  API_INTEGRATION: { kind: "integration", purpose: "API design and integration review", sections: ["Request outline", "Response shape", "Environment notes"], action: "Inspect the example contract" },
  DEVELOPMENT_SOURCE: { kind: "integration", purpose: "source code and repository work", sections: ["Workspace context", "Change outline", "Review notes"], action: "Inspect sample changes" },
  INFRASTRUCTURE_RUNTIME: { kind: "operations", purpose: "infrastructure and runtime operations", sections: ["Environment summary", "Resources", "Change history"], action: "Review sample environment" },
  OBSERVABILITY_RELIABILITY: { kind: "operations", purpose: "observability and reliability review", sections: ["Signal summary", "Recent events", "Follow-up"], action: "Inspect sample signals" },
  ADMIN_CONFIGURATION: { kind: "operations", purpose: "administration and configuration", sections: ["Configuration", "Scope", "Change notes"], action: "Review sample settings" },
  CRM_SALES: { kind: "records", purpose: "customer and sales records", sections: ["Profile summary", "Recent activity", "Follow-up"], action: "Open sample profile" },
  COMMUNICATION: { kind: "content", purpose: "messages and team communication", sections: ["Conversation", "Participants", "Related messages"], action: "Open sample conversation" },
  PRODUCTIVITY_PLANNING: { kind: "planner", purpose: "calendar, tasks, and scheduling", sections: ["Schedule", "Planned work", "Reminders"], action: "Review sample schedule" },
  PROJECTS_PROGRAMS: { kind: "planner", purpose: "project and program planning", sections: ["Milestones", "Work items", "Risks and decisions"], action: "Review sample plan" },
  DOCUMENTS_FILES: { kind: "content", purpose: "document and file management", sections: ["File details", "Versions", "Related material"], action: "Open sample document" },
  BUILDERS_AUTOMATION: { kind: "integration", purpose: "workflow design and automation review", sections: ["Workflow outline", "Steps", "Run history"], action: "Inspect sample workflow" },
  DESIGN_SYSTEM: { kind: "presentation", purpose: "design systems and reusable interface assets", sections: ["Specimen preview", "Properties", "Related tokens"], action: "Inspect sample component" },
  MEDIA_CREATIVE: { kind: "presentation", purpose: "creative media and asset review", sections: ["Asset preview", "Details", "Related assets"], action: "Open sample asset" },
  SPATIAL_3D: { kind: "presentation", purpose: "spatial and three-dimensional planning", sections: ["Scene preview", "Dimensions", "Review notes"], action: "Inspect sample scene" },
  AI_KNOWLEDGE: { kind: "assistant", purpose: "AI and knowledge-work interfaces", sections: ["Question context", "Illustrative response", "Source status"], action: "Review illustrative response" },
  MARKETPLACE_COMMERCE: { kind: "commerce", purpose: "marketplace and commerce discovery", sections: ["Listing summary", "Seller details", "Related listings"], action: "Inspect sample listing" },
  BOOKING: { kind: "commerce", purpose: "booking and reservation planning", sections: ["Selection summary", "Availability fixture", "Review details"], action: "Review sample selection" },
  COMMERCIAL_FINANCE_INVESTMENT: { kind: "commerce", purpose: "commercial, finance, and investment review", sections: ["Draft summary", "Line items", "Review notes"], action: "Review sample draft" },
  EVENTS: { kind: "events", purpose: "event discovery and planning", sections: ["Event overview", "Schedule fixture", "Planning notes"], action: "Open sample event" },
  PRODUCTION_LOGISTICS: { kind: "production", purpose: "production and logistics planning", sections: ["Production overview", "Schedule fixture", "Crew and location notes"], action: "Review sample plan" },
  EDUCATION: { kind: "learning", purpose: "courses and learning activities", sections: ["Learning objective", "Lesson outline", "Progress fixture"], action: "Open sample lesson" },
  COMMUNITY: { kind: "community", purpose: "community and discussion", sections: ["Featured discussion", "Participants", "Community notes"], action: "Open sample discussion" },
  SYSTEM_STATES: { kind: "state", purpose: "system and recovery states", sections: ["State summary", "Suggested recovery", "Support context"], action: "Review recovery guidance" },
  TRANSACTION_STATES: { kind: "state", purpose: "transaction and confirmation states", sections: ["Transaction state", "Reference details", "Next steps"], action: "Review sample state" },
  PRESENTATION_MODES: { kind: "presentation", purpose: "print, share, embed, and kiosk presentation", sections: ["Presentation preview", "Display settings", "Share context"], action: "Preview sample presentation" },
  EXPERIMENTAL_INTERNAL: { kind: "integration", purpose: "internal experiments and prototypes", sections: ["Experiment brief", "Current iteration", "Evaluation notes"], action: "Inspect sample experiment" },
  SYSTEM_ADMINISTRATION: { kind: "operations", purpose: "system administration", sections: ["System overview", "Managed records", "Administrative notes"], action: "Review sample administration" },
  CMS_PUBLISHING: { kind: "content", purpose: "content management and publishing", sections: ["Draft content", "Publishing details", "Locale and SEO notes"], action: "Preview sample content" },
  OPERATIONS_ADMINISTRATION: { kind: "operations", purpose: "jobs and runtime administration", sections: ["Queue summary", "Job details", "Runtime notes"], action: "Inspect sample job" },
  CONTROL_PLANE: { kind: "operations", purpose: "application and infrastructure control-plane review", sections: ["Control summary", "Registered resources", "Change context"], action: "Inspect sample resource" },
  EVIDENCE_APPROVAL: { kind: "evidence", purpose: "evidence and approval review", sections: ["Evidence summary", "Review criteria", "Audit notes"], action: "Review sample evidence" },
};

function stableSeed(value: string): number {
  let hash = 2166136261;
  for (const character of value) hash = Math.imul(hash ^ character.charCodeAt(0), 16777619);
  return hash >>> 0;
}

function pageArchetype(name: string, fallback: PageSpecimenKind): PageSpecimenKind {
  const value = name.toLowerCase();
  if (/\b(sign in|sign up|sign out|password|verification|onboarding|preferences|create|edit|builder|request|compose|form|setup)\b/.test(value)) return "form";
  if (/\b(dashboard|overview|analytics|metrics|home)\b/.test(value)) return "dashboard";
  if (/\b(search|directory|catalog|library|index|list|explorer|browser|queue)\b/.test(value)) return "records";
  if (/\b(detail|profile|viewer|article|lesson|resource|report)\b/.test(value)) return "content";
  if (/\b(404|401|403|500|502|error|success|offline|failure|confirmation|redirect|processing)\b/.test(value)) return "state";
  return fallback;
}

export function createPageSpecimen(record: PageSpecimenRecord) {
  const profile = PAGE_GROUP_PROFILES[record.groupKey];
  if (!profile) throw new Error(`No page specimen profile is registered for ${record.groupKey}`);
  const seed = stableSeed(record.id);
  const number = String(record.ordinal).padStart(3, "0");
  const reference = `${record.groupId}-${number}`;
  const kind = pageArchetype(record.name, profile.kind);
  const shortName = record.name.replace(/\s+Page$/i, "");
  const sampleIndex = (offset: number, max: number) => ((seed >>> (offset % 24)) % max) + 1;
  return {
    id: record.id,
    reference,
    heading: record.name,
    groupLabel: record.groupLabel,
    kind,
    purpose: `Illustrative ${profile.purpose} page for ${shortName}.`,
    action: profile.action,
    metrics: [
      { label: "Sample sections", value: String(sampleIndex(3, 8)) },
      { label: "Related fixtures", value: String(sampleIndex(9, 24)) },
      { label: "Page reference", value: reference },
    ] as const,
    sections: profile.sections.map((title, index) => ({
      title,
      detail: `${shortName} · ${title.toLowerCase()} fixture ${index + 1}`,
      reference: `${reference}-${index + 1}`,
    })) as readonly { title: string; detail: string; reference: string }[],
    boundary: "Synthetic specimen only · no live data, account action, transaction, approval, or provider call.",
  };
}
