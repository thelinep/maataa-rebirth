import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type MCPServerRegistryProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function MCPServerRegistry(props:MCPServerRegistryProps) { return <ToolSurface toolId="TOOL.MCP_SERVER_REGISTRY" name="MCP Server Registry" {...props} />; }
