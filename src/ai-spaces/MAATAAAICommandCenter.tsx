import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type MAATAAAICommandCenterProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function MAATAAAICommandCenter(props:MAATAAAICommandCenterProps) { return <AISpaceSurface spaceId="AI_SPACE.MAATAA_AI_COMMAND_CENTER" name="MAATAA AI Command Center" {...props} />; }
