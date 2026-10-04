import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type AIBusinessStudioProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function AIBusinessStudio(props:AIBusinessStudioProps) { return <AISpaceSurface spaceId="AI_SPACE.AI_BUSINESS_STUDIO" name="AI Business Studio" {...props} />; }
