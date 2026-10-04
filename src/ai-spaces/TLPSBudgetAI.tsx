import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type TLPSBudgetAIProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function TLPSBudgetAI(props:TLPSBudgetAIProps) { return <AISpaceSurface spaceId="AI_SPACE.TLPS_BUDGET_AI" name="TLPS Budget AI" {...props} />; }
