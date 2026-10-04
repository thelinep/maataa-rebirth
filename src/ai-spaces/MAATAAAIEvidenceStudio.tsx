import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type MAATAAAIEvidenceStudioProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function MAATAAAIEvidenceStudio(props:MAATAAAIEvidenceStudioProps) { return <AISpaceSurface spaceId="AI_SPACE.MAATAA_AI_EVIDENCE_STUDIO" name="MAATAA AI Evidence Studio" {...props} />; }
