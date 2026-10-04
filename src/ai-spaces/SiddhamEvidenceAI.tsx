import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type SiddhamEvidenceAIProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function SiddhamEvidenceAI(props:SiddhamEvidenceAIProps) { return <AISpaceSurface spaceId="AI_SPACE.SIDDHAM_EVIDENCE_AI" name="Siddham Evidence AI" {...props} />; }
