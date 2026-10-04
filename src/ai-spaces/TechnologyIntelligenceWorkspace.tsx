import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type TechnologyIntelligenceWorkspaceProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function TechnologyIntelligenceWorkspace(props:TechnologyIntelligenceWorkspaceProps) { return <AISpaceSurface spaceId="AI_SPACE.TECHNOLOGY_INTELLIGENCE_WORKSPACE" name="Technology Intelligence Workspace" {...props} />; }
