import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type DataProfilerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function DataProfiler(props:DataProfilerProps) { return <ToolSurface toolId="TOOL.DATA_PROFILER" name="Data Profiler" {...props} />; }
