import { WORKSPACE_TYPES } from "../registries/workspaceRegistry";
export const COMMUNITY_WORKSPACES = WORKSPACE_TYPES.filter((workspace) => workspace.groupKey === "COMMUNITY");
