import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type QueryHistoryProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function QueryHistory(props:QueryHistoryProps) { return <ToolSurface toolId="TOOL.QUERY_HISTORY" name="Query History" {...props} />; }
