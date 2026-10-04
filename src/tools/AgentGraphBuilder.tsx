import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AgentGraphBuilderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AgentGraphBuilder(props:AgentGraphBuilderProps) { return <ToolSurface toolId="TOOL.AGENT_GRAPH_BUILDER" name="Agent Graph Builder" {...props} />; }
