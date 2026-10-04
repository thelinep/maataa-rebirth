import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type HybridSearchProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function HybridSearch(props:HybridSearchProps) { return <ToolSurface toolId="TOOL.HYBRID_SEARCH" name="Hybrid Search" {...props} />; }
