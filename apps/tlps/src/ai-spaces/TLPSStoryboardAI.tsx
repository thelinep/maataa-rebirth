import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "@maataa/ui/ai-spaces/AISpaceSurface";
export type TLPSStoryboardAIProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function TLPSStoryboardAI(props:TLPSStoryboardAIProps) { return <AISpaceSurface spaceId="AI_SPACE.TLPS_STORYBOARD_AI" name="TLPS Storyboard AI" {...props} />; }
