import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ContextConflictInspectorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ContextConflictInspector(props:ContextConflictInspectorProps) { return <ToolSurface toolId="TOOL.CONTEXT_CONFLICT_INSPECTOR" name="Context Conflict Inspector" {...props} />; }
