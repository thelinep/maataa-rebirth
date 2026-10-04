import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type MAATAAToolStudioProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function MAATAAToolStudio(props:MAATAAToolStudioProps) { return <AISpaceSurface spaceId="AI_SPACE.MAATAA_TOOL_STUDIO" name="MAATAA Tool Studio" {...props} />; }
