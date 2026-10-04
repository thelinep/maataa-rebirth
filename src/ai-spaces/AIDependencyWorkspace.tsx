import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type AIDependencyWorkspaceProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function AIDependencyWorkspace(props:AIDependencyWorkspaceProps) { return <AISpaceSurface spaceId="AI_SPACE.AI_DEPENDENCY_WORKSPACE" name="AI Dependency Workspace" {...props} />; }
