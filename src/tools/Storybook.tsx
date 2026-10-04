import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type StorybookProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function Storybook(props:StorybookProps) { return <ToolSurface toolId="TOOL.STORYBOOK" name="Storybook" {...props} />; }
