import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Booking steps with persistent summary. */
export function BookingLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="Booking" template="booking" {...props} />;
}
