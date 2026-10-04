import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AgentRunnerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AgentRunner(props:AgentRunnerProps) { return <ToolSurface toolId="TOOL.AGENT_RUNNER" name="Agent Runner" {...props} />; }
