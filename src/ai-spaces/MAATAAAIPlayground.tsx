import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type MAATAAAIPlaygroundProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function MAATAAAIPlayground(props:MAATAAAIPlaygroundProps) { return <AISpaceSurface spaceId="AI_SPACE.MAATAA_AI_PLAYGROUND" name="MAATAA AI Playground" {...props} />; }
