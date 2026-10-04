import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type MAATAARAGStudioProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function MAATAARAGStudio(props:MAATAARAGStudioProps) { return <AISpaceSurface spaceId="AI_SPACE.MAATAA_RAG_STUDIO" name="MAATAA RAG Studio" {...props} />; }
