import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ContextBudgetToolProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ContextBudgetTool(props:ContextBudgetToolProps) { return <ToolSurface toolId="TOOL.CONTEXT_BUDGET_TOOL" name="Context Budget Tool" {...props} />; }
