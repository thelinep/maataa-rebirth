import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type PageComposerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function PageComposer(props:PageComposerProps) { return <ToolSurface toolId="TOOL.PAGE_COMPOSER" name="Page Composer" {...props} />; }
