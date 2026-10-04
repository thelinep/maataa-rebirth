import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AgentSupervisorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AgentSupervisor(props:AgentSupervisorProps) { return <ToolSurface toolId="TOOL.AGENT_SUPERVISOR" name="Agent Supervisor" {...props} />; }
