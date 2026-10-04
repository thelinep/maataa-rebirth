import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type SDKGeneratorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function SDKGenerator(props:SDKGeneratorProps) { return <ToolSurface toolId="TOOL.SDK_GENERATOR" name="SDK Generator" {...props} />; }
