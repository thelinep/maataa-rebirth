import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type JSONImporterProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function JSONImporter(props:JSONImporterProps) { return <ToolSurface toolId="TOOL.JSON_IMPORTER" name="JSON Importer" {...props} />; }
