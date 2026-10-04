import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ModelComparatorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ModelComparator(props:ModelComparatorProps) { return <ToolSurface toolId="TOOL.MODEL_COMPARATOR" name="Model Comparator" {...props} />; }
