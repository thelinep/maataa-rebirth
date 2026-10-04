import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type FileUploadToolProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function FileUploadTool(props:FileUploadToolProps) { return <ToolSurface toolId="TOOL.FILE_UPLOAD_TOOL" name="File Upload Tool" {...props} />; }
