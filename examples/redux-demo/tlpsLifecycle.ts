import { filmStages, type FilmStageId } from "../../apps/tlp-film/src/filmTimeline";
import { TLPS_CAST_ROLES, TLPS_CREW_ROLES, TLPS_HOD_ROLES, TLPS_OPENING_PAYMENT_TYPES, TLPS_PRODUCT_IDS, type TlpsProductId } from "../../apps/tlps/src/types";

export type LifecycleSystem = {
  name: string;
  kind: "Product OS" | "Workspace family" | "Tool";
  status: "Separate local demo" | "Declared in product types" | "Workspace registry" | "Contract only";
};

export type LifecycleStageMap = {
  systems: LifecycleSystem[];
  workspaces: string[];
};

/** Product OS inventory comes from apps/tlps/src/types.ts; these are not all live integrations. */
export const productOsLabels: Record<TlpsProductId, string> = {
  "core-platform": "Core Platform OS",
  "production-os": "Production OS",
  "film-os": "Film OS",
  "campaign-os": "Campaign OS",
  atl: "ATL OS",
  btl: "BTL OS",
  "ooh-dooh": "OOH / DOOH OS",
  marketplace: "Marketplace OS",
  "evidence-os": "Evidence OS",
  "finance-os": "Finance OS",
  "investor-hub": "Investor Hub OS",
  "event-os": "Event OS",
  "wedding-os": "Wedding OS",
  "exhibition-spatial": "Exhibition & Spatial OS",
  "maataa-ai": "MAATAA AI",
  analytics: "Analytics OS",
};

export const productOperatingSystems = TLPS_PRODUCT_IDS.map((id) => ({
  id,
  label: productOsLabels[id],
  status: "Declared in product types" as const,
}));

export const peopleRoleGroups = [
  { label: "Cast roles", roles: TLPS_CAST_ROLES },
  { label: "Crew roles", roles: TLPS_CREW_ROLES },
  { label: "Heads of department", roles: TLPS_HOD_ROLES },
] as const;

export const crewRateBases = TLPS_OPENING_PAYMENT_TYPES;

const os = (name: string, status: LifecycleSystem["status"] = "Declared in product types"): LifecycleSystem => ({ name, kind: "Product OS", status });
const family = (name: string): LifecycleSystem => ({ name, kind: "Workspace family", status: "Workspace registry" });
const tool = (name: string): LifecycleSystem => ({ name, kind: "Tool", status: "Contract only" });

/** Crosswalk from the six authored film lifecycle stages to TLPS OS and workspace registry families. */
export const lifecycleStageMap: Record<FilmStageId, LifecycleStageMap> = {
  ideation: {
    systems: [os("Film OS"), os("MAATAA AI"), os("Analytics OS")],
    workspaces: ["Ideation Workspace", "Story Workspace", "Research Workspace", "Storyboard Workspace", "Audience Workspace"],
  },
  script: {
    systems: [os("Film OS"), os("Evidence OS"), os("MAATAA AI"), tool("Magic Writer")],
    workspaces: ["Script Workspace", "Document Editor Workspace", "Story Workspace", "Evidence Library Workspace", "Review & Approval Workspace"],
  },
  "pre-production": {
    systems: [os("Production OS"), os("Film OS"), os("Finance OS"), os("Evidence OS"), family("Casting OS"), family("Crew OS"), family("Location OS"), family("Equipment & Logistics OS"), tool("Magic LP")],
    workspaces: ["Pre-Production Workspace", "Script Breakdown Workspace", "Scene Workspace", "Schedule Board Workspace", "Casting Board Workspace", "Casting Search Workspace", "Casting Availability Workspace", "Casting Review Workspace", "Casting Approval Workspace", "Casting Contract Workspace", "Crew Directory Workspace", "Crew Scheduling Workspace", "Crew Availability Workspace", "Crew Assignment Workspace", "Crew Contract Workspace", "Location Scout Workspace", "Location Library Workspace", "Location Approval Workspace", "Permit Workspace", "Equipment Assignment Workspace", "Transport Workspace", "Travel Workspace", "Accommodation Workspace", "Budget Workspace", "Investor Workspace"],
  },
  production: {
    systems: [os("Production OS", "Separate local demo"), os("Film OS"), os("Evidence OS"), family("Crew OS"), family("Location OS"), family("Equipment & Logistics OS")],
    workspaces: ["Production Command Center", "Shoot Workspace", "Schedule Board Workspace", "Crew Communication Workspace", "Location Workspace", "Equipment Workspace", "Transport Workspace", "Evidence Workspace"],
  },
  "post-production": {
    systems: [os("Film OS", "Separate local demo"), os("Evidence OS"), os("Analytics OS")],
    workspaces: ["Post-Production Workspace", "Video Editing Workspace", "Audio Editing Workspace", "Motion Graphics Workspace", "Review & Approval Workspace", "Media Delivery Workspace", "Evidence Library Workspace", "Quality Review Workspace"],
  },
  release: {
    systems: [os("Campaign OS"), os("ATL OS"), os("BTL OS"), os("OOH / DOOH OS"), os("Marketplace OS"), os("Finance OS"), os("Investor Hub OS"), os("Evidence OS"), os("Analytics OS"), os("Event OS")],
    workspaces: ["Release Readiness Workspace", "Campaign Planning Workspace", "Campaign Execution Workspace", "Advertising Workspace", "Social Media Workspace", "Marketplace Workspace", "Vendor Directory Workspace", "Finance Workspace", "Fundraising Workspace", "Investment Evidence Workspace", "Event Production Workspace", "Marketing Analytics Workspace", "Provenance Workspace"],
  },
};

export const lifecycleStages = filmStages.map((stage) => ({ ...stage, ...lifecycleStageMap[stage.id] }));
