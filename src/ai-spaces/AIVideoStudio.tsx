import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type AIVideoStudioProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function AIVideoStudio(props:AIVideoStudioProps) { return <AISpaceSurface spaceId="AI_SPACE.AI_VIDEO_STUDIO" name="AI Video Studio" {...props} />; }
