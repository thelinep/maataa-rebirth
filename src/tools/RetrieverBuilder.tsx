import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type RetrieverBuilderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function RetrieverBuilder(props:RetrieverBuilderProps) { return <ToolSurface toolId="TOOL.RETRIEVER_BUILDER" name="Retriever Builder" {...props} />; }
