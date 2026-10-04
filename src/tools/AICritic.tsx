import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AICriticProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AICritic(props:AICriticProps) { return <ToolSurface toolId="TOOL.AI_CRITIC" name="AI Critic" {...props} />; }
