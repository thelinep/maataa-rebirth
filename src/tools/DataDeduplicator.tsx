import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type DataDeduplicatorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function DataDeduplicator(props:DataDeduplicatorProps) { return <ToolSurface toolId="TOOL.DATA_DEDUPLICATOR" name="Data Deduplicator" {...props} />; }
