import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ModelTraceProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ModelTrace(props:ModelTraceProps) { return <ToolSurface toolId="TOOL.MODEL_TRACE" name="Model Trace" {...props} />; }
