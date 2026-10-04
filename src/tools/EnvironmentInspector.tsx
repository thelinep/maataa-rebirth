import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type EnvironmentInspectorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function EnvironmentInspector(props:EnvironmentInspectorProps) { return <ToolSurface toolId="TOOL.ENVIRONMENT_INSPECTOR" name="Environment Inspector" {...props} />; }
