import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type NewsIntelligenceWorkspaceProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function NewsIntelligenceWorkspace(props:NewsIntelligenceWorkspaceProps) { return <AISpaceSurface spaceId="AI_SPACE.NEWS_INTELLIGENCE_WORKSPACE" name="News Intelligence Workspace" {...props} />; }
