import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type SafetyCommandCenterProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function SafetyCommandCenter(props:SafetyCommandCenterProps) { return <AISpaceSurface spaceId="AI_SPACE.SAFETY_COMMAND_CENTER" name="Safety Command Center" {...props} />; }
