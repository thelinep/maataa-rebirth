import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AuthConfigurationViewerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AuthConfigurationViewer(props:AuthConfigurationViewerProps) { return <ToolSurface toolId="TOOL.AUTH_CONFIGURATION_VIEWER" name="Auth Configuration Viewer" {...props} />; }
