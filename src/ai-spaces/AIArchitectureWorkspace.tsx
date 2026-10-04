import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type AIArchitectureWorkspaceProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function AIArchitectureWorkspace(props:AIArchitectureWorkspaceProps) { return <AISpaceSurface spaceId="AI_SPACE.AI_ARCHITECTURE_WORKSPACE" name="AI Architecture Workspace" {...props} />; }
