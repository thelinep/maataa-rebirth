import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ModelCatalogProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ModelCatalog(props:ModelCatalogProps) { return <ToolSurface toolId="TOOL.MODEL_CATALOG" name="Model Catalog" {...props} />; }
