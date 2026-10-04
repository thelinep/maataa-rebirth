import { WORKSPACE_TYPES } from "../registries/workspaceRegistry";
export const DATABASE_WORKSPACES = WORKSPACE_TYPES.filter((workspace) => workspace.groupKey === "DATABASE");
