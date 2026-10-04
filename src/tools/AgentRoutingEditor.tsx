import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AgentRoutingEditorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AgentRoutingEditor(props:AgentRoutingEditorProps) { return <ToolSurface toolId="TOOL.AGENT_ROUTING_EDITOR" name="Agent Routing Editor" {...props} />; }
