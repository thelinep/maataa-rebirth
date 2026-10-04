import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type AIMusicStudioProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function AIMusicStudio(props:AIMusicStudioProps) { return <AISpaceSurface spaceId="AI_SPACE.AI_MUSIC_STUDIO" name="AI Music Studio" {...props} />; }
