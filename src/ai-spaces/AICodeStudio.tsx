import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type AICodeStudioProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function AICodeStudio(props:AICodeStudioProps) { return <AISpaceSurface spaceId="AI_SPACE.AI_CODE_STUDIO" name="AI Code Studio" {...props} />; }
