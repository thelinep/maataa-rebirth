import { WORKSPACE_TYPES } from "../registries/workspaceRegistry";
export const TEAM_WORKSPACES = WORKSPACE_TYPES.filter((workspace) => workspace.groupKey === "TEAM");
