import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type OCRDocumentVisionProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function OCRDocumentVision(props:OCRDocumentVisionProps) { return <ToolSurface toolId="TOOL.OCR_DOCUMENT_VISION" name="OCR / Document Vision" {...props} />; }
