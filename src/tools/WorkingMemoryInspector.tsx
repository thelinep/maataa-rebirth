import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type WorkingMemoryInspectorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function WorkingMemoryInspector(props:WorkingMemoryInspectorProps) { return <ToolSurface toolId="TOOL.WORKING_MEMORY_INSPECTOR" name="Working Memory Inspector" {...props} />; }
