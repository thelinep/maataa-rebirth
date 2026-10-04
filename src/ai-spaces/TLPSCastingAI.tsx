import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type TLPSCastingAIProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function TLPSCastingAI(props:TLPSCastingAIProps) { return <AISpaceSurface spaceId="AI_SPACE.TLPS_CASTING_AI" name="TLPS Casting AI" {...props} />; }
