import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type TableBuilderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function TableBuilder(props:TableBuilderProps) { return <ToolSurface toolId="TOOL.TABLE_BUILDER" name="Table Builder" {...props} />; }
