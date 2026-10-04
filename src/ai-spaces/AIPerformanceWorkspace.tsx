import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type AIPerformanceWorkspaceProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function AIPerformanceWorkspace(props:AIPerformanceWorkspaceProps) { return <AISpaceSurface spaceId="AI_SPACE.AI_PERFORMANCE_WORKSPACE" name="AI Performance Workspace" {...props} />; }
