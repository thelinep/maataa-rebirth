import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type SessionMemoryInspectorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function SessionMemoryInspector(props:SessionMemoryInspectorProps) { return <ToolSurface toolId="TOOL.SESSION_MEMORY_INSPECTOR" name="Session Memory Inspector" {...props} />; }
