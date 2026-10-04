import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type DataNormalizerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function DataNormalizer(props:DataNormalizerProps) { return <ToolSurface toolId="TOOL.DATA_NORMALIZER" name="Data Normalizer" {...props} />; }
