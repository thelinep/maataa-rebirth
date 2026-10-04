import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type CompetitiveIntelligenceWorkspaceProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function CompetitiveIntelligenceWorkspace(props:CompetitiveIntelligenceWorkspaceProps) { return <AISpaceSurface spaceId="AI_SPACE.COMPETITIVE_INTELLIGENCE_WORKSPACE" name="Competitive Intelligence Workspace" {...props} />; }
