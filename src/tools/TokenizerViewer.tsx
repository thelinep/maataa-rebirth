import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type TokenizerViewerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function TokenizerViewer(props:TokenizerViewerProps) { return <ToolSurface toolId="TOOL.TOKENIZER_VIEWER" name="Tokenizer Viewer" {...props} />; }
