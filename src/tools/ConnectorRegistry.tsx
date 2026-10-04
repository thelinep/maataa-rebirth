import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ConnectorRegistryProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ConnectorRegistry(props:ConnectorRegistryProps) { return <ToolSurface toolId="TOOL.CONNECTOR_REGISTRY" name="Connector Registry" {...props} />; }
