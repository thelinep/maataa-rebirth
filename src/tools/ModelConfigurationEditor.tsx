import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ModelConfigurationEditorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ModelConfigurationEditor(props:ModelConfigurationEditorProps) { return <ToolSurface toolId="TOOL.MODEL_CONFIGURATION_EDITOR" name="Model Configuration Editor" {...props} />; }
