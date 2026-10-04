import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AppBuilderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AppBuilder(props:AppBuilderProps) { return <ToolSurface toolId="TOOL.APP_BUILDER" name="App Builder" {...props} />; }
