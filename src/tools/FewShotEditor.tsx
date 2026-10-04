import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type FewShotEditorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function FewShotEditor(props:FewShotEditorProps) { return <ToolSurface toolId="TOOL.FEW_SHOT_EDITOR" name="Few-Shot Editor" {...props} />; }
