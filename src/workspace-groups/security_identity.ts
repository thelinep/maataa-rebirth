import { WORKSPACE_TYPES } from "../registries/workspaceRegistry";
export const SECURITY_IDENTITY_WORKSPACES = WORKSPACE_TYPES.filter((workspace) => workspace.groupKey === "SECURITY_IDENTITY");
