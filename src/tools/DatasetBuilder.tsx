import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type DatasetBuilderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function DatasetBuilder(props:DatasetBuilderProps) { return <ToolSurface toolId="TOOL.DATASET_BUILDER" name="Dataset Builder" {...props} />; }
