import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type AIResearchWorkspaceProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function AIResearchWorkspace(props:AIResearchWorkspaceProps) { return <AISpaceSurface spaceId="AI_SPACE.AI_RESEARCH_WORKSPACE" name="AI Research Workspace" {...props} />; }
