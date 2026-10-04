import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type EndpointExplorerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function EndpointExplorer(props:EndpointExplorerProps) { return <ToolSurface toolId="TOOL.ENDPOINT_EXPLORER" name="Endpoint Explorer" {...props} />; }
