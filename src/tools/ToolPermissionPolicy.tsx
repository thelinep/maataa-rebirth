import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ToolPermissionPolicyProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ToolPermissionPolicy(props:ToolPermissionPolicyProps) { return <ToolSurface toolId="TOOL.TOOL_PERMISSION_POLICY" name="Tool Permission Policy" {...props} />; }
