import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type FunctionRegistryProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function FunctionRegistry(props:FunctionRegistryProps) { return <ToolSurface toolId="TOOL.FUNCTION_REGISTRY" name="Function Registry" {...props} />; }
