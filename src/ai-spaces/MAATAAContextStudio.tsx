import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type MAATAAContextStudioProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function MAATAAContextStudio(props:MAATAAContextStudioProps) { return <AISpaceSurface spaceId="AI_SPACE.MAATAA_CONTEXT_STUDIO" name="MAATAA Context Studio" {...props} />; }
