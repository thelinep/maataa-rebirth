import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type MAATAAPromptStudioProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function MAATAAPromptStudio(props:MAATAAPromptStudioProps) { return <AISpaceSurface spaceId="AI_SPACE.MAATAA_PROMPT_STUDIO" name="MAATAA Prompt Studio" {...props} />; }
