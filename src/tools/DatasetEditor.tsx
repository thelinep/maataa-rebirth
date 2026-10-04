import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type DatasetEditorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function DatasetEditor(props:DatasetEditorProps) { return <ToolSurface toolId="TOOL.DATASET_EDITOR" name="Dataset Editor" {...props} />; }
