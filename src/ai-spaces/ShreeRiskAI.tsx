import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type ShreeRiskAIProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function ShreeRiskAI(props:ShreeRiskAIProps) { return <AISpaceSurface spaceId="AI_SPACE.SHREE_RISK_AI" name="Shree Risk AI" {...props} />; }
