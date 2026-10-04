import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AdapterBuilderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AdapterBuilder(props:AdapterBuilderProps) { return <ToolSurface toolId="TOOL.ADAPTER_BUILDER" name="Adapter Builder" {...props} />; }
