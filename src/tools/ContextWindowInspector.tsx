import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ContextWindowInspectorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ContextWindowInspector(props:ContextWindowInspectorProps) { return <ToolSurface toolId="TOOL.CONTEXT_WINDOW_INSPECTOR" name="Context Window Inspector" {...props} />; }
