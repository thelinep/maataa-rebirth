import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type MAATAAMultimodalStudioProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function MAATAAMultimodalStudio(props:MAATAAMultimodalStudioProps) { return <AISpaceSurface spaceId="AI_SPACE.MAATAA_MULTIMODAL_STUDIO" name="MAATAA Multimodal Studio" {...props} />; }
