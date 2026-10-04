import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type SourceInspectorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function SourceInspector(props:SourceInspectorProps) { return <ToolSurface toolId="TOOL.SOURCE_INSPECTOR" name="Source Inspector" {...props} />; }
