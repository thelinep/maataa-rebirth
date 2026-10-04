import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ConnectorBuilderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ConnectorBuilder(props:ConnectorBuilderProps) { return <ToolSurface toolId="TOOL.CONNECTOR_BUILDER" name="Connector Builder" {...props} />; }
