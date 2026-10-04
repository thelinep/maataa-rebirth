import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type LatencyEvalProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function LatencyEval(props:LatencyEvalProps) { return <ToolSurface toolId="TOOL.LATENCY_EVAL" name="Latency Eval" {...props} />; }
