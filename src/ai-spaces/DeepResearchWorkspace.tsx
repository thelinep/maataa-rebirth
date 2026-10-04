import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type DeepResearchWorkspaceProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function DeepResearchWorkspace(props:DeepResearchWorkspaceProps) { return <AISpaceSurface spaceId="AI_SPACE.DEEP_RESEARCH_WORKSPACE" name="Deep Research Workspace" {...props} />; }
