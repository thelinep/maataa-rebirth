import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type PolicyIntelligenceWorkspaceProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function PolicyIntelligenceWorkspace(props:PolicyIntelligenceWorkspaceProps) { return <AISpaceSurface spaceId="AI_SPACE.POLICY_INTELLIGENCE_WORKSPACE" name="Policy Intelligence Workspace" {...props} />; }
