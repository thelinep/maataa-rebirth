// TLPS product workspace taxonomy. Moved out of @maataa/ui on 2026-10-12 (release owner decision, chat statement,
// not a signed record): TLPS Production, Casting and Crew are product-specific, not generic UI workspaces.
// IDs are unchanged; manifests/CANONICAL_IDS.json records them under `moved`.
import type { WorkspaceTypeRecord } from "@maataa/ui";

export const TLPS_WORKSPACE_TYPES = [
  {
    ordinal: 1,
    id: "WORKSPACE.TLPS_PRODUCTION.PRODUCTION",
    name: "Production Workspace",
    groupId: "W35",
    groupKey: "TLPS_PRODUCTION",
    groupLabel: "TLPS Production Workspaces",
    archetype: "ProductionWorkspace"
  },
  {
    ordinal: 2,
    id: "WORKSPACE.TLPS_PRODUCTION.PRODUCTION_COMMAND_CENTER",
    name: "Production Command Center",
    groupId: "W35",
    groupKey: "TLPS_PRODUCTION",
    groupLabel: "TLPS Production Workspaces",
    archetype: "ProductionWorkspace"
  },
  {
    ordinal: 3,
    id: "WORKSPACE.TLPS_PRODUCTION.PROJECT_PRODUCTION",
    name: "Project Production Workspace",
    groupId: "W35",
    groupKey: "TLPS_PRODUCTION",
    groupLabel: "TLPS Production Workspaces",
    archetype: "ProductionWorkspace"
  },
  {
    ordinal: 4,
    id: "WORKSPACE.TLPS_PRODUCTION.PRE_PRODUCTION",
    name: "Pre-Production Workspace",
    groupId: "W35",
    groupKey: "TLPS_PRODUCTION",
    groupLabel: "TLPS Production Workspaces",
    archetype: "ProductionWorkspace"
  },
  {
    ordinal: 5,
    id: "WORKSPACE.TLPS_PRODUCTION.SHOOT",
    name: "Shoot Workspace",
    groupId: "W35",
    groupKey: "TLPS_PRODUCTION",
    groupLabel: "TLPS Production Workspaces",
    archetype: "ProductionWorkspace"
  },
  {
    ordinal: 6,
    id: "WORKSPACE.TLPS_PRODUCTION.POST_PRODUCTION",
    name: "Post-Production Workspace",
    groupId: "W35",
    groupKey: "TLPS_PRODUCTION",
    groupLabel: "TLPS Production Workspaces",
    archetype: "ProductionWorkspace"
  },
  {
    ordinal: 7,
    id: "WORKSPACE.TLPS_PRODUCTION.SCRIPT",
    name: "Script Workspace",
    groupId: "W35",
    groupKey: "TLPS_PRODUCTION",
    groupLabel: "TLPS Production Workspaces",
    archetype: "ProductionWorkspace"
  },
  {
    ordinal: 8,
    id: "WORKSPACE.TLPS_PRODUCTION.SCRIPT_BREAKDOWN",
    name: "Script Breakdown Workspace",
    groupId: "W35",
    groupKey: "TLPS_PRODUCTION",
    groupLabel: "TLPS Production Workspaces",
    archetype: "ProductionWorkspace"
  },
  {
    ordinal: 9,
    id: "WORKSPACE.TLPS_PRODUCTION.SCENE",
    name: "Scene Workspace",
    groupId: "W35",
    groupKey: "TLPS_PRODUCTION",
    groupLabel: "TLPS Production Workspaces",
    archetype: "ProductionWorkspace"
  },
  {
    ordinal: 10,
    id: "WORKSPACE.TLPS_PRODUCTION.SHOT",
    name: "Shot Workspace",
    groupId: "W35",
    groupKey: "TLPS_PRODUCTION",
    groupLabel: "TLPS Production Workspaces",
    archetype: "ProductionWorkspace"
  },
  {
    ordinal: 11,
    id: "WORKSPACE.TLPS_PRODUCTION.SHOT_LIST",
    name: "Shot List Workspace",
    groupId: "W35",
    groupKey: "TLPS_PRODUCTION",
    groupLabel: "TLPS Production Workspaces",
    archetype: "ProductionWorkspace"
  },
  {
    ordinal: 12,
    id: "WORKSPACE.TLPS_PRODUCTION.STORYBOARD",
    name: "Storyboard Workspace",
    groupId: "W35",
    groupKey: "TLPS_PRODUCTION",
    groupLabel: "TLPS Production Workspaces",
    archetype: "ProductionWorkspace"
  },
  {
    ordinal: 13,
    id: "WORKSPACE.TLPS_PRODUCTION.SCHEDULE_BOARD",
    name: "Schedule Board Workspace",
    groupId: "W35",
    groupKey: "TLPS_PRODUCTION",
    groupLabel: "TLPS Production Workspaces",
    archetype: "ProductionWorkspace"
  },
  {
    ordinal: 14,
    id: "WORKSPACE.CASTING.CASTING",
    name: "Casting Workspace",
    groupId: "W36",
    groupKey: "CASTING",
    groupLabel: "Casting Workspaces",
    archetype: "ProductionWorkspace"
  },
  {
    ordinal: 15,
    id: "WORKSPACE.CASTING.CASTING_BOARD",
    name: "Casting Board Workspace",
    groupId: "W36",
    groupKey: "CASTING",
    groupLabel: "Casting Workspaces",
    archetype: "ProductionWorkspace"
  },
  {
    ordinal: 16,
    id: "WORKSPACE.CASTING.CASTING_SEARCH",
    name: "Casting Search Workspace",
    groupId: "W36",
    groupKey: "CASTING",
    groupLabel: "Casting Workspaces",
    archetype: "ProductionWorkspace"
  },
  {
    ordinal: 17,
    id: "WORKSPACE.CASTING.TALENT",
    name: "Talent Workspace",
    groupId: "W36",
    groupKey: "CASTING",
    groupLabel: "Casting Workspaces",
    archetype: "ProductionWorkspace"
  },
  {
    ordinal: 18,
    id: "WORKSPACE.CASTING.ARTIST",
    name: "Artist Workspace",
    groupId: "W36",
    groupKey: "CASTING",
    groupLabel: "Casting Workspaces",
    archetype: "ProductionWorkspace"
  },
  {
    ordinal: 19,
    id: "WORKSPACE.CASTING.AUDITION",
    name: "Audition Workspace",
    groupId: "W36",
    groupKey: "CASTING",
    groupLabel: "Casting Workspaces",
    archetype: "ProductionWorkspace"
  },
  {
    ordinal: 20,
    id: "WORKSPACE.CASTING.CASTING_REVIEW",
    name: "Casting Review Workspace",
    groupId: "W36",
    groupKey: "CASTING",
    groupLabel: "Casting Workspaces",
    archetype: "ProductionWorkspace"
  },
  {
    ordinal: 21,
    id: "WORKSPACE.CASTING.CASTING_APPROVAL",
    name: "Casting Approval Workspace",
    groupId: "W36",
    groupKey: "CASTING",
    groupLabel: "Casting Workspaces",
    archetype: "ProductionWorkspace"
  },
  {
    ordinal: 22,
    id: "WORKSPACE.CASTING.CASTING_AVAILABILITY",
    name: "Casting Availability Workspace",
    groupId: "W36",
    groupKey: "CASTING",
    groupLabel: "Casting Workspaces",
    archetype: "ProductionWorkspace"
  },
  {
    ordinal: 23,
    id: "WORKSPACE.CASTING.CASTING_CONTRACT",
    name: "Casting Contract Workspace",
    groupId: "W36",
    groupKey: "CASTING",
    groupLabel: "Casting Workspaces",
    archetype: "ProductionWorkspace"
  },
  {
    ordinal: 24,
    id: "WORKSPACE.CREW.CREW",
    name: "Crew Workspace",
    groupId: "W37",
    groupKey: "CREW",
    groupLabel: "Crew Workspaces",
    archetype: "TeamWorkspace"
  },
  {
    ordinal: 25,
    id: "WORKSPACE.CREW.CREW_DIRECTORY",
    name: "Crew Directory Workspace",
    groupId: "W37",
    groupKey: "CREW",
    groupLabel: "Crew Workspaces",
    archetype: "TeamWorkspace"
  },
  {
    ordinal: 26,
    id: "WORKSPACE.CREW.DEPARTMENT",
    name: "Department Workspace",
    groupId: "W37",
    groupKey: "CREW",
    groupLabel: "Crew Workspaces",
    archetype: "TeamWorkspace"
  },
  {
    ordinal: 27,
    id: "WORKSPACE.CREW.CREW_SCHEDULING",
    name: "Crew Scheduling Workspace",
    groupId: "W37",
    groupKey: "CREW",
    groupLabel: "Crew Workspaces",
    archetype: "TeamWorkspace"
  },
  {
    ordinal: 28,
    id: "WORKSPACE.CREW.CREW_AVAILABILITY",
    name: "Crew Availability Workspace",
    groupId: "W37",
    groupKey: "CREW",
    groupLabel: "Crew Workspaces",
    archetype: "TeamWorkspace"
  },
  {
    ordinal: 29,
    id: "WORKSPACE.CREW.CREW_ASSIGNMENT",
    name: "Crew Assignment Workspace",
    groupId: "W37",
    groupKey: "CREW",
    groupLabel: "Crew Workspaces",
    archetype: "TeamWorkspace"
  },
  {
    ordinal: 30,
    id: "WORKSPACE.CREW.CREW_COMMUNICATION",
    name: "Crew Communication Workspace",
    groupId: "W37",
    groupKey: "CREW",
    groupLabel: "Crew Workspaces",
    archetype: "TeamWorkspace"
  },
  {
    ordinal: 31,
    id: "WORKSPACE.CREW.CREW_CONTRACT",
    name: "Crew Contract Workspace",
    groupId: "W37",
    groupKey: "CREW",
    groupLabel: "Crew Workspaces",
    archetype: "TeamWorkspace"
  }
] as const satisfies readonly WorkspaceTypeRecord[];

export const TLPS_WORKSPACE_GROUPS = ["TLPS_PRODUCTION", "CASTING", "CREW"] as const;
export const TLPS_WORKSPACE_TYPE_BY_ID = new Map(TLPS_WORKSPACE_TYPES.map((workspace) => [workspace.id, workspace] as const));
