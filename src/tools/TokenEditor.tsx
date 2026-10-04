import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type TokenEditorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function TokenEditor(props:TokenEditorProps) { return <ToolSurface toolId="TOOL.TOKEN_EDITOR" name="Token Editor" {...props} />; }
