import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AgentCatalogProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AgentCatalog(props:AgentCatalogProps) { return <ToolSurface toolId="TOOL.AGENT_CATALOG" name="Agent Catalog" {...props} />; }
