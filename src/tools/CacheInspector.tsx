import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type CacheInspectorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function CacheInspector(props:CacheInspectorProps) { return <ToolSurface toolId="TOOL.CACHE_INSPECTOR" name="Cache Inspector" {...props} />; }
