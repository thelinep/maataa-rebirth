import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type SiddhamEdgeAIStudioProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function SiddhamEdgeAIStudio(props:SiddhamEdgeAIStudioProps) { return <AISpaceSurface spaceId="AI_SPACE.SIDDHAM_EDGE_AI_STUDIO" name="Siddham Edge AI Studio" {...props} />; }
