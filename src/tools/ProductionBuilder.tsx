import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ProductionBuilderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ProductionBuilder(props:ProductionBuilderProps) { return <ToolSurface toolId="TOOL.PRODUCTION_BUILDER" name="Production Builder" {...props} />; }
