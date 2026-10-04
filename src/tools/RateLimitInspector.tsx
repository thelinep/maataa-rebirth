import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type RateLimitInspectorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function RateLimitInspector(props:RateLimitInspectorProps) { return <ToolSurface toolId="TOOL.RATE_LIMIT_INSPECTOR" name="Rate-Limit Inspector" {...props} />; }
