import { WORKSPACE_TYPES } from "../registries/workspaceRegistry";
export const DESKTOP_WORKSPACES = WORKSPACE_TYPES.filter((workspace) => workspace.groupKey === "DESKTOP");
