import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type IntegrationBuilderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function IntegrationBuilder(props:IntegrationBuilderProps) { return <ToolSurface toolId="TOOL.INTEGRATION_BUILDER" name="Integration Builder" {...props} />; }
