import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type ShreeFinanceAIProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function ShreeFinanceAI(props:ShreeFinanceAIProps) { return <AISpaceSurface spaceId="AI_SPACE.SHREE_FINANCE_AI" name="Shree Finance AI" {...props} />; }
