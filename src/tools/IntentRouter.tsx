import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type IntentRouterProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function IntentRouter(props:IntentRouterProps) { return <ToolSurface toolId="TOOL.INTENT_ROUTER" name="Intent Router" {...props} />; }
