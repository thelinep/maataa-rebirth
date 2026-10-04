import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type MAATAAAIHomeProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function MAATAAAIHome(props:MAATAAAIHomeProps) { return <AISpaceSurface spaceId="AI_SPACE.MAATAA_AI_HOME" name="MAATAA AI Home" {...props} />; }
