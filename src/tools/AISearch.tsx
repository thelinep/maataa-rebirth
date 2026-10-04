import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AISearchProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AISearch(props:AISearchProps) { return <ToolSurface toolId="TOOL.AI_SEARCH" name="AI Search" {...props} />; }
