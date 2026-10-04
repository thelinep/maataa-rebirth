import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ModelNodeProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ModelNode(props:ModelNodeProps) { return <ToolSurface toolId="TOOL.MODEL_NODE" name="Model Node" {...props} />; }
