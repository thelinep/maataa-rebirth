import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type RetrieverTesterProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function RetrieverTester(props:RetrieverTesterProps) { return <ToolSurface toolId="TOOL.RETRIEVER_TESTER" name="Retriever Tester" {...props} />; }
