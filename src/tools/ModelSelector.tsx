import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ModelSelectorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ModelSelector(props:ModelSelectorProps) { return <ToolSurface toolId="TOOL.MODEL_SELECTOR" name="Model Selector" {...props} />; }
