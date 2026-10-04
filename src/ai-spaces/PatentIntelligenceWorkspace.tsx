import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type PatentIntelligenceWorkspaceProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function PatentIntelligenceWorkspace(props:PatentIntelligenceWorkspaceProps) { return <AISpaceSurface spaceId="AI_SPACE.PATENT_INTELLIGENCE_WORKSPACE" name="Patent Intelligence Workspace" {...props} />; }
