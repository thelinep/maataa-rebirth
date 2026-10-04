import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type MAATAAWorkflowAIStudioProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function MAATAAWorkflowAIStudio(props:MAATAAWorkflowAIStudioProps) { return <AISpaceSurface spaceId="AI_SPACE.MAATAA_WORKFLOW_AI_STUDIO" name="MAATAA Workflow AI Studio" {...props} />; }
