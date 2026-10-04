import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type CostExplorerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function CostExplorer(props:CostExplorerProps) { return <ToolSurface toolId="TOOL.COST_EXPLORER" name="Cost Explorer" {...props} />; }
