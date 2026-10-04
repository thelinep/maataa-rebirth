import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type LatencyExplorerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function LatencyExplorer(props:LatencyExplorerProps) { return <ToolSurface toolId="TOOL.LATENCY_EXPLORER" name="Latency Explorer" {...props} />; }
