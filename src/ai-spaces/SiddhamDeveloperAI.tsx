import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type SiddhamDeveloperAIProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function SiddhamDeveloperAI(props:SiddhamDeveloperAIProps) { return <AISpaceSurface spaceId="AI_SPACE.SIDDHAM_DEVELOPER_AI" name="Siddham Developer AI" {...props} />; }
