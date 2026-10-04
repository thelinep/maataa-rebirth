import { WORKSPACE_TYPES } from "../registries/workspaceRegistry";
export const MOBILE_WORKSPACES = WORKSPACE_TYPES.filter((workspace) => workspace.groupKey === "MOBILE");
