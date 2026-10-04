import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type TokenUsageExplorerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function TokenUsageExplorer(props:TokenUsageExplorerProps) { return <ToolSurface toolId="TOOL.TOKEN_USAGE_EXPLORER" name="Token Usage Explorer" {...props} />; }
