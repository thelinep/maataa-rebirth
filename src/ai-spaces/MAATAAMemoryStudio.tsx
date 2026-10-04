import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type MAATAAMemoryStudioProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function MAATAAMemoryStudio(props:MAATAAMemoryStudioProps) { return <AISpaceSurface spaceId="AI_SPACE.MAATAA_MEMORY_STUDIO" name="MAATAA Memory Studio" {...props} />; }
