import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ProfilerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function Profiler(props:ProfilerProps) { return <ToolSurface toolId="TOOL.PROFILER" name="Profiler" {...props} />; }
