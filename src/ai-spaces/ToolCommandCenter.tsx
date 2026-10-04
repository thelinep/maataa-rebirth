import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type ToolCommandCenterProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function ToolCommandCenter(props:ToolCommandCenterProps) { return <AISpaceSurface spaceId="AI_SPACE.TOOL_COMMAND_CENTER" name="Tool Command Center" {...props} />; }
