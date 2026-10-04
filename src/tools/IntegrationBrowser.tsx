import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type IntegrationBrowserProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function IntegrationBrowser(props:IntegrationBrowserProps) { return <ToolSurface toolId="TOOL.INTEGRATION_BROWSER" name="Integration Browser" {...props} />; }
