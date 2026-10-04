import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type AIMarketIntelligenceProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function AIMarketIntelligence(props:AIMarketIntelligenceProps) { return <AISpaceSurface spaceId="AI_SPACE.AI_MARKET_INTELLIGENCE" name="AI Market Intelligence" {...props} />; }
