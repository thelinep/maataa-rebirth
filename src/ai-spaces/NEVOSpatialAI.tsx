import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type NEVOSpatialAIProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function NEVOSpatialAI(props:NEVOSpatialAIProps) { return <AISpaceSurface spaceId="AI_SPACE.NEVO_SPATIAL_AI" name="NEVO Spatial AI" {...props} />; }
