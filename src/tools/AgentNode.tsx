import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AgentNodeProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AgentNode(props:AgentNodeProps) { return <ToolSurface toolId="TOOL.AGENT_NODE" name="Agent Node" {...props} />; }
