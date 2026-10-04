import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type ShreeInvestorAIProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function ShreeInvestorAI(props:ShreeInvestorAIProps) { return <AISpaceSurface spaceId="AI_SPACE.SHREE_INVESTOR_AI" name="Shree Investor AI" {...props} />; }
