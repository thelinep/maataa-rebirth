import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type AIOperationsWorkspaceProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function AIOperationsWorkspace(props:AIOperationsWorkspaceProps) { return <AISpaceSurface spaceId="AI_SPACE.AI_OPERATIONS_WORKSPACE" name="AI Operations Workspace" {...props} />; }
