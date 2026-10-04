import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type MultiAgentGraphProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function MultiAgentGraph(props:MultiAgentGraphProps) { return <ToolSurface toolId="TOOL.MULTI_AGENT_GRAPH" name="Multi-Agent Graph" {...props} />; }
