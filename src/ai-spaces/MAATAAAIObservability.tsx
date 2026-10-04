import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type MAATAAAIObservabilityProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function MAATAAAIObservability(props:MAATAAAIObservabilityProps) { return <AISpaceSurface spaceId="AI_SPACE.MAATAA_AI_OBSERVABILITY" name="MAATAA AI Observability" {...props} />; }
