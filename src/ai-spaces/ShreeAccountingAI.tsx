import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type ShreeAccountingAIProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function ShreeAccountingAI(props:ShreeAccountingAIProps) { return <AISpaceSurface spaceId="AI_SPACE.SHREE_ACCOUNTING_AI" name="Shree Accounting AI" {...props} />; }
