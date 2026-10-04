import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type CommitExplorerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function CommitExplorer(props:CommitExplorerProps) { return <ToolSurface toolId="TOOL.COMMIT_EXPLORER" name="Commit Explorer" {...props} />; }
