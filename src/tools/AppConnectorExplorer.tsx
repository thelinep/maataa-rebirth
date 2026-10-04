import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AppConnectorExplorerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AppConnectorExplorer(props:AppConnectorExplorerProps) { return <ToolSurface toolId="TOOL.APP_CONNECTOR_EXPLORER" name="App Connector Explorer" {...props} />; }
