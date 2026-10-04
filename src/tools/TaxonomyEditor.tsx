import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type TaxonomyEditorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function TaxonomyEditor(props:TaxonomyEditorProps) { return <ToolSurface toolId="TOOL.TAXONOMY_EDITOR" name="Taxonomy Editor" {...props} />; }
