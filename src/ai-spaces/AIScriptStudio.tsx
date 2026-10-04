import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type AIScriptStudioProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function AIScriptStudio(props:AIScriptStudioProps) { return <AISpaceSurface spaceId="AI_SPACE.AI_SCRIPT_STUDIO" name="AI Script Studio" {...props} />; }
