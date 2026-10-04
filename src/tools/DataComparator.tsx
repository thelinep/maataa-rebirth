import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type DataComparatorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function DataComparator(props:DataComparatorProps) { return <ToolSurface toolId="TOOL.DATA_COMPARATOR" name="Data Comparator" {...props} />; }
