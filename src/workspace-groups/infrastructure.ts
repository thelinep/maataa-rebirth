import { WORKSPACE_TYPES } from "../registries/workspaceRegistry";
export const INFRASTRUCTURE_WORKSPACES = WORKSPACE_TYPES.filter((workspace) => workspace.groupKey === "INFRASTRUCTURE");
