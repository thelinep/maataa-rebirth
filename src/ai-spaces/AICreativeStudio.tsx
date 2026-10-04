import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type AICreativeStudioProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function AICreativeStudio(props:AICreativeStudioProps) { return <AISpaceSurface spaceId="AI_SPACE.AI_CREATIVE_STUDIO" name="AI Creative Studio" {...props} />; }
