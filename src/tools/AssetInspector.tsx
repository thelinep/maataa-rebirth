import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AssetInspectorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AssetInspector(props:AssetInspectorProps) { return <ToolSurface toolId="TOOL.ASSET_INSPECTOR" name="Asset Inspector" {...props} />; }
