import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type AIImageStudioProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function AIImageStudio(props:AIImageStudioProps) { return <AISpaceSurface spaceId="AI_SPACE.AI_IMAGE_STUDIO" name="AI Image Studio" {...props} />; }
