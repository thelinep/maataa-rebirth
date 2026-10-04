import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type AgentCommandCenterProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function AgentCommandCenter(props:AgentCommandCenterProps) { return <AISpaceSurface spaceId="AI_SPACE.AGENT_COMMAND_CENTER" name="Agent Command Center" {...props} />; }
