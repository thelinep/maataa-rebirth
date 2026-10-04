import { WORKSPACE_TYPES } from "../registries/workspaceRegistry";
export const EVENT_GUEST_WORKSPACES = WORKSPACE_TYPES.filter((workspace) => workspace.groupKey === "EVENT_GUEST");
