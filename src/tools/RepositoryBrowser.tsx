import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type RepositoryBrowserProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function RepositoryBrowser(props:RepositoryBrowserProps) { return <ToolSurface toolId="TOOL.REPOSITORY_BROWSER" name="Repository Browser" {...props} />; }
