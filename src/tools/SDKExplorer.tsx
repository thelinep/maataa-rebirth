import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type SDKExplorerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function SDKExplorer(props:SDKExplorerProps) { return <ToolSurface toolId="TOOL.SDK_EXPLORER" name="SDK Explorer" {...props} />; }
