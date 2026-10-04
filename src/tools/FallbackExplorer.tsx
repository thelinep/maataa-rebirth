import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type FallbackExplorerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function FallbackExplorer(props:FallbackExplorerProps) { return <ToolSurface toolId="TOOL.FALLBACK_EXPLORER" name="Fallback Explorer" {...props} />; }
