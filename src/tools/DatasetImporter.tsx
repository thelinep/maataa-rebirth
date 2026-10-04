import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type DatasetImporterProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function DatasetImporter(props:DatasetImporterProps) { return <ToolSurface toolId="TOOL.DATASET_IMPORTER" name="Dataset Importer" {...props} />; }
