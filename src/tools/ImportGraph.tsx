import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ImportGraphProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ImportGraph(props:ImportGraphProps) { return <ToolSurface toolId="TOOL.IMPORT_GRAPH" name="Import Graph" {...props} />; }
