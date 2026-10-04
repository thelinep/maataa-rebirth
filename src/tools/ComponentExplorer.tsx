import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ComponentExplorerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ComponentExplorer(props:ComponentExplorerProps) { return <ToolSurface toolId="TOOL.COMPONENT_EXPLORER" name="Component Explorer" {...props} />; }
