import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "@maataa/ui/ai-spaces/AISpaceSurface";
export type TLPSSchedulingAIProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function TLPSSchedulingAI(props:TLPSSchedulingAIProps) { return <AISpaceSurface spaceId="AI_SPACE.TLPS_SCHEDULING_AI" name="TLPS Scheduling AI" {...props} />; }
