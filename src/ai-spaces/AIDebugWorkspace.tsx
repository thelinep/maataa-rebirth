import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type AIDebugWorkspaceProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function AIDebugWorkspace(props:AIDebugWorkspaceProps) { return <AISpaceSurface spaceId="AI_SPACE.AI_DEBUG_WORKSPACE" name="AI Debug Workspace" {...props} />; }
