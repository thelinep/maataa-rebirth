import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type TypeGeneratorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function TypeGenerator(props:TypeGeneratorProps) { return <ToolSurface toolId="TOOL.TYPE_GENERATOR" name="Type Generator" {...props} />; }
