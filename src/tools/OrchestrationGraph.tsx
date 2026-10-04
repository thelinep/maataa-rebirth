import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type OrchestrationGraphProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function OrchestrationGraph(props:OrchestrationGraphProps) { return <ToolSurface toolId="TOOL.ORCHESTRATION_GRAPH" name="Orchestration Graph" {...props} />; }
