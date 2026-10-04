import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type IndustryIntelligenceWorkspaceProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function IndustryIntelligenceWorkspace(props:IndustryIntelligenceWorkspaceProps) { return <AISpaceSurface spaceId="AI_SPACE.INDUSTRY_INTELLIGENCE_WORKSPACE" name="Industry Intelligence Workspace" {...props} />; }
