import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ThroughputExplorerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ThroughputExplorer(props:ThroughputExplorerProps) { return <ToolSurface toolId="TOOL.THROUGHPUT_EXPLORER" name="Throughput Explorer" {...props} />; }
