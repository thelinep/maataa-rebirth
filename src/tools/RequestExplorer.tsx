import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type RequestExplorerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function RequestExplorer(props:RequestExplorerProps) { return <ToolSurface toolId="TOOL.REQUEST_EXPLORER" name="Request Explorer" {...props} />; }
