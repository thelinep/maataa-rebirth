import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type AIPresentationStudioProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function AIPresentationStudio(props:AIPresentationStudioProps) { return <AISpaceSurface spaceId="AI_SPACE.AI_PRESENTATION_STUDIO" name="AI Presentation Studio" {...props} />; }
