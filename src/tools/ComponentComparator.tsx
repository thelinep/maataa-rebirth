import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ComponentComparatorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ComponentComparator(props:ComponentComparatorProps) { return <ToolSurface toolId="TOOL.COMPONENT_COMPARATOR" name="Component Comparator" {...props} />; }
