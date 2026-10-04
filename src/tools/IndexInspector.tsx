import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type IndexInspectorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function IndexInspector(props:IndexInspectorProps) { return <ToolSurface toolId="TOOL.INDEX_INSPECTOR" name="Index Inspector" {...props} />; }
