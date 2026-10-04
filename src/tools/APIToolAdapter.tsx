import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type APIToolAdapterProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function APIToolAdapter(props:APIToolAdapterProps) { return <ToolSurface toolId="TOOL.API_TOOL_ADAPTER" name="API Tool Adapter" {...props} />; }
