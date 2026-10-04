import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type MCPToolExplorerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function MCPToolExplorer(props:MCPToolExplorerProps) { return <ToolSurface toolId="TOOL.MCP_TOOL_EXPLORER" name="MCP Tool Explorer" {...props} />; }
