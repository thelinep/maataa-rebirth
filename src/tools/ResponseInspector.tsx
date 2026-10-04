import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ResponseInspectorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ResponseInspector(props:ResponseInspectorProps) { return <ToolSurface toolId="TOOL.RESPONSE_INSPECTOR" name="Response Inspector" {...props} />; }
