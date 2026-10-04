import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type APIObservabilityProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function APIObservability(props:APIObservabilityProps) { return <ToolSurface toolId="TOOL.API_OBSERVABILITY" name="API Observability" {...props} />; }
