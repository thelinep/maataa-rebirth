import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type PIIInspectorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function PIIInspector(props:PIIInspectorProps) { return <ToolSurface toolId="TOOL.PII_INSPECTOR" name="PII Inspector" {...props} />; }
