import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type IntegrationConfiguratorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function IntegrationConfigurator(props:IntegrationConfiguratorProps) { return <ToolSurface toolId="TOOL.INTEGRATION_CONFIGURATOR" name="Integration Configurator" {...props} />; }
