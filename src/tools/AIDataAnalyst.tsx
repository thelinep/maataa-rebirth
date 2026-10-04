import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AIDataAnalystProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AIDataAnalyst(props:AIDataAnalystProps) { return <ToolSurface toolId="TOOL.AI_DATA_ANALYST" name="AI Data Analyst" {...props} />; }
