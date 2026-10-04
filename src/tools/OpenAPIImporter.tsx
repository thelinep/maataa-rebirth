import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type OpenAPIImporterProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function OpenAPIImporter(props:OpenAPIImporterProps) { return <ToolSurface toolId="TOOL.OPENAPI_IMPORTER" name="OpenAPI Importer" {...props} />; }
