import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type SyntheticDatasetGeneratorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function SyntheticDatasetGenerator(props:SyntheticDatasetGeneratorProps) { return <ToolSurface toolId="TOOL.SYNTHETIC_DATASET_GENERATOR" name="Synthetic Dataset Generator" {...props} />; }
