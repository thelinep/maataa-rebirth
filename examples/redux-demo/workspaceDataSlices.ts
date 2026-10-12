import type { WorkspaceTypeRecord } from "../../src/registries/workspaceRegistry";

export type WorkspaceDataDomain =
  | "personal" | "team" | "project" | "event" | "production" | "guest" | "booking" | "commerce"
  | "location" | "creative" | "communication" | "document" | "marketing" | "finance" | "analytics"
  | "governance" | "developer" | "platform" | "ai" | "operations" | "experiment" | "learning" | "support";

type WorkspaceSliceProfile = {
  title: string;
  summary: string;
  navigation: readonly [string, string, string];
  sectionTitles: readonly [string, string];
  samples: readonly [string, string, string];
  boundary: string;
};

/** Every canonical workspace family must resolve to an explicitly synthetic data profile. */
export const WORKSPACE_DOMAIN_BY_GROUP: Readonly<Record<string, WorkspaceDataDomain>> = {
  PERSONAL_HOME: "personal",
  TEAM: "team",
  PROJECT_PROGRAM: "project",
  TASK_PRODUCTIVITY: "project",
  EVENT: "event",
  EQUIPMENT_LOGISTICS: "production",
  EVENT_GUEST: "guest",
  BOOKING: "booking",
  COMMERCE: "commerce",
  MARKETPLACE: "commerce",
  LOCATION_VENUE: "location",
  SPATIAL_3D: "location",
  CREATIVE: "creative",
  MEDIA_PRODUCTION: "creative",
  PRESENTATION_DISPLAY: "creative",
  COMMUNICATION: "communication",
  COMMUNITY: "communication",
  DOCUMENT_KNOWLEDGE: "document",
  FILE_ASSET: "document",
  CMS_PUBLISHING: "document",
  MARKETING: "marketing",
  PUBLIC_SITE: "marketing",
  FINANCE: "finance",
  INVESTMENT: "finance",
  SPONSORSHIP: "finance",
  ANALYTICS: "analytics",
  DATA: "analytics",
  DATABASE: "analytics",
  RELIABILITY_OBSERVABILITY: "analytics",
  GOVERNANCE_EVIDENCE: "governance",
  REVIEW_DECISION: "governance",
  SECURITY_IDENTITY: "governance",
  API: "developer",
  APPLICATION_BUILDER: "developer",
  DEVELOPER: "developer",
  MAATAA_CORE_STUDIO: "developer",
  TESTING: "developer",
  UI_DESIGN_SYSTEM: "developer",
  DESKTOP: "platform",
  MOBILE: "platform",
  MULTI_WORKSPACE: "platform",
  WORKSPACE_META: "platform",
  AI: "ai",
  COMMAND_OPERATIONS: "operations",
  CONTROL_PLANE: "operations",
  EMERGENCY_STATE: "operations",
  ENVIRONMENT_RELEASE: "operations",
  INFRASTRUCTURE: "operations",
  OPERATIONS_ADMINISTRATION: "operations",
  SYSTEM_ADMINISTRATION: "operations",
  DEMO_EXPERIMENTAL: "experiment",
  EDUCATION: "learning",
  CRM_SALES: "team",
  ORGANISATION: "team",
  SUPPORT: "support",
};

