import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type StandardsIntelligenceWorkspaceProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function StandardsIntelligenceWorkspace(props:StandardsIntelligenceWorkspaceProps) { return <AISpaceSurface spaceId="AI_SPACE.STANDARDS_INTELLIGENCE_WORKSPACE" name="Standards Intelligence Workspace" {...props} />; }
