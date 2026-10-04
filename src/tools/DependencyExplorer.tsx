import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type DependencyExplorerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function DependencyExplorer(props:DependencyExplorerProps) { return <ToolSurface toolId="TOOL.DEPENDENCY_EXPLORER" name="Dependency Explorer" {...props} />; }
