import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type FileExplorerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function FileExplorer(props:FileExplorerProps) { return <ToolSurface toolId="TOOL.FILE_EXPLORER" name="File Explorer" {...props} />; }
