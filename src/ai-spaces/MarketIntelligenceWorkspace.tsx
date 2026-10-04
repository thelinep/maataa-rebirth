import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type MarketIntelligenceWorkspaceProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function MarketIntelligenceWorkspace(props:MarketIntelligenceWorkspaceProps) { return <AISpaceSurface spaceId="AI_SPACE.MARKET_INTELLIGENCE_WORKSPACE" name="Market Intelligence Workspace" {...props} />; }
