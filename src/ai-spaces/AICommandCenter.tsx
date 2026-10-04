import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type AICommandCenterProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function AICommandCenter(props:AICommandCenterProps) { return <AISpaceSurface spaceId="AI_SPACE.AI_COMMAND_CENTER" name="AI Command Center" {...props} />; }
