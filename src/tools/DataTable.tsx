import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type DataTableProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function DataTable(props:DataTableProps) { return <ToolSurface toolId="TOOL.DATA_TABLE" name="Data Table" {...props} />; }
