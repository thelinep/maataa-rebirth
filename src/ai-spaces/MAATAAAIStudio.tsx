import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type MAATAAAIStudioProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function MAATAAAIStudio(props:MAATAAAIStudioProps) { return <AISpaceSurface spaceId="AI_SPACE.MAATAA_AI_STUDIO" name="MAATAA AI Studio" {...props} />; }
