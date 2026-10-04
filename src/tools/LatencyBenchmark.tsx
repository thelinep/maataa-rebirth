import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type LatencyBenchmarkProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function LatencyBenchmark(props:LatencyBenchmarkProps) { return <ToolSurface toolId="TOOL.LATENCY_BENCHMARK" name="Latency Benchmark" {...props} />; }
