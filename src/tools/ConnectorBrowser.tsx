import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ConnectorBrowserProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ConnectorBrowser(props:ConnectorBrowserProps) { return <ToolSurface toolId="TOOL.CONNECTOR_BROWSER" name="Connector Browser" {...props} />; }
