import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type AIMotionStudioProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function AIMotionStudio(props:AIMotionStudioProps) { return <AISpaceSurface spaceId="AI_SPACE.AI_MOTION_STUDIO" name="AI Motion Studio" {...props} />; }
