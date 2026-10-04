import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type PluginRegistryProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function PluginRegistry(props:PluginRegistryProps) { return <ToolSurface toolId="TOOL.PLUGIN_REGISTRY" name="Plugin Registry" {...props} />; }
