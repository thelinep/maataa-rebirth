import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type OntologyEditorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function OntologyEditor(props:OntologyEditorProps) { return <ToolSurface toolId="TOOL.ONTOLOGY_EDITOR" name="Ontology Editor" {...props} />; }
