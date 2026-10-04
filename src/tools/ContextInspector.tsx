import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ContextInspectorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ContextInspector(props:ContextInspectorProps) { return <ToolSurface toolId="TOOL.CONTEXT_INSPECTOR" name="Context Inspector" {...props} />; }