const PROFILES: Readonly<Record<WorkspaceDataDomain, WorkspaceSliceProfile>> = {
  personal: { title: "Personal work", summary: "Private planning examples for one local workspace; no reminders are delivered.", navigation: ["Today", "Tasks", "Notes"], sectionTitles: ["My work queue", "Personal context"], samples: ["Review the sample brief", "Prepare a weekly plan", "Sort saved references"], boundary: "Synthetic personal records only · no account, calendar, or notification connection." },
  team: { title: "Team coordination", summary: "Illustrative team records for a workspace preview; no real members or assignments.", navigation: ["Overview", "Work queue", "People"], sectionTitles: ["Team work queue", "Coordination notes"], samples: ["Review an incoming request", "Prepare handoff notes", "Check the team milestone"], boundary: "Synthetic team fixture · no membership, identity, or assignment is created." },
  project: { title: "Project planning", summary: "A project-oriented slice with sample milestones, work items, and review notes.", navigation: ["Overview", "Milestones", "Risks"], sectionTitles: ["Planning board", "Project notes"], samples: ["Scope review · sample milestone", "Prototype walkthrough · planned", "Handoff checklist · draft"], boundary: "Illustrative project plan · no delivery status or approval is asserted." },
  event: { title: "Event planning", summary: "A synthetic event planning slice with a draft schedule and review queue.", navigation: ["Event overview", "Run of show", "Suppliers"], sectionTitles: ["Event schedule", "Planning review"], samples: ["09:00 · registration fixture", "10:30 · opening session fixture", "13:00 · transition fixture"], boundary: "Synthetic event fixture · no booking, guest contact, or event delivery is asserted." },
  production: { title: "Production planning", summary: "Planning records for crew, logistics, and production review; no shoot is confirmed.", navigation: ["Production", "Call sheet", "Locations"], sectionTitles: ["Production plan", "Crew and logistics"], samples: ["Call-sheet rehearsal · sample", "Crew arrival · illustrative", "Location access · unverified"], boundary: "Synthetic production slice · no crew dispatch, location permission, or production completion." },
  guest: { title: "Guest experience", summary: "Pseudonymous sample guest states for planning review; no invitations or check-ins occur.", navigation: ["Guest list", "Invitations", "Check-in"], sectionTitles: ["Guest flow", "Guest notes"], samples: ["Guest 001 · draft registration", "Guest 002 · invitation not sent", "Guest 003 · check-in fixture"], boundary: "Synthetic guest fixtures · no personal contact data, tickets, or attendance record." },
  booking: { title: "Booking review", summary: "A draft booking outline for comparison; availability and holds are not connected.", navigation: ["Requests", "Options", "Review"], sectionTitles: ["Booking options", "Decision notes"], samples: ["Option A · illustrative estimate", "Availability · not checked", "Hold · not requested"], boundary: "Sample booking state · no reservation, contract, hold, or payment exists." },
  commerce: { title: "Commerce workspace", summary: "Synthetic listing and order-planning records; no inventory or transaction is live.", navigation: ["Catalog", "Offers", "Orders"], sectionTitles: ["Sample listings", "Commercial review"], samples: ["Featured listing · fixture", "Draft offer · not sent", "Order state · not created"], boundary: "Synthetic commerce records · no live inventory, customer order, or payment." },
  location: { title: "Location research", summary: "Location and spatial planning notes with access and availability left unverified.", navigation: ["Locations", "Maps", "Review"], sectionTitles: ["Research shortlist", "Site notes"], samples: ["North Hall · sample venue", "Exterior site · research note", "Access · permission unverified"], boundary: "Research fixture only · no survey, venue hold, access approval, or availability check." },
  creative: { title: "Creative production", summary: "A creative review slice with draft assets and presentation notes; no media is published.", navigation: ["Assets", "Review", "Presentation"], sectionTitles: ["Creative queue", "Asset notes"], samples: ["Concept board · sample", "Cut review · draft", "Presentation export · not generated"], boundary: "Synthetic creative workspace · no asset upload, publication, or export occurred." },
  communication: { title: "Communication workspace", summary: "Draft conversations and community activity for review; nothing is delivered.", navigation: ["Inbox", "Threads", "Participants"], sectionTitles: ["Draft activity", "Conversation notes"], samples: ["Organizer update · draft", "Review question · sample thread", "Reply state · not sent"], boundary: "Local communication fixtures · no email, message, or notification is sent." },
  document: { title: "Documents and knowledge", summary: "Document index examples with metadata only; no source file is attached.", navigation: ["Library", "Collections", "Versions"], sectionTitles: ["Document index", "Knowledge notes"], samples: ["Planning brief · metadata fixture", "Checklist · sample reference", "Version history · illustrative"], boundary: "Synthetic document metadata · no file content is uploaded, retained, or verified." },
  marketing: { title: "Marketing and publishing", summary: "Draft campaign and public-site content for preview; nothing is published.", navigation: ["Campaigns", "Content", "Audience"], sectionTitles: ["Draft content", "Publishing review"], samples: ["Event overview · draft", "Audience segment · sample", "Publication state · not published"], boundary: "Illustrative marketing content · no audience targeting or publication occurs." },
  finance: { title: "Finance and investment", summary: "Planning estimates for review only; no rate, commitment, or financial transaction.", navigation: ["Overview", "Estimates", "Review"], sectionTitles: ["Planning estimates", "Finance notes"], samples: ["Production allocation · synthetic", "Reserve line · illustrative", "Approval · not recorded"], boundary: "Synthetic finance fixture · no quote, investment decision, payment, or commitment." },
  analytics: { title: "Data and analytics", summary: "Deterministic sample metrics and data-quality notes; no live telemetry is queried.", navigation: ["Overview", "Datasets", "Signals"], sectionTitles: ["Sample dataset", "Analysis notes"], samples: ["Rows · illustrative sample", "Freshness · fixture only", "Source connection · not configured"], boundary: "Synthetic analytical records · no live database, telemetry, or observability source." },
  governance: { title: "Governance and review", summary: "Review criteria and evidence metadata for a local specimen; no approval is authoritative.", navigation: ["Review queue", "Evidence", "Audit"], sectionTitles: ["Review items", "Governance notes"], samples: ["Policy check · sample", "Evidence reference · metadata only", "Decision · awaiting illustrative review"], boundary: "Synthetic governance fixture · no identity, authorization, approval, or audit record." },
  developer: { title: "Developer workspace", summary: "A build and integration planning slice; no code is generated or service invoked.", navigation: ["Workspace", "Contracts", "Checks"], sectionTitles: ["Development queue", "Integration notes"], samples: ["Contract review · sample", "Build check · not run", "Adapter status · not connected"], boundary: "Illustrative developer fixture · no build, deployment, API call, or provider execution." },
  platform: { title: "Platform workspace", summary: "Workspace and device configuration examples; no platform resource is changed.", navigation: ["Overview", "Configuration", "Activity"], sectionTitles: ["Platform records", "Configuration notes"], samples: ["Workspace profile · fixture", "Viewport target · sample", "Change state · not applied"], boundary: "Synthetic platform records · no device, tenant, or workspace configuration is modified." },
  ai: { title: "AI workspace", summary: "A deterministic AI surface outline; no model, retrieval, or tool is invoked.", navigation: ["Sessions", "Context", "Evaluation"], sectionTitles: ["Sample session", "Provider boundary"], samples: ["Question · illustrative fixture", "Sources · none retrieved", "Provider · not connected"], boundary: "AI specimen only · no model called, source retrieved, or tool action performed." },
  operations: { title: "Operations workspace", summary: "A local operations board with sample queues and explicit non-live status.", navigation: ["Operations", "Queues", "Environments"], sectionTitles: ["Operations queue", "Environment notes"], samples: ["Review item · sample", "Environment · local fixture", "Execution state · not started"], boundary: "Synthetic operations data · no job, deployment, control-plane, or emergency action." },
  experiment: { title: "Experiment workspace", summary: "A bounded prototype record for inspection; no experiment run is represented.", navigation: ["Brief", "Iteration", "Evaluation"], sectionTitles: ["Experiment outline", "Evaluation notes"], samples: ["Hypothesis · sample", "Iteration · illustrative", "Result · not measured"], boundary: "Prototype fixture only · no experiment, evaluation, or outcome is claimed." },
  learning: { title: "Learning workspace", summary: "Sample learning content and progress for preview; no learner record is stored.", navigation: ["Learning plan", "Lessons", "Progress"], sectionTitles: ["Lesson outline", "Learning notes"], samples: ["Objective · sample", "Lesson · illustrative", "Progress · not tracked"], boundary: "Synthetic learning fixture · no learner identity or progress is recorded." },
  support: { title: "Support workspace", summary: "A sample support queue and response draft; no customer case is created.", navigation: ["Queue", "Cases", "Knowledge"], sectionTitles: ["Support queue", "Response notes"], samples: ["Case · synthetic example", "Priority · illustrative", "Reply · draft not sent"], boundary: "Synthetic support fixture · no customer case, identity, or response is created." },
};

