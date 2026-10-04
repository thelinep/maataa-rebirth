import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type AIBrandStudioProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function AIBrandStudio(props:AIBrandStudioProps) { return <AISpaceSurface spaceId="AI_SPACE.AI_BRAND_STUDIO" name="AI Brand Studio" {...props} />; }
