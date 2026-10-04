import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type ResearchWorkspaceProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function ResearchWorkspace(props:ResearchWorkspaceProps) { return <AISpaceSurface spaceId="AI_SPACE.RESEARCH_WORKSPACE" name="Research Workspace" {...props} />; }
