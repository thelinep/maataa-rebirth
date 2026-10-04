import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type APIContractEditorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function APIContractEditor(props:APIContractEditorProps) { return <ToolSurface toolId="TOOL.API_CONTRACT_EDITOR" name="API Contract Editor" {...props} />; }
