import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ModelPlaygroundProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ModelPlayground(props:ModelPlaygroundProps) { return <ToolSurface toolId="TOOL.MODEL_PLAYGROUND" name="Model Playground" {...props} />; }
