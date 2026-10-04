import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type KnowledgeCommandCenterProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function KnowledgeCommandCenter(props:KnowledgeCommandCenterProps) { return <AISpaceSurface spaceId="AI_SPACE.KNOWLEDGE_COMMAND_CENTER" name="Knowledge Command Center" {...props} />; }
