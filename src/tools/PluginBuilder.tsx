import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type PluginBuilderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function PluginBuilder(props:PluginBuilderProps) { return <ToolSurface toolId="TOOL.PLUGIN_BUILDER" name="Plugin Builder" {...props} />; }
