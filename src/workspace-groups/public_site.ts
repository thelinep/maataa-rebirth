import { WORKSPACE_TYPES } from "../registries/workspaceRegistry";
export const PUBLIC_SITE_WORKSPACES = WORKSPACE_TYPES.filter((workspace) => workspace.groupKey === "PUBLIC_SITE");
