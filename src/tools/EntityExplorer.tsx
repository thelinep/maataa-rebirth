import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type EntityExplorerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function EntityExplorer(props:EntityExplorerProps) { return <ToolSurface toolId="TOOL.ENTITY_EXPLORER" name="Entity Explorer" {...props} />; }
