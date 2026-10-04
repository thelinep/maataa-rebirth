import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ModelExplorerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ModelExplorer(props:ModelExplorerProps) { return <ToolSurface toolId="TOOL.MODEL_EXPLORER" name="Model Explorer" {...props} />; }
