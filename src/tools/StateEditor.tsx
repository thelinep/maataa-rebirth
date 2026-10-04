import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type StateEditorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function StateEditor(props:StateEditorProps) { return <ToolSurface toolId="TOOL.STATE_EDITOR" name="State Editor" {...props} />; }
