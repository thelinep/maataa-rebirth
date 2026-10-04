import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Fullscreen touch-first kiosk. */
export function KioskLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="Kiosk" template="kiosk" {...props} />;
}
