import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type SiddhamSemiconductorAIProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function SiddhamSemiconductorAI(props:SiddhamSemiconductorAIProps) { return <AISpaceSurface spaceId="AI_SPACE.SIDDHAM_SEMICONDUCTOR_AI" name="Siddham Semiconductor AI" {...props} />; }
