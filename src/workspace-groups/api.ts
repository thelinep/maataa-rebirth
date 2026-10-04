import { WORKSPACE_TYPES } from "../registries/workspaceRegistry";
export const API_WORKSPACES = WORKSPACE_TYPES.filter((workspace) => workspace.groupKey === "API");
