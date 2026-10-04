import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ToolPolicyInspectorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ToolPolicyInspector(props:ToolPolicyInspectorProps) { return <ToolSurface toolId="TOOL.TOOL_POLICY_INSPECTOR" name="Tool Policy Inspector" {...props} />; }
