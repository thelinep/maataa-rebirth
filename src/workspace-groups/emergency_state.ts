import { WORKSPACE_TYPES } from "../registries/workspaceRegistry";
export const EMERGENCY_STATE_WORKSPACES = WORKSPACE_TYPES.filter((workspace) => workspace.groupKey === "EMERGENCY_STATE");
