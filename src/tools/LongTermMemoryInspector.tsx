import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type LongTermMemoryInspectorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function LongTermMemoryInspector(props:LongTermMemoryInspectorProps) { return <ToolSurface toolId="TOOL.LONG_TERM_MEMORY_INSPECTOR" name="Long-Term Memory Inspector" {...props} />; }
