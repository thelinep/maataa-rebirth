import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type MarketplaceBuilderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function MarketplaceBuilder(props:MarketplaceBuilderProps) { return <ToolSurface toolId="TOOL.MARKETPLACE_BUILDER" name="Marketplace Builder" {...props} />; }
