import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AgentDebuggerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AgentDebugger(props:AgentDebuggerProps) { return <ToolSurface toolId="TOOL.AGENT_DEBUGGER" name="Agent Debugger" {...props} />; }
