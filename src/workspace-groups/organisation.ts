import { WORKSPACE_TYPES } from "../registries/workspaceRegistry";
export const ORGANISATION_WORKSPACES = WORKSPACE_TYPES.filter((workspace) => workspace.groupKey === "ORGANISATION");
