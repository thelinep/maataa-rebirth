import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type TokenInspectorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function TokenInspector(props:TokenInspectorProps) { return <ToolSurface toolId="TOOL.TOKEN_INSPECTOR" name="Token Inspector" {...props} />; }
