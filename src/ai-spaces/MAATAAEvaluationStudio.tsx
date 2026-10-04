import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type MAATAAEvaluationStudioProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function MAATAAEvaluationStudio(props:MAATAAEvaluationStudioProps) { return <AISpaceSurface spaceId="AI_SPACE.MAATAA_EVALUATION_STUDIO" name="MAATAA Evaluation Studio" {...props} />; }
