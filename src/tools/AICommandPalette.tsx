import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AICommandPaletteProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AICommandPalette(props:AICommandPaletteProps) { return <ToolSurface toolId="TOOL.AI_COMMAND_PALETTE" name="AI Command Palette" {...props} />; }
