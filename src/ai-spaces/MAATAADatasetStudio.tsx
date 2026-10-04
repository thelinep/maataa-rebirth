import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type MAATAADatasetStudioProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function MAATAADatasetStudio(props:MAATAADatasetStudioProps) { return <AISpaceSurface spaceId="AI_SPACE.MAATAA_DATASET_STUDIO" name="MAATAA Dataset Studio" {...props} />; }
