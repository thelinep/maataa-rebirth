import { WORKSPACE_TYPES } from "../registries/workspaceRegistry";
export const MARKETPLACE_WORKSPACES = WORKSPACE_TYPES.filter((workspace) => workspace.groupKey === "MARKETPLACE");
