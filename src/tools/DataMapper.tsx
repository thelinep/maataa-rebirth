import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type DataMapperProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function DataMapper(props:DataMapperProps) { return <ToolSurface toolId="TOOL.DATA_MAPPER" name="Data Mapper" {...props} />; }
