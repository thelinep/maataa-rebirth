import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type PackageExplorerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function PackageExplorer(props:PackageExplorerProps) { return <ToolSurface toolId="TOOL.PACKAGE_EXPLORER" name="Package Explorer" {...props} />; }
