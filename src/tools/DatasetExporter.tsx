import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type DatasetExporterProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function DatasetExporter(props:DatasetExporterProps) { return <ToolSurface toolId="TOOL.DATASET_EXPORTER" name="Dataset Exporter" {...props} />; }
