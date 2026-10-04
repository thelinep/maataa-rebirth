import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type VariantEditorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function VariantEditor(props:VariantEditorProps) { return <ToolSurface toolId="TOOL.VARIANT_EDITOR" name="Variant Editor" {...props} />; }
