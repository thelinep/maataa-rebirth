import { WORKSPACE_TYPES } from "../registries/workspaceRegistry";
export const ENVIRONMENT_RELEASE_WORKSPACES = WORKSPACE_TYPES.filter((workspace) => workspace.groupKey === "ENVIRONMENT_RELEASE");
