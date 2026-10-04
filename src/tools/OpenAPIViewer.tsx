import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type OpenAPIViewerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function OpenAPIViewer(props:OpenAPIViewerProps) { return <ToolSurface toolId="TOOL.OPENAPI_VIEWER" name="OpenAPI Viewer" {...props} />; }
