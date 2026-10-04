import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AgentBuilderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AgentBuilder(props:AgentBuilderProps) { return <ToolSurface toolId="TOOL.AGENT_BUILDER" name="Agent Builder" {...props} />; }
