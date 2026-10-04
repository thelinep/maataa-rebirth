import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type AIControlRoomProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function AIControlRoom(props:AIControlRoomProps) { return <AISpaceSurface spaceId="AI_SPACE.AI_CONTROL_ROOM" name="AI Control Room" {...props} />; }
