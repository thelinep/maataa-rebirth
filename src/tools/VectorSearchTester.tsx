import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type VectorSearchTesterProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function VectorSearchTester(props:VectorSearchTesterProps) { return <ToolSurface toolId="TOOL.VECTOR_SEARCH_TESTER" name="Vector Search Tester" {...props} />; }
