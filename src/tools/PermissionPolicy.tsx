import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type PermissionPolicyProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function PermissionPolicy(props:PermissionPolicyProps) { return <ToolSurface toolId="TOOL.PERMISSION_POLICY" name="Permission Policy" {...props} />; }
