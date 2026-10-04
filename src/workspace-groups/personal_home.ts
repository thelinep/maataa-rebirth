import { WORKSPACE_TYPES } from "../registries/workspaceRegistry";
export const PERSONAL_HOME_WORKSPACES = WORKSPACE_TYPES.filter((workspace) => workspace.groupKey === "PERSONAL_HOME");
