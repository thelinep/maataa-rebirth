import type { TlpsRole, TlpsView } from "./types";

export type TlpsRoleChoice = { id: TlpsRole; label: string };

export const TLPS_ROLE_CHOICES: readonly TlpsRoleChoice[] = [
  { id: "client", label: "Client" },
  { id: "agency", label: "Agency / campaign team" },
  { id: "producer", label: "Producer" },
  { id: "executive-producer", label: "Executive producer" },
  { id: "line-producer", label: "Line producer" },
  { id: "head-of-department", label: "Department lead" },
  { id: "crew", label: "Crew member" },
  { id: "cast", label: "Actor / cast" },
  { id: "talent", label: "Talent" },
  { id: "vendor", label: "Vendor" },
  { id: "fabricator", label: "Fabricator" },
  { id: "finance", label: "Finance team" },
  { id: "legal", label: "Legal team" },
  { id: "evidence-reviewer", label: "Evidence reviewer" },
  { id: "sponsor", label: "Sponsor" },
  { id: "investor", label: "Investor" },
  { id: "auditor", label: "Auditor" },
  { id: "tlps-admin", label: "TLPS administrator" },
];

/** Product areas and related workspaces. Only items marked demo have an action in this local app. */
type TlpsOperatingSystem = { id: string; name: string; plain: string; detail: string; availability: "demo" | "catalogue"; target?: TlpsView };

export const TLPS_OS_CATALOG: readonly TlpsOperatingSystem[] = [
  { id: "production-os", name: "Production OS", plain: "Production plan", detail: "Plan people, places, dates and estimates.", availability: "demo", target: "plan" },
  { id: "film-os", name: "Film OS", plain: "Film projects", detail: "Film creation and lifecycle workspace.", availability: "catalogue" },
  { id: "campaign-os", name: "Campaign OS", plain: "Campaigns", detail: "Plan campaign work and delivery.", availability: "catalogue" },
  { id: "atl", name: "ATL OS", plain: "Ads", detail: "Above-the-line campaign planning.", availability: "catalogue" },
  { id: "btl", name: "BTL OS", plain: "Local campaigns", detail: "On-ground campaign planning.", availability: "catalogue" },
  { id: "ooh-dooh", name: "OOH / DOOH OS", plain: "Outdoor ads", detail: "Outdoor and digital-outdoor planning.", availability: "catalogue" },
  { id: "marketplace", name: "Marketplace OS", plain: "Marketplace", detail: "Explore listed services and resources.", availability: "catalogue" },
  { id: "evidence-os", name: "Evidence OS", plain: "Files & checks", detail: "Record evidence details and readiness.", availability: "demo", target: "rehearsal" },
  { id: "finance-os", name: "Finance OS", plain: "Finance", detail: "Add budget estimates; no money moves.", availability: "demo", target: "plan" },
  { id: "investor-hub", name: "Investor Hub OS", plain: "Find funding", detail: "Investor and funding workspace.", availability: "catalogue" },
  { id: "event-os", name: "Event OS", plain: "Events", detail: "Plan event production.", availability: "catalogue" },
  { id: "wedding-os", name: "Wedding OS", plain: "Weddings", detail: "Plan wedding production.", availability: "catalogue" },
  { id: "exhibition-spatial", name: "Exhibition & Spatial OS", plain: "Places & spaces", detail: "Plan exhibitions and physical spaces.", availability: "catalogue" },
  { id: "maataa-ai", name: "MAATAA AI", plain: "AI help", detail: "Assistance and generation tools.", availability: "catalogue" },
  { id: "analytics", name: "Analytics OS", plain: "Reports", detail: "Project and performance reporting.", availability: "catalogue" },
  { id: "core-platform", name: "Core Platform OS", plain: "Core tools", detail: "Shared identity and platform services.", availability: "catalogue" },
  { id: "casting", name: "Casting OS", plain: "Casting", detail: "Plan casting roles and selection.", availability: "catalogue" },
  { id: "crew", name: "Crew OS", plain: "Crew", detail: "Plan crew responsibilities.", availability: "demo", target: "plan" },
  { id: "location", name: "Location OS", plain: "Locations", detail: "Record location planning notes.", availability: "demo", target: "plan" },
  { id: "equipment-logistics", name: "Equipment & Logistics OS", plain: "Equipment & travel", detail: "Plan equipment and travel needs.", availability: "catalogue" },
] as const satisfies readonly TlpsOperatingSystem[];

export type TlpsOsId = (typeof TLPS_OS_CATALOG)[number]["id"];

const roleOs: Record<TlpsRole, readonly TlpsOsId[]> = {
  client: ["production-os", "campaign-os", "event-os", "finance-os", "evidence-os"],
  agency: ["campaign-os", "atl", "btl", "ooh-dooh", "marketplace", "finance-os", "evidence-os", "analytics"],
  producer: ["production-os", "film-os", "finance-os", "evidence-os", "casting", "crew", "location", "equipment-logistics", "investor-hub"],
  "executive-producer": ["production-os", "film-os", "finance-os", "evidence-os", "investor-hub", "analytics"],
  "line-producer": ["production-os", "film-os", "finance-os", "evidence-os", "casting", "crew", "location", "equipment-logistics"],
  "head-of-department": ["production-os", "film-os", "crew", "casting", "location", "equipment-logistics", "evidence-os"],
  crew: ["production-os", "film-os", "crew", "location", "equipment-logistics", "evidence-os"],
  cast: ["film-os", "casting", "marketplace", "evidence-os"],
  talent: ["film-os", "casting", "marketplace", "evidence-os"],
  vendor: ["marketplace", "production-os", "event-os", "finance-os", "evidence-os"],
  fabricator: ["marketplace", "production-os", "event-os", "exhibition-spatial", "finance-os", "evidence-os"],
  finance: ["finance-os", "investor-hub", "evidence-os", "analytics"],
  legal: ["core-platform", "film-os", "evidence-os", "finance-os"],
  "evidence-reviewer": ["evidence-os", "production-os", "finance-os", "analytics"],
  sponsor: ["campaign-os", "event-os", "investor-hub", "finance-os", "evidence-os"],
  investor: ["investor-hub", "film-os", "campaign-os", "finance-os", "evidence-os", "analytics"],
  auditor: ["evidence-os", "finance-os", "production-os", "analytics"],
  "tlps-admin": ["core-platform", "production-os", "campaign-os", "event-os", "finance-os", "evidence-os", "analytics"],
};

export function operatingSystemsForRole(role: TlpsRole) {
  return roleOs[role].map((id) => TLPS_OS_CATALOG.find((system) => system.id === id)!);
}
