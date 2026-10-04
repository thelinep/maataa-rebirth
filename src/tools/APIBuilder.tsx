import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type APIBuilderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function APIBuilder(props:APIBuilderProps) { return <ToolSurface toolId="TOOL.API_BUILDER" name="API Builder" {...props} />; }
