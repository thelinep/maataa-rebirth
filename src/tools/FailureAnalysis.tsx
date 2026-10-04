import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type FailureAnalysisProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function FailureAnalysis(props:FailureAnalysisProps) { return <ToolSurface toolId="TOOL.FAILURE_ANALYSIS" name="Failure Analysis" {...props} />; }
