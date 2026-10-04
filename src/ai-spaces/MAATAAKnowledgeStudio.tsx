import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type MAATAAKnowledgeStudioProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function MAATAAKnowledgeStudio(props:MAATAAKnowledgeStudioProps) { return <AISpaceSurface spaceId="AI_SPACE.MAATAA_KNOWLEDGE_STUDIO" name="MAATAA Knowledge Studio" {...props} />; }
