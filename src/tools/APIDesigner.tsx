import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type APIDesignerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function APIDesigner(props:APIDesignerProps) { return <ToolSurface toolId="TOOL.API_DESIGNER" name="API Designer" {...props} />; }
