import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type RequestBuilderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function RequestBuilder(props:RequestBuilderProps) { return <ToolSurface toolId="TOOL.REQUEST_BUILDER" name="Request Builder" {...props} />; }
