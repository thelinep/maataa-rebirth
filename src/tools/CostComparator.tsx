import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type CostComparatorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function CostComparator(props:CostComparatorProps) { return <ToolSurface toolId="TOOL.COST_COMPARATOR" name="Cost Comparator" {...props} />; }
