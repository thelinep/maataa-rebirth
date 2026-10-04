import { WORKSPACE_TYPES } from "../registries/workspaceRegistry";
export const DEVELOPER_WORKSPACES = WORKSPACE_TYPES.filter((workspace) => workspace.groupKey === "DEVELOPER");
