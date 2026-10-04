import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Monitoring zones, alerts and controls. */
export function ControlRoomLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="ControlRoom" template="control-room" {...props} />;
}
