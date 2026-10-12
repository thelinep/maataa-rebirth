import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "@maataa/ui/ai-spaces/AISpaceSurface";
export type TLPSProductionAIProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function TLPSProductionAI(props:TLPSProductionAIProps) { return <AISpaceSurface spaceId="AI_SPACE.TLPS_PRODUCTION_AI" name="TLPS Production AI" {...props} />; }
