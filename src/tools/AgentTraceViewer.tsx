import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AgentTraceViewerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AgentTraceViewer(props:AgentTraceViewerProps) { return <ToolSurface toolId="TOOL.AGENT_TRACE_VIEWER" name="Agent Trace Viewer" {...props} />; }