function stableIndex(value: string, length: number): number {
  let hash = 2166136261;
  for (const character of value) hash = Math.imul(hash ^ character.charCodeAt(0), 16777619);
  return (hash >>> 0) % length;
}

export function createWorkspaceDataSlice(workspace: Omit<WorkspaceTypeRecord, "archetype" | "aliasOf">) {
  const domain = WORKSPACE_DOMAIN_BY_GROUP[workspace.groupKey];
  const profile = domain ? PROFILES[domain] : undefined;
  if (!domain || !profile) throw new Error(`No workspace data slice is registered for ${workspace.groupKey}`);

  const offset = stableIndex(workspace.id, profile.samples.length);
  const samples = profile.samples.map((_, index) => profile.samples[(offset + index) % profile.samples.length]!);
  const sections = [
    { title: profile.sectionTitles[0], lines: [workspace.name, ...samples.slice(0, 2)] },
    { title: profile.sectionTitles[1], lines: [samples[2]!, `Group · ${workspace.groupLabel}`, "Source · synthetic local fixture"] },
  ];
  return {
    workspaceId: workspace.id,
    domain,
    title: profile.title,
    summary: profile.summary,
    navigation: profile.navigation,
    sections,
    reference: `WS-${workspace.groupId}-${String(workspace.ordinal).padStart(3, "0")}`,
    provenance: "Synthetic fixture" as const,
    boundary: profile.boundary,
  };
}
