import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type VectorExplorerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function VectorExplorer(props:VectorExplorerProps) { return <ToolSurface toolId="TOOL.VECTOR_EXPLORER" name="Vector Explorer" {...props} />; }
