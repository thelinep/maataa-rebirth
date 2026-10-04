import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AIComparatorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AIComparator(props:AIComparatorProps) { return <ToolSurface toolId="TOOL.AI_COMPARATOR" name="AI Comparator" {...props} />; }
