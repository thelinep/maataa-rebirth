import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type NEVOROIAIProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function NEVOROIAI(props:NEVOROIAIProps) { return <AISpaceSurface spaceId="AI_SPACE.NEVO_ROI_AI" name="NEVO ROI AI" {...props} />; }
