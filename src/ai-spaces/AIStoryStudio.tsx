import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type AIStoryStudioProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function AIStoryStudio(props:AIStoryStudioProps) { return <AISpaceSurface spaceId="AI_SPACE.AI_STORY_STUDIO" name="AI Story Studio" {...props} />; }
