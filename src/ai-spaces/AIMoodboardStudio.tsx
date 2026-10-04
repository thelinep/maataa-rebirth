import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type AIMoodboardStudioProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function AIMoodboardStudio(props:AIMoodboardStudioProps) { return <AISpaceSurface spaceId="AI_SPACE.AI_MOODBOARD_STUDIO" name="AI Moodboard Studio" {...props} />; }
