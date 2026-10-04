import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ChartBuilderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ChartBuilder(props:ChartBuilderProps) { return <ToolSurface toolId="TOOL.CHART_BUILDER" name="Chart Builder" {...props} />; }
