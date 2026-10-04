import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type AIIncidentRoomProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function AIIncidentRoom(props:AIIncidentRoomProps) { return <AISpaceSurface spaceId="AI_SPACE.AI_INCIDENT_ROOM" name="AI Incident Room" {...props} />; }
