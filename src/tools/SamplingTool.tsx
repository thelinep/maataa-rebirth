import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type SamplingToolProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function SamplingTool(props:SamplingToolProps) { return <ToolSurface toolId="TOOL.SAMPLING_TOOL" name="Sampling Tool" {...props} />; }
