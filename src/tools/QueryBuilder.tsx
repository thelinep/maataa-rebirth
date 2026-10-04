import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type QueryBuilderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function QueryBuilder(props:QueryBuilderProps) { return <ToolSurface toolId="TOOL.QUERY_BUILDER" name="Query Builder" {...props} />; }
