import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ToolRegistryProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ToolRegistry(props:ToolRegistryProps) { return <ToolSurface toolId="TOOL.TOOL_REGISTRY" name="Tool Registry" {...props} />; }
