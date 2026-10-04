import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type AIDesignStudioProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function AIDesignStudio(props:AIDesignStudioProps) { return <AISpaceSurface spaceId="AI_SPACE.AI_DESIGN_STUDIO" name="AI Design Studio" {...props} />; }
