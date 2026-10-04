import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type MAATAASafetyStudioProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function MAATAASafetyStudio(props:MAATAASafetyStudioProps) { return <AISpaceSurface spaceId="AI_SPACE.MAATAA_SAFETY_STUDIO" name="MAATAA Safety Studio" {...props} />; }
