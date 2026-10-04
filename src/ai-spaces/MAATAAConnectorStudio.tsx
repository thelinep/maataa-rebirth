import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type MAATAAConnectorStudioProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function MAATAAConnectorStudio(props:MAATAAConnectorStudioProps) { return <AISpaceSurface spaceId="AI_SPACE.MAATAA_CONNECTOR_STUDIO" name="MAATAA Connector Studio" {...props} />; }
