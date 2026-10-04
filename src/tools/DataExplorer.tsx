import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type DataExplorerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function DataExplorer(props:DataExplorerProps) { return <ToolSurface toolId="TOOL.DATA_EXPLORER" name="Data Explorer" {...props} />; }
