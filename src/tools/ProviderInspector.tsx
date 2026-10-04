import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ProviderInspectorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ProviderInspector(props:ProviderInspectorProps) { return <ToolSurface toolId="TOOL.PROVIDER_INSPECTOR" name="Provider Inspector" {...props} />; }
