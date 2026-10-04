import { WORKSPACE_TYPES } from "../registries/workspaceRegistry";
export const CONTROL_PLANE_WORKSPACES = WORKSPACE_TYPES.filter((workspace) => workspace.groupKey === "CONTROL_PLANE");
