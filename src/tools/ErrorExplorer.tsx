import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ErrorExplorerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ErrorExplorer(props:ErrorExplorerProps) { return <ToolSurface toolId="TOOL.ERROR_EXPLORER" name="Error Explorer" {...props} />; }
