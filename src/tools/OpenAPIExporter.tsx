import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type OpenAPIExporterProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function OpenAPIExporter(props:OpenAPIExporterProps) { return <ToolSurface toolId="TOOL.OPENAPI_EXPORTER" name="OpenAPI Exporter" {...props} />; }
