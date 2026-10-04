import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type MAATAAAgentStudioProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function MAATAAAgentStudio(props:MAATAAAgentStudioProps) { return <AISpaceSurface spaceId="AI_SPACE.MAATAA_AGENT_STUDIO" name="MAATAA Agent Studio" {...props} />; }
