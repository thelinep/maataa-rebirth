import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type KnowledgeLibraryProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function KnowledgeLibrary(props:KnowledgeLibraryProps) { return <ToolSurface toolId="TOOL.KNOWLEDGE_LIBRARY" name="Knowledge Library" {...props} />; }
