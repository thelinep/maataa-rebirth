import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type MAATAAModelStudioProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function MAATAAModelStudio(props:MAATAAModelStudioProps) { return <AISpaceSurface spaceId="AI_SPACE.MAATAA_MODEL_STUDIO" name="MAATAA Model Studio" {...props} />; }
