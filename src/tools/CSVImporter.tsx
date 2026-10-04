import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type CSVImporterProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function CSVImporter(props:CSVImporterProps) { return <ToolSurface toolId="TOOL.CSV_IMPORTER" name="CSV Importer" {...props} />; }
