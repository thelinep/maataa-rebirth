import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type AIStoryboardStudioProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function AIStoryboardStudio(props:AIStoryboardStudioProps) { return <AISpaceSurface spaceId="AI_SPACE.AI_STORYBOARD_STUDIO" name="AI Storyboard Studio" {...props} />; }
