import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ModelRouterProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ModelRouter(props:ModelRouterProps) { return <ToolSurface toolId="TOOL.MODEL_ROUTER" name="Model Router" {...props} />; }
