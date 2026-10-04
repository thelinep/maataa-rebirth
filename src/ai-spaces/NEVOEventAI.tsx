import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type NEVOEventAIProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function NEVOEventAI(props:NEVOEventAIProps) { return <AISpaceSurface spaceId="AI_SPACE.NEVO_EVENT_AI" name="NEVO Event AI" {...props} />; }
