import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type SpatialBuilderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function SpatialBuilder(props:SpatialBuilderProps) { return <ToolSurface toolId="TOOL.SPATIAL_BUILDER" name="Spatial Builder" {...props} />; }
