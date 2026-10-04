import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type EvaluationCommandCenterProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function EvaluationCommandCenter(props:EvaluationCommandCenterProps) { return <AISpaceSurface spaceId="AI_SPACE.EVALUATION_COMMAND_CENTER" name="Evaluation Command Center" {...props} />; }
