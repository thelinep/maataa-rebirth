import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type APIExplorerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function APIExplorer(props:APIExplorerProps) { return <ToolSurface toolId="TOOL.API_EXPLORER" name="API Explorer" {...props} />; }
