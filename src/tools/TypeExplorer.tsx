import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type TypeExplorerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function TypeExplorer(props:TypeExplorerProps) { return <ToolSurface toolId="TOOL.TYPE_EXPLORER" name="Type Explorer" {...props} />; }
